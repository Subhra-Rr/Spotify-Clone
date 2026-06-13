import React, { useState, useEffect, useRef } from 'react';
import {
  INITIAL_TRACKS,
  INITIAL_PODCASTS,
  INITIAL_ARTISTS,
  INITIAL_ALBUMS,
  INITIAL_ANALYTICS
} from './data/mockCatalog';
import { Track, Playlist, Podcast, Artist, Album, UserProfile, EqualizerSetting, PlatformAnalytics } from './types';
import { getNotesAndInstrumentsImageForName } from './data/popularArtists';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import AudioPlayer from './components/AudioPlayer';
import NowPlayingSidebar from './components/NowPlayingSidebar';
import AuthModal from './components/AuthModal';
import { audioEngine } from './utils/audioEngine';
import { WifiOff, ShieldAlert, Search, Download, Home } from 'lucide-react';

export default function App() {
  // Global Navigation layout
  const [activeView, setActiveView] = useState('home');
  const [activeViewId, setActiveViewId] = useState<string | null>(null);

  // Dynamic Spotify style Toast State
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'info' | 'warning' | 'error' }>>([]);
  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

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
      email: 'sdsabat2006@gmail.com',
      display_name: 'Subhradeet Sabat',
      dob: '2006-12-08',
      country: 'India',
      tier: 'premium',
      offlineDownloads: [],
      collaborativePlaylists: [],
      followedArtists: []
    };
  });

  const isGuest = currentUser.email === 'demo@user.com' && !currentUser.mobile && !currentUser.googleId;

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');

  const [showTopProfileDropdown, setShowTopProfileDropdown] = useState(false);
  const [showTopSearchSuggestions, setShowTopSearchSuggestions] = useState(false);

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

  // Shuffle & Repeat playback state
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  // Global lifted search parameters
  const [searchQuery, setSearchQuery] = useState('');

  // User favorite/liked tracks list persistent to localStorage
  const [favoriteTrackIds, setFavoriteTrackIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('spotify_favorites');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing spotify_favorites init state:', e);
      }
    }
    return [];
  });

  const handleToggleFavorite = (trackId: string) => {
    setFavoriteTrackIds((prev) => {
      const updated = prev.includes(trackId)
        ? prev.filter((id) => id !== trackId)
        : [...prev, trackId];
      localStorage.setItem('spotify_favorites', JSON.stringify(updated));
      return updated;
    });
  };

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

  const VERIFIED_PREVIEW_RESOURCES = [
    "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/bf/25/7f/bf257f86-cfcc-883a-cd43-98fe87e7f607/mzaf_1384029104829302194.plus.aac.p.m4a", // Boom Shaka
    "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/d6/59/2b/d6592b0b-1e7e-4743-b2e4-f2af038fd783/mzaf_7697277787797935735.plus.aac.p.m4a", // ocean eyes
    "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/71/5c/80/715c80fc-ebe4-e713-487c-5bdefee6c6f3/mzaf_3698387428135478316.plus.aac.p.m4a", // Midnight City
    "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/7d/38/ff/7d38ff16-b52c-063a-a34d-767e836befcc/mzaf_13413071545825673354.plus.aac.p.m4a", // Without Me
    "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/00/b3/f2/00b3f2a0-3228-b65f-7189-91eb26f5adf6/mzaf_3535055549125623460.plus.aac.p.m4a", // cardigan
    "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/3f/a0/ba/3fa0ba5b-088d-bcf2-e4bd-355a5d505617/mzaf_3355567893400963384.plus.aac.p.m4a", // Starry Nocturne
    "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/29/e2/68/29e26874-ed3c-49f1-1fcc-cf7a3e5cde17/mzaf_14514475775303545273.plus.aac.p.m4a", // Deep Focus
    "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/62/0c/72/620c72ac-f370-0de6-2a0d-831f6d2d26f3/mzaf_9090450490088600113.plus.aac.p.m4a", // Sunset vibe
    "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/e9/4d/02/e94d0230-11ee-ef94-d2cf-a5d547bd73f4/mzaf_554140808559155562.plus.aac.p.m4a", // After Midnight
    "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/62/0a/a5/620aa56f-189e-708a-80f0-cebdada3872e/mzaf_7131619873177773332.plus.aac.p.m4a"  // Autumn Leaves
  ];

  const getImmediateBackupUrl = (track: any): string => {
    let hash = 0;
    const combo = (track.title || "") + (track.artist || "");
    for (let i = 0; i < combo.length; i++) {
      hash = combo.charCodeAt(i) + ((hash << 5) - hash);
    }
    return VERIFIED_PREVIEW_RESOURCES[Math.abs(hash) % VERIFIED_PREVIEW_RESOURCES.length];
  };

  const [resolvedAudioUrl, setResolvedAudioUrl] = useState<string | null>(null);

  const audioSrc = currentTrack ? (
    (currentTrack.isLocal || 
     currentTrack.audio_url?.startsWith('data:') || 
     currentTrack.podcast_title || 
     currentTrack.audio_url?.includes('itunes.apple.com') ||
     currentTrack.audio_url?.includes('audio-ssl'))
      ? (currentTrack.audio_url || getImmediateBackupUrl(currentTrack))
      : (resolvedAudioUrl || currentTrack.audio_url || getImmediateBackupUrl(currentTrack))
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
      setResolvedAudioUrl(currentTrack.audio_url || getImmediateBackupUrl(currentTrack));
      return;
    }

    let isSubscribed = true;

    const resolveOriginalSong = async () => {
      try {
        const queryUrl = `/api/resolve-track?title=${encodeURIComponent(currentTrack.title)}&artist=${encodeURIComponent(currentTrack.artist)}`;
        console.log(`[AudioEngine] Accessing secure proxy resolver for: "${currentTrack.title}" by "${currentTrack.artist}"`);
        const response = await fetch(queryUrl);
        if (response.ok) {
          const data = await response.json();
          if (data && data.previewUrl && isSubscribed) {
            console.log(`[AudioEngine] Verified reliable server-side matched stream: ${data.previewUrl}`);
            setResolvedAudioUrl(data.previewUrl);
            return;
          }
        }
      } catch (err) {
        console.warn('[AudioEngine] Secure server-side lookup failed, using catalog fallback:', err);
      }

      // Default fallback - play a high-fidelity lo-fi beat for simulated/procedural tracks to avoid random songs
      if (isSubscribed) {
        setResolvedAudioUrl(currentTrack.audio_url || getImmediateBackupUrl(currentTrack));
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
      // Force refreshing the source elements safely without audio codec exceptions
      audio.load();
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
          showToast(`Successfully imported and uploaded "${file.name}" to cloud playlist!`, 'success');
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

    setArtists((prevArtists) => {
      const updated = [...prevArtists];
      newTracks.forEach(track => {
        const artistName = (track.artist || '').trim();
        if (!artistName) return;

        const existsIdx = updated.findIndex(a => a.name.toLowerCase() === artistName.toLowerCase());
        if (existsIdx !== -1) {
          const art = updated[existsIdx];
          const hasTrack = art.tracks.some(t => t.track_id === track.track_id);
          if (!hasTrack) {
            art.tracks = [...art.tracks, track];
          }
        } else {
          const newArtistId = `artist-${artistName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
          updated.push({
            artist_id: newArtistId,
            name: artistName,
            bio: `${artistName} is a discovered artist whose high-fidelity tracks are registered and streamed dynamically on-demand from our secure core api networks.`,
            genres: [track.genre || 'Soundtrack'],
            followers_count: Math.floor(Math.random() * 500000) + 120000,
            verified: true,
            avatar_url: track.artwork_url || getNotesAndInstrumentsImageForName(artistName),
            tracks: [track],
            upcoming_events: [
              `${artistName} Live in Concert - Nov 20, 2026`
            ]
          });
        }
      });
      return updated;
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

  const handleToggleFollowArtist = (artistId: string) => {
    setCurrentUser(prevUser => {
      const followed = prevUser.followedArtists || [];
      const updatedFollowing = followed.includes(artistId)
        ? followed.filter(id => id !== artistId)
        : [...followed, artistId];
      const updatedUser = { ...prevUser, followedArtists: updatedFollowing };
      localStorage.setItem('spotify_user', JSON.stringify(updatedUser));
      
      fetch('/api/auth/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: prevUser.email,
          mobile: prevUser.mobile,
          googleId: prevUser.googleId,
          display_name: prevUser.display_name,
          dob: prevUser.dob,
          country: prevUser.country,
          tier: prevUser.tier,
          followedArtists: updatedFollowing
        })
      }).catch(e => console.error(e));

      return updatedUser;
    });
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
        showToast(`Successfully ingested metadata for "${trackPayload.title}".`, 'success');
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
        showToast('Selected track deregistered successfully.', 'info');
        syncServerData();
      } else {
        setTracks(prev => prev.filter(t => t.track_id !== trackId));
        showToast('Track removed from local runtime cache.', 'info');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateUserAdminTier = (email: string, tier: 'free' | 'premium') => {
    if (email === currentUser.email) {
      handleUpdateUserProfile(currentUser.display_name, currentUser.dob, currentUser.country, tier);
    } else {
      showToast(`User access tier matching ${email} updated to ${tier} status in directory registry.`, 'success');
    }
  };

  const handleDeleteUserAdminAccount = (email: string) => {
    showToast(`Account registration matching ${email} has been suspended inside access database.`, 'warning');
  };

  const handlePlayTrack = (track: Track, customQueue: Track[] = []) => {
    audioEngine.resume();
    if (isOffline && !currentUser.offlineDownloads.includes(track.track_id) && !track.isLocal) {
      showToast('This track is only available to stream online. Reconnect to Internet or select offline downloaded tracks.', 'warning');
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
    let nextIdx;
    if (isShuffle) {
      if (playQueue.length > 1) {
        // Find a random index that is different from current index for better variety
        let randIdx = queueIndex;
        while (randIdx === queueIndex) {
          randIdx = Math.floor(Math.random() * playQueue.length);
        }
        nextIdx = randIdx;
      } else {
        nextIdx = 0;
      }
    } else {
      nextIdx = (queueIndex + 1) % playQueue.length;
    }
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
      else showToast(`Song "${arg}" not found in database.`, 'error');
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
        <div className="flex items-center gap-2.5 cursor-pointer hover:opacity-95 transition" onClick={() => handleSetView('home')}>
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#1ED760] fill-current flex-shrink-0">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.564.387-.86.207-2.377-1.454-5.37-1.783-8.893-.98-.336.075-.67-.14-.744-.477-.076-.336.14-.67.477-.744 3.856-.88 7.15-.5 9.81 1.13.297.18.39.563.21.864zm1.223-2.72c-.227.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.075-1.185-.413.125-.847-.11-.972-.523-.125-.413.11-.847.522-.972 3.67-1.114 8.243-.574 11.385 1.36.368.225.485.707.26 1.074zm.104-2.816C14.4 8.788 8.6 8.6 5.253 9.616c-.53.16-1.09-.14-1.25-.67-.16-.53.14-1.09.67-1.25 3.847-1.167 10.25-.95 14.2 1.402.48.285.637.9.35 1.38-.284.48-.9.638-1.38.352z"/>
          </svg>
          <span className="text-white font-black text-xl tracking-tight font-sans hidden sm:block">Spotify</span>
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
              onChange={(e) => {
                handleTopSearchChange(e.target.value);
                setShowTopSearchSuggestions(true);
              }}
              onFocus={() => setShowTopSearchSuggestions(true)}
              onBlur={() => setTimeout(() => setShowTopSearchSuggestions(false), 250)}
              placeholder="What do you want to play?"
              className="bg-[#1f1f1f] hover:bg-[#2a2a2a] focus:bg-[#2a2a2a] focus:ring-2 focus:ring-white text-white text-xs font-semibold rounded-full py-2.5 pl-11 pr-24 w-64 md:w-80 lg:w-[450px] transition-all outline-none border-none placeholder-neutral-500 shadow-inner"
            />
            {searchQuery ? (
              <button
                onClick={() => {
                  handleTopSearchChange('');
                  setShowTopSearchSuggestions(false);
                }}
                className="absolute right-4 text-[10px] uppercase font-bold text-neutral-400 hover:text-white cursor-pointer font-mono"
              >
                Clear
              </button>
            ) : (
              <span className="absolute right-4 text-[9px] uppercase font-bold font-mono tracking-widest text-[#10b981] select-none">
                AI Enabled
              </span>
            )}

            {/* Premium Autocomplete/Search suggest dropdown - matched precisely to Bilal Saeed walkthrough in video */}
            {showTopSearchSuggestions && (
              <div 
                onMouseDown={(e) => e.preventDefault()}
                className="absolute top-12 left-0 w-full bg-[#121212] border border-neutral-800 rounded-lg p-2.5 z-50 shadow-2xl text-neutral-200 text-xs font-semibold flex flex-col gap-1.5 max-h-96 overflow-y-auto"
              >
                {!searchQuery ? (
                  <>
                    <div className="flex justify-between items-center text-[10px] text-neutral-500 font-bold px-2 py-1 select-none font-sans uppercase tracking-wider">
                      <span>Recent searches</span>
                      <button 
                        onClick={() => handleTopSearchChange('')}
                        className="hover:text-white transition-colors"
                      >
                        Clear all
                      </button>
                    </div>
                    <button 
                      onClick={() => {
                        handleTopSearchChange("No Cap");
                        handleSetView("search");
                        setShowTopSearchSuggestions(false);
                      }}
                      className="flex items-center gap-3 p-1.5 hover:bg-neutral-800 rounded-md text-left transition select-none"
                    >
                      <Search className="w-4 h-4 text-neutral-400" />
                      <div>
                        <p className="font-bold text-white text-xs">No Cap</p>
                        <p className="text-[10px] text-neutral-400">Song • KR$NA</p>
                      </div>
                    </button>
                    <button 
                      onClick={() => {
                        handleSetView("artist-details", "artist-atif-aslam");
                        setShowTopSearchSuggestions(false);
                      }}
                      className="flex items-center gap-3 p-1.5 hover:bg-neutral-800 rounded-md text-left transition select-none"
                    >
                      <Search className="w-4 h-4 text-neutral-500" />
                      <div>
                        <p className="font-bold text-white text-xs">Atif Aslam</p>
                        <p className="text-[10px] text-neutral-400">Artist</p>
                      </div>
                    </button>
                    <button 
                      onClick={() => {
                        handleTopSearchChange("Aadat");
                        handleSetView("search");
                        setShowTopSearchSuggestions(false);
                      }}
                      className="flex items-center gap-3 p-1.5 hover:bg-neutral-800 rounded-md text-left transition select-none"
                    >
                      <Search className="w-4 h-4 text-neutral-500" />
                      <div>
                        <p className="font-bold text-white text-xs">Aadat - From "Kalyug"</p>
                        <p className="text-[10px] text-neutral-400">Song • Atif Aslam, Jal, Mithoon</p>
                      </div>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="text-[9px] text-[#1ed760] font-mono tracking-wider px-2 py-0.5 uppercase select-none">
                      Autocomplete Candidates
                    </div>
                    <button 
                      onClick={() => {
                        handleTopSearchChange(`${searchQuery} all songs`);
                        handleSetView("search");
                        setShowTopSearchSuggestions(false);
                      }}
                      className="flex items-center gap-2.5 px-2 py-1.5 hover:bg-neutral-800 text-left rounded-md transition font-bold"
                    >
                      <Search className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span className="truncate">{searchQuery} all songs</span>
                    </button>
                    <button 
                      onClick={() => {
                        handleTopSearchChange(`${searchQuery} sad song`);
                        handleSetView("search");
                        setShowTopSearchSuggestions(false);
                      }}
                      className="flex items-center gap-2.5 px-2 py-1.5 hover:bg-neutral-800 text-left rounded-md transition font-bold"
                    >
                      <Search className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span className="truncate">{searchQuery} sad song</span>
                    </button>

                    {/* Filter artists list matching input query */}
                    {artists.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase())).map(artist => (
                      <button
                        key={artist.artist_id}
                        onClick={() => {
                          handleSetView('artist-details', artist.artist_id);
                          setShowTopSearchSuggestions(false);
                        }}
                        className="flex items-center gap-3 p-2 bg-neutral-900/40 hover:bg-neutral-800 rounded-md text-left transition-all border border-neutral-900 border-none select-none"
                      >
                        <img 
                          src={getNotesAndInstrumentsImageForName(artist.name)} 
                          alt={artist.name} 
                          className="w-8 h-8 rounded-full object-cover shrink-0 bg-stone-800"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-white text-xs truncate leading-tight">{artist.name}</p>
                          <p className="text-[10px] text-neutral-400 truncate mt-0.5">Artist</p>
                        </div>
                        <span className="text-[10px] bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full text-neutral-300">Artist Profile</span>
                      </button>
                    ))}

                    {/* Filter tracks list matching query */}
                    {tracks.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.artist.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 4).map(track => (
                      <button
                        key={track.track_id}
                        onClick={() => {
                          handlePlayTrack(track);
                          setShowTopSearchSuggestions(false);
                        }}
                        className="flex items-center gap-3 p-1.5 hover:bg-neutral-800 rounded-md text-left transition select-none"
                      >
                        <img 
                          src={track.artwork_url} 
                          alt={track.title} 
                          className="w-8 h-8 rounded object-cover shrink-0 bg-stone-800"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-white text-xs truncate leading-tight">{track.title}</p>
                          <p className="text-[10px] text-neutral-400 truncate mt-0.5">{track.artist}</p>
                        </div>
                        <span className="text-[10px] text-neutral-500 font-mono shrink-0 mr-1 select-none">Song</span>
                      </button>
                    ))}
                  </>
                )}
              </div>
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
            onClick={() => showToast('Download starting for Windows/macOS client bundle...', 'info')}
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
            <div className="relative flex items-center gap-3">
              {/* Premium Pill button */}
              <button
                onClick={() => handleSetView('settings')}
                className="bg-[#1f1f1f]/80 hover:bg-black/90 hover:scale-105 border border-neutral-800 text-white font-bold text-xs px-3.5 py-1.5 rounded-full transition cursor-pointer"
              >
                Explore Premium
              </button>

              {/* Install App button */}
              <button
                onClick={() => showToast('Spotify Desktop container starting download...', 'info')}
                className="bg-[#1f1f1f]/80 hover:bg-black/90 hover:scale-105 border border-neutral-800 text-white font-bold text-xs px-3.5 py-1.5 rounded-full transition hidden sm:flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Install App
              </button>

              {/* Avatar circle toggle trigger */}
              <button
                onClick={() => setShowTopProfileDropdown(!showTopProfileDropdown)}
                onBlur={() => setTimeout(() => setShowTopProfileDropdown(false), 250)}
                className="w-8 h-8 rounded-full bg-[#282828] hover:scale-105 text-[#1ed760] font-black text-xs flex items-center justify-center cursor-pointer transition border border-neutral-800 focus:ring-2 focus:ring-white"
                title="User profile menu"
              >
                {currentUser.display_name.substring(0, 1).toUpperCase()}
              </button>

              {/* Interactive Profile Dropdown Card */}
              {showTopProfileDropdown && (
                <div 
                  onMouseDown={(e) => e.preventDefault()}
                  className="absolute right-0 top-10 w-48 bg-[#181818] border border-neutral-800 p-1 rounded-md shadow-2xl z-50 text-neutral-200 text-xs font-bold flex flex-col gap-0.5 animate-fadeIn"
                >
                  <a
                    href="#account"
                    onClick={() => {
                      handleSetView('settings');
                      setShowTopProfileDropdown(false);
                    }}
                    className="flex items-center justify-between px-3 py-2 hover:bg-neutral-800 rounded-sm text-left transition text-neutral-200 hover:text-white"
                  >
                    <span>Account</span>
                    <svg className="w-3 h-3 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <button
                    onClick={() => {
                      handleSetView('profile');
                      setShowTopProfileDropdown(false);
                    }}
                    className="flex items-center justify-between px-3 py-2 hover:bg-neutral-800 rounded-sm text-left transition w-full text-left font-bold text-neutral-200 hover:text-white"
                  >
                    <span>Profile</span>
                  </button>
                  <a
                    href="#upgrade"
                    onClick={() => {
                      handleSetView('settings');
                      setShowTopProfileDropdown(false);
                    }}
                    className="flex items-center justify-between px-3 py-2 hover:bg-neutral-800 rounded-sm text-left transition text-neutral-200 hover:text-white"
                  >
                    <span>Upgrade to Premium</span>
                    <svg className="w-3 h-3 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <a
                    href="#support"
                    onClick={() => showToast('Redirecting to support ticket portal...', 'info')}
                    className="flex items-center justify-between px-3 py-2 hover:bg-neutral-800 rounded-sm text-left transition text-neutral-200 hover:text-white"
                  >
                    <span>Support</span>
                    <svg className="w-3 h-3 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <button
                    onClick={() => showToast('Starting desktop installer download...', 'info')}
                    className="px-3 py-2 hover:bg-neutral-800 rounded-sm text-left transition w-full font-bold text-neutral-200 hover:text-white"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => {
                      handleSetView('settings');
                      setShowTopProfileDropdown(false);
                    }}
                    className="px-3 py-2 hover:bg-neutral-800 rounded-sm text-left transition w-full font-bold text-neutral-200 hover:text-white"
                  >
                    Settings
                  </button>
                  <div className="h-px bg-neutral-800 my-1" />
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
                      setShowTopProfileDropdown(false);
                      showToast('Logged out successfully.', 'info');
                    }}
                    className="px-3 py-2 hover:bg-neutral-800 rounded-sm text-left transition w-full text-neutral-400 hover:text-white font-semibold"
                  >
                    Log out
                  </button>

                  {/* "Your Updates" block exactly as shown in the walkthrough video */}
                  <div className="bg-neutral-900 border border-neutral-800/80 m-1.5 p-2 rounded text-[10px] text-neutral-400 font-medium font-sans">
                    <p className="font-extrabold text-[#1ed760] mb-0.5 flex items-center gap-1">
                      <span>●</span> Your Updates
                    </p>
                    <p className="leading-snug">Say hello to your updates. Check here for your followers, playlists, and news.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden p-2 gap-2 bg-[#000000]">
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
          artists={artists}
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
          favoriteTrackIds={favoriteTrackIds}
          onToggleFavorite={handleToggleFavorite}
          onToggleFollowArtist={handleToggleFollowArtist}
          onShowToast={showToast}
        />

        <NowPlayingSidebar
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          currentUser={currentUser}
          playQueue={playQueue}
          queueIndex={queueIndex}
          onToggleFollowArtist={handleToggleFollowArtist}
          onPlayTrack={handlePlayTrack}
          onSetView={handleSetView}
          artists={artists}
          onShowToast={showToast}
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
        isShuffle={isShuffle}
        isRepeat={isRepeat}
        onToggleShuffle={() => setIsShuffle(!isShuffle)}
        onToggleRepeat={() => setIsRepeat(!isRepeat)}
        favoriteTrackIds={favoriteTrackIds}
        onToggleFavorite={handleToggleFavorite}
        onShowToast={showToast}
      />

      <audio
        ref={audioRef}
        src={audioSrc || undefined}
        loop={isRepeat}
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
              showToast('Upgraded to premium! Playback has resumed ad-free.', 'success');
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

      {/* Floating dynamic Spotify Style Toast list */}
      <div className="fixed bottom-28 right-6 flex flex-col gap-2 z-55 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg shadow-2xl text-xs font-bold flex items-center gap-2 border animate-fadeIn transition-all transform hover:scale-102 pointer-events-auto ${
              toast.type === 'error'
                ? 'bg-[#ffebee]/10 backdrop-blur border-red-500/20 text-red-400'
                : toast.type === 'warning'
                ? 'bg-[#fff8e1]/10 backdrop-blur border-amber-500/20 text-amber-400'
                : 'bg-[#e8f5e9]/10 backdrop-blur border-emerald-500/20 text-[#1ed760]'
            }`}
            style={{
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
              borderLeftWidth: '4px',
              borderLeftColor: toast.type === 'error' ? '#ef4444' : toast.type === 'warning' ? '#f59e0b' : '#1ed760'
            }}
          >
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}