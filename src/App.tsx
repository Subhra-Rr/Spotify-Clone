import React, { useState, useEffect, useRef } from 'react';
import {
  INITIAL_TRACKS,
  INITIAL_PODCASTS,
  INITIAL_ARTISTS,
  INITIAL_ALBUMS,
  INITIAL_ANALYTICS
} from './data/mockCatalog';
import { Track, Playlist, Podcast, Artist, Album, UserProfile, EqualizerSetting, PlatformAnalytics } from './types';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import AudioPlayer from './components/AudioPlayer';
import AuthModal from './components/AuthModal';
import { audioEngine } from './utils/audioEngine';
import { WifiOff, ShieldAlert, Search, Download, Home } from 'lucide-react';

export default function App() {
  // Global Navigation layout
  const [activeView, setActiveView] = useState('home');
  const [activeViewId, setActiveViewId] = useState<string | null>(null);

  // DB Sync state
  const [tracks, setTracks] = useState<Track[]>(INITIAL_TRACKS);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [podcasts, setPodcasts] = useState<Podcast[]>(INITIAL_PODCASTS);
  const [artists, setArtists] = useState<Artist[]>(INITIAL_ARTISTS);
  const [albums, setAlbums] = useState<Album[]>(INITIAL_ALBUMS);
  const [analytics, setAnalytics] = useState<PlatformAnalytics>(INITIAL_ANALYTICS);

  // Authenticated Profile with localStorage persistence
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('spotify_user');
    if (saved) {
      try {
        const u = JSON.parse(saved);
        if (u && u.id) return u;
      } catch (e) {
        console.error('Error parsing local storage profile data', e);
      }
    }
    return {
      id: 'u-1',
      email: 'demo@user.com',
      display_name: 'Guest',
      dob: '2006-05-15',
      country: 'India',
      tier: 'free',
      offlineDownloads: [],
      collaborativePlaylists: [],
      followedArtists: []
    };
  });

  const isGuest = currentUser.email === 'demo@user.com' && !currentUser.mobile && !currentUser.googleId;

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');

  // Player transport state
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playQueue, setPlayQueue] = useState<Track[]>([]);
  const [queueIndex, setQueueIndex] = useState(-1);
  const [equalizer, setEqualizer] = useState<EqualizerSetting>({
    enabled: true,
    preset: 'Flat',
    hz60: 0,
    hz230: 0,
    hz910: 0,
    hz4k: 0,
    hz14k: 0
  });

  // Offline Simulator mode
  const [isOffline, setIsOffline] = useState(false);

  // Global lifted search parameters
  const [searchQuery, setSearchQuery] = useState('');

  // Advertisements management for Free Tier listeners
  const [freeTrackCount, setFreeTrackCount] = useState(0);
  const [isAdActive, setIsAdActive] = useState(false);
  const [adCountdown, setAdCountdown] = useState(10);

  // HTML5 audio reference binding
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load playlists, uploaded files, and positions from Server on mount
  const syncServerData = async () => {
    try {
      // Don't auto-login if the user deliberately logged out to a standard demo block
      if (currentUser.email !== 'demo@user.com' || currentUser.mobile || currentUser.googleId) {
        const method = currentUser.mobile ? 'mobile' : (currentUser.googleId ? 'google' : 'email');
        const payload: any = { method };
        if (method === 'mobile') payload.mobile = currentUser.mobile;
        else if (method === 'google') {
          payload.googleId = currentUser.googleId;
          payload.email = currentUser.email;
        } else {
          payload.email = currentUser.email;
        }

        const pRes = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (pRes.ok) {
          const uData = await pRes.json();
          setCurrentUser(uData.user);
          localStorage.setItem('spotify_user', JSON.stringify(uData.user));
        }
      }

      // Read remote playlists
      const plRes = await fetch('/api/playlists');
      if (plRes.ok) {
        const plData = await plRes.json();
        setPlaylists(plData.playlists || []);
      }

      // Read custom self-imported tracks
      const trRes = await fetch('/api/tracks/uploaded');
      if (trRes.ok) {
        const trData = await trRes.json();
        const customTracks = trData.tracks || [];
        setTracks([...INITIAL_TRACKS, ...customTracks]);
      }
    } catch (e) {
      console.warn('Network offline or Server API unreachable. Falling back to local storage sync.', e);
    }
  };

  useEffect(() => {
    syncServerData();
  }, []);

  const [resolvedAudioUrl, setResolvedAudioUrl] = useState<string | null>(null);

  const audioSrc = currentTrack ? (
    (currentTrack.isLocal || 
     currentTrack.audio_url?.startsWith('data:') || 
     currentTrack.podcast_title || 
     currentTrack.audio_url?.includes('itunes.apple.com') ||
     currentTrack.audio_url?.includes('audio-ssl'))
      ? currentTrack.audio_url 
      : resolvedAudioUrl || currentTrack.audio_url
  ) : null;

  // Dynamic original track resolver using iTunes Search API. This is the "fix it once and for all" solution!
  useEffect(() => {
    if (!currentTrack) {
      setResolvedAudioUrl(null);
      return;
    }

    // Direct fallback for local files (data URI), podcasts, or already resolved iTunes/audio-ssl urls
    if (
      currentTrack.isLocal || 
      currentTrack.audio_url?.startsWith('data:') || 
      currentTrack.podcast_title || 
      currentTrack.audio_url?.includes('itunes.apple.com') ||
      currentTrack.audio_url?.includes('audio-ssl')
    ) {
      setResolvedAudioUrl(currentTrack.audio_url);
      return;
    }

    let isSubscribed = true;

    const resolveOriginalSong = async () => {
      try {
        const cleanTitle = currentTrack.title.replace(/\(Simulated\)/gi, '').trim();
        const searchQuery = `${currentTrack.artist} ${cleanTitle}`;
        // Query up to 10 candidates to perform a multi-match selection instead of blindly taking limit=1
        const searchUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(searchQuery)}&media=music&limit=10`;
        
        console.log(`[AudioEngine] Searching iTunes for original song preview of: "${searchQuery}"`);
        const response = await fetch(searchUrl);
        if (response.ok) {
          const data = await response.json();
          if (data.results && data.results.length > 0 && isSubscribed) {
            // Screen candidates and verify if they are a genuine, reliable match
            const bestMatch = data.results.find((item: any) => {
              const itemTitle = (item.trackName || '').toLowerCase();
              const itemArtist = (item.artistName || '').toLowerCase();
              const reqTitle = cleanTitle.toLowerCase();
              const reqArtist = currentTrack.artist.toLowerCase();

              const titleMatch = itemTitle.includes(reqTitle) || reqTitle.includes(itemTitle);
              const artistMatch = itemArtist.includes(reqArtist) || reqArtist.includes(itemArtist);

              // Token-overlap check for complex phrases
              const getWords = (str: string) => 
                str.replace(/[^a-z0-9\s]/g, '')
                   .split(/\s+/)
                   .filter(w => w.length > 2 && w !== 'the' && w !== 'feat' && w !== 'with');

              const reqWords = getWords(reqTitle);
              const resWords = getWords(itemTitle);
              const overlapCount = reqWords.filter(w => resWords.includes(w)).length;

              return (titleMatch && artistMatch) || (overlapCount > 0 && artistMatch) || (reqTitle === itemTitle);
            });

            const matchedResult = bestMatch || (data.results[0].trackName?.toLowerCase().includes(cleanTitle.toLowerCase()) ? data.results[0] : null);

            if (matchedResult && matchedResult.previewUrl) {
              console.log(`[AudioEngine] Verified reliable iTunes match: ${matchedResult.trackName} by ${matchedResult.artistName}`);
              setResolvedAudioUrl(matchedResult.previewUrl);
              return;
            }
          }
        }
      } catch (err) {
        console.warn('[AudioEngine] iTunes lookup failed or was interrupted, using catalog fallback:', err);
      }

      // Default fallback - play a high-fidelity lo-fi beat for simulated/procedural tracks to avoid random songs
      if (isSubscribed) {
        if (!currentTrack.audio_url) {
          const fallbackLofis = [
            'https://raw.githubusercontent.com/Anand-Chowdhary/lofi-player/master/assets/music/1.mp3',
            'https://raw.githubusercontent.com/Anand-Chowdhary/lofi-player/master/assets/music/2.mp3',
            'https://raw.githubusercontent.com/Anand-Chowdhary/lofi-player/master/assets/music/4.mp3'
          ];
          let hash = 0;
          const combo = currentTrack.title + currentTrack.artist;
          for (let i = 0; i < combo.length; i++) {
            hash = combo.charCodeAt(i) + ((hash << 5) - hash);
          }
          const chosenLofi = fallbackLofis[Math.abs(hash) % fallbackLofis.length];
          setResolvedAudioUrl(chosenLofi);
        } else {
          setResolvedAudioUrl(currentTrack.audio_url);
        }
      }
    };

    resolveOriginalSong();

    return () => {
      isSubscribed = false;
    };
  }, [currentTrack]);

  // FIXED: Sync Audio Playback States cleanly using the resolved original iTunes stream URL
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && audioSrc) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Audio play requested but blocked or pending load:', err);
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, audioSrc]);

  // Download track encryption mapping simulator
  const handleToggleDownloadTrack = (trackId: string) => {
    let updated;
    if (currentUser.offlineDownloads.includes(trackId)) {
      updated = currentUser.offlineDownloads.filter(id => id !== trackId);
    } else {
      updated = [...currentUser.offlineDownloads, trackId];
    }

    const updatedUser = { ...currentUser, offlineDownloads: updated };
    setCurrentUser(updatedUser);
    localStorage.setItem('spotify_user', JSON.stringify(updatedUser));

    // Save profile to server
    fetch('/api/auth/update-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: currentUser.email, ...updatedUser })
    }).catch(e => console.error(e));
  };

  // Import local audio track file
  const handleImportLocalFile = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target?.result as string;
      if (!base64Data) return;

      try {
        const res = await fetch('/api/tracks/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: file.name.replace(/\.[^/.]+$/, ''),
            artist: 'Imported File Source',
            audio_data: base64Data,
            genre: 'Local Import'
          })
        });

        if (res.ok) {
          alert(`Successfully imported and uploaded "${file.name}" to cloud playlist!`);
          syncServerData();
        }
      } catch (e) {
        console.error('Local File import upload failed', e);
      }
    };
    reader.readAsDataURL(file);
  };

  // Create empty playlist
  const handleCreatePlaylist = async () => {
    try {
      const res = await fetch('/api/playlists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `Custom Playlist #${playlists.length + 1}`,
          description: 'A custom high fidelity auditory layout.',
          owner_id: currentUser.id,
          owner_name: currentUser.display_name,
          visibility: 'public',
          collaborative: false
        })
      });

      if (res.ok) {
        const data = await res.json();
        setPlaylists([...playlists, data.playlist]);
        setActiveView('playlist-details');
        setActiveViewId(data.playlist.playlist_id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Track Playlist updates
  const handleAddTrackToPlaylist = async (trackId: string, playlistId: string) => {
    const playlist = playlists.find(p => p.playlist_id === playlistId);
    if (!playlist) return;

    const renewedTracks = [...playlist.track_ids, trackId];
    try {
      const res = await fetch(`/api/playlists/${playlistId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ track_ids: renewedTracks })
      });
      if (res.ok) {
        syncServerData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveTrackFromPlaylist = async (trackId: string, playlistId: string) => {
    const playlist = playlists.find(p => p.playlist_id === playlistId);
    if (!playlist) return;

    const renewedTracks = playlist.track_ids.filter(id => id !== trackId);
    try {
      const res = await fetch(`/api/playlists/${playlistId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ track_ids: renewedTracks })
      });
      if (res.ok) {
        syncServerData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdatePlaylistCollaborative = async (playlistId: string, value: boolean) => {
    try {
      const res = await fetch(`/api/playlists/${playlistId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collaborative: value })
      });
      if (res.ok) {
        syncServerData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAppendTracks = (newTracks: Track[]) => {
    setTracks((prev) => {
      const prevIds = new Set(prev.map(t => t.track_id));
      const filteredNew = newTracks.filter(t => !prevIds.has(t.track_id));
      if (filteredNew.length === 0) return prev;
      return [...prev, ...filteredNew];
    });
  };

  const handleUpdateUserProfile = (displayName: string, dob: string, country: string, tier: 'free' | 'premium') => {
    const updated = {
      ...currentUser,
      display_name: displayName,
      dob,
      country,
      tier
    };
    setCurrentUser(updated);
    localStorage.setItem('spotify_user', JSON.stringify(updated));

    fetch('/api/auth/update-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: currentUser.email,
        mobile: currentUser.mobile,
        googleId: currentUser.googleId,
        display_name: displayName,
        dob,
        country,
        tier
      })
    }).catch(e => console.error(e));
  };

  const handleSetView = (view: string, id: string | null = null) => {
    setActiveView(view);
    setActiveViewId(id);
    if (view !== 'search') {
      setSearchQuery('');
    }
  };

  const handleTopSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0 && activeView !== 'search') {
      setActiveView('search');
    }
  };

  const handleIngestTrack = async (trackPayload: Track) => {
    try {
      const res = await fetch('/api/tracks/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: trackPayload.title,
          artist: trackPayload.artist,
          audio_data: trackPayload.audio_url,
          artwork_url: trackPayload.artwork_url,
          genre: trackPayload.genre
        })
      });
      if (res.ok) {
        alert(`Successfully ingested metadata for "${trackPayload.title}".`);
        syncServerData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteTrack = async (trackId: string) => {
    try {
      const res = await fetch(`/api/tracks/${trackId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        alert('Selected track deregistered successfully from cluster index.');
        syncServerData();
      } else {
        setTracks(prev => prev.filter(t => t.track_id !== trackId));
        alert('Track removed from local runtime cache.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateUserAdminTier = (email: string, tier: 'free' | 'premium') => {
    if (email === currentUser.email) {
      handleUpdateUserProfile(currentUser.display_name, currentUser.dob, currentUser.country, tier);
    } else {
      alert(`User access tier matching ${email} updated to ${tier} status in directory registry.`);
    }
  };

  const handleDeleteUserAdminAccount = (email: string) => {
    alert(`Account registration matching ${email} has been suspended inside access database.`);
  };

  const handlePlayTrack = (track: Track, customQueue: Track[] = []) => {
    audioEngine.resume();
    if (isOffline && !currentUser.offlineDownloads.includes(track.track_id) && !track.isLocal) {
      alert('This track is only available to stream online. Reconnect to Internet or select offline downloaded tracks.');
      return;
    }

    if (currentUser.tier === 'free') {
      const nextCount = freeTrackCount + 1;
      setFreeTrackCount(nextCount);
      if (nextCount > 0 && nextCount % 3 === 0) {
        triggerInterruptingAd();
        return;
      }
    }

    setCurrentTrack(track);
    setIsPlaying(true);

    if (customQueue.length > 0) {
      setPlayQueue(customQueue);
      const idx = customQueue.findIndex(t => t.track_id === track.track_id);
      setQueueIndex(idx !== -1 ? idx : 0);
    } else {
      setPlayQueue(tracks);
      const idx = tracks.findIndex(t => t.track_id === track.track_id);
      setQueueIndex(idx !== -1 ? idx : 0);
    }
  };

  const handleNextTrack = () => {
    if (playQueue.length === 0 || queueIndex === -1) return;
    const nextIdx = (queueIndex + 1) % playQueue.length;
    setQueueIndex(nextIdx);
    handlePlayTrack(playQueue[nextIdx], playQueue);
  };

  const handlePreviousTrack = () => {
    if (playQueue.length === 0 || queueIndex === -1) return;
    const prevIdx = queueIndex === 0 ? playQueue.length - 1 : queueIndex - 1;
    setQueueIndex(prevIdx);
    handlePlayTrack(playQueue[prevIdx], playQueue);
  };

  const handleTogglePlay = () => {
    audioEngine.resume();
    if (!currentTrack && tracks.length > 0) {
      handlePlayTrack(tracks[0]);
    } else if (currentTrack) {
      setIsPlaying(!isPlaying);
    }
  };

  // FIXED: Interval loop logic contains secondary auto-cleanup conditions
  const triggerInterruptingAd = () => {
    setIsPlaying(false);
    setIsAdActive(true);
    setAdCountdown(10); 

    const handle = setInterval(() => {
      setAdCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(handle);
          setIsAdActive(false);
          setIsPlaying(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVoiceCommand = (cmd: string, arg?: string) => {
    console.log('Main App Received Voice command routing:', cmd, arg);
    if (cmd === 'play') setIsPlaying(true);
    else if (cmd === 'pause') setIsPlaying(false);
    else if (cmd === 'next') handleNextTrack();
    else if (cmd === 'previous') handlePreviousTrack();
    else if (cmd === 'play-track-name' && arg) {
      const match = tracks.find(t => t.title.toLowerCase().includes(arg.toLowerCase()));
      if (match) handlePlayTrack(match);
      else alert(`Song "${arg}" not found in database.`);
    } else if (cmd === 'search' && arg) setActiveView('search');
    else if (cmd === 'volume' && arg) {
      const audio = audioRef.current;
      if (audio) {
        audio.volume = arg === 'up' ? Math.min(1, audio.volume + 0.15) : Math.max(0, audio.volume - 0.15);
      }
    }
  };

  const handleSavePodcastPosition = async (episodeId: string, positionMs: number) => {
    try {
      await fetch('/api/podcasts/position', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ episode_id: episodeId, position_ms: positionMs })
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div id="spotify-clone-viewport-root" className="flex flex-col h-screen bg-black overflow-hidden font-sans select-none">
      <header className="h-16 bg-[#000000] border-b border-neutral-900/50 flex items-center justify-between px-6 z-50 flex-shrink-0">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleSetView('home')}>
          <div className="bg-[#1db954] p-1.5 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-black fill-current">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.377-1.454-5.37-1.783-8.893-.982-.336.075-.668-.135-.744-.47-.077-.337.135-.668.47-.745 3.856-.88 7.15-.51 9.817 1.123.294.18.387.563.207.857zm1.225-2.72c-.227.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.076-1.182-.413.125-.847-.11-1.012-.52-.164-.415.07-.847.521-1.012 3.67-1.114 8.24-.57 11.38 1.363.37.227.49.707.262 1.074.004-.001.004-.001 0 0zM17.91 10.9c-.273.447-.857.595-1.303.32-3.175-1.887-8.412-2.062-11.472-1.135-.503.153-1.03-.133-1.18-.636-.15-.503.136-1.03.638-1.18 3.633-1.1 9.412-.898 13.048 1.26.446.265.594.85.32 1.3-.001.001-.001.001-.02.04l.007.03z"/>
            </svg>
          </div>
          <span className="text-white font-black text-lg tracking-tight font-sans hidden sm:block">Spotify</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSetView('home')}
            className={`p-2.5 rounded-full flex items-center justify-center transition cursor-pointer bg-neutral-900 ${
              activeView === 'home' ? 'text-white' : 'text-neutral-400 hover:text-white'
            }`}
            title="Home Feed"
          >
            <Home className="w-5 h-5" />
          </button>

          <div className="relative flex items-center">
            <Search className="absolute left-4 w-4.5 h-4.5 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleTopSearchChange(e.target.value)}
              placeholder="What do you want to play?"
              className="bg-[#1f1f1f] hover:bg-[#2a2a2a] focus:bg-[#2a2a2a] focus:ring-2 focus:ring-white text-white text-xs font-semibold rounded-full py-2.5 pl-11 pr-24 w-64 md:w-80 lg:w-[450px] transition-all outline-none border-none placeholder-neutral-500 shadow-inner"
            />
            {searchQuery ? (
              <button
                onClick={() => handleTopSearchChange('')}
                className="absolute right-4 text-[10px] uppercase font-bold text-neutral-400 hover:text-white cursor-pointer font-mono"
              >
                Clear
              </button>
            ) : (
              <span className="absolute right-4 text-[9px] uppercase font-bold font-mono tracking-widest text-[#10b981] select-none">
                AI Enabled
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={() => handleSetView('settings')}
            className="text-neutral-400 hover:text-white font-bold text-xs tracking-wide transition hidden sm:block"
          >
            Premium
          </button>
          <button
            onClick={() => alert('Download starting for Windows/macOS client bundle...')}
            className="text-neutral-400 hover:text-white font-bold text-xs tracking-wide transition hidden lg:flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Install App
          </button>

          <div className="w-px h-4 bg-neutral-800 hidden sm:block" />

          {currentUser.email === 'demo@user.com' && !currentUser.mobile && !currentUser.googleId ? (
            <>
              <button
                onClick={() => {
                  setAuthModalTab('signup');
                  setIsAuthModalOpen(true);
                }}
                className="text-neutral-300 hover:text-white font-bold text-xs tracking-wide transition cursor-pointer"
              >
                Sign up
              </button>
              
              <button
                onClick={() => {
                  setAuthModalTab('login');
                  setIsAuthModalOpen(true);
                }}
                className="bg-white text-black text-xs font-bold py-2 px-6 rounded-full hover:scale-105 active:scale-95 transition cursor-pointer"
              >
                Log in
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-neutral-300">
                  Hi, <span className="text-emerald-400 font-extrabold">{currentUser.display_name}</span>
                </span>
                {currentUser.tier === 'premium' && (
                  <span className="text-[9px] font-black text-emerald-400 tracking-widest font-mono uppercase mt-0.5 leading-none">
                    PRO
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  const defaultUser: UserProfile = {
                    id: 'u-1',
                    email: 'demo@user.com',
                    display_name: 'Guest',
                    dob: '2006-05-15',
                    country: 'India',
                    tier: 'free',
                    offlineDownloads: [],
                    collaborativePlaylists: [],
                    followedArtists: []
                  };
                  setCurrentUser(defaultUser);
                  localStorage.removeItem('spotify_user');
                  alert('Logged out successfully.');
                }}
                className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold py-1.5 px-4 rounded-full transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeView={activeView}
          activeViewId={activeViewId}
          onSetView={handleSetView}
          playlists={playlists}
          onCreatePlaylist={handleCreatePlaylist}
          userEmail={isGuest ? 'guest@app.io' : (currentUser.email || currentUser.mobile || 'User')}
          userDisplayName={isGuest ? 'Guest' : currentUser.display_name}
          userTier={isGuest ? 'free' : currentUser.tier}
          isAdmin={true} 
          onVoiceCommand={handleVoiceCommand}
          activeTrackTitle={currentTrack ? currentTrack.title : ''}
        />

        <MainContent
          activeView={activeView}
          activeViewId={activeViewId}
          onSetView={handleSetView}
          tracks={tracks}
          playlists={playlists}
          podcasts={podcasts}
          artists={artists}
          albums={albums}
          currentUser={currentUser}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPlayTrack={handlePlayTrack}
          onTogglePlay={handleTogglePlay}
          onAddTrackToPlaylist={handleAddTrackToPlaylist}
          onRemoveTrackFromPlaylist={handleRemoveTrackFromPlaylist}
          onUpdatePlaylistCollaborative={handleUpdatePlaylistCollaborative}
          onUpdateUserProfile={handleUpdateUserProfile}
          onImportLocalFile={handleImportLocalFile}
          isOffline={isOffline}
          onSyncPodcastEpisode={handleSavePodcastPosition}
          onAppendTracks={handleAppendTracks}
          searchQuery={searchQuery}
          onSearchQueryChange={handleTopSearchChange}
          onIngestTrack={handleIngestTrack}
          onDeleteTrack={handleDeleteTrack}
          onUpdateUserTier={handleUpdateUserAdminTier}
          onDeleteUserAccount={handleDeleteUserAdminAccount}
        />
      </div>



      <AudioPlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onNextTrack={handleNextTrack}
        onPreviousTrack={handlePreviousTrack}
        audioElementRef={audioRef}
        isPremium={currentUser.tier === 'premium'}
        offlineDownloads={currentUser.offlineDownloads}
        onToggleDownloadTrack={handleToggleDownloadTrack}
        equalizer={equalizer}
        onChangeEqualizer={setEqualizer}
        onImportLocalFile={handleImportLocalFile}
        isOffline={isOffline}
      />

      <audio
        ref={audioRef}
        src={audioSrc || undefined}
      />

      {isAdActive && (
        <div className="fixed inset-0 bg-black/95 z-55 flex flex-col items-center justify-center p-6 text-white text-center select-none backdrop-blur border-t-4 border-emerald-500">
          <ShieldAlert className="w-16 h-16 text-emerald-500 animate-bounce mb-4" />
          <h2 className="text-2xl font-black uppercase tracking-wide">Sponsored Advertisement Intermission</h2>
          <p className="text-xs text-neutral-400 mt-2 max-w-sm leading-relaxed">
            Free members experience a short audio sponsor spot after playing several tracks.
          </p>
          <div className="bg-neutral-900 border border-neutral-850 px-6 py-2.5 rounded-full font-mono text-xs font-bold mt-6 tracking-widest text-emerald-400">
            SPONSOR AUDIO ENDING IN • {adCountdown}s
          </div>
          <button
            onClick={() => {
              setIsAdActive(false);
              handleUpdateUserProfile(currentUser.display_name, currentUser.dob, currentUser.country, 'premium');
              alert('Upgraded to premium! Playback has resumed ad-free.');
            }}
            className="mt-8 bg-emerald-500 hover:bg-emerald-450 text-black py-2.5 px-6 rounded-full font-bold text-xs shadow-lg transition"
          >
            Instantly Upgrade to Ad-Free Premium
          </button>
        </div>
      )}

      <div className="absolute top-4 left-72 bg-neutral-950 border border-neutral-850 px-3.5 py-1.5 rounded-full flex items-center gap-2 z-40 text-xs text-neutral-400 shadow shadow-black">
        <WifiOff className={`w-3.5 h-3.5 ${isOffline ? 'text-emerald-500 animate-pulse' : 'text-neutral-500'}`} />
        <span className="font-semibold">{isOffline ? 'Offline Mode Active' : 'Online Stream Mode'}</span>
        <input
          type="checkbox"
          checked={isOffline}
          onChange={(e) => setIsOffline(e.target.checked)}
          className="ml-1 rounded cursor-pointer accent-emerald-500"
        />
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
        onAuthSuccess={(user) => {
          setCurrentUser(user);
          localStorage.setItem('spotify_user', JSON.stringify(user));
        }}
      />
    </div>
  );
}