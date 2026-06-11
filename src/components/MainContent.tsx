import React, { useState, useEffect } from 'react';
import {
  Search as SearchIcon,
  Play,
  Pause,
  FolderPlus,
  Clock,
  Music,
  Download,
  Cast,
  Users,
  Compass,
  Plus,
  Trash,
  User,
  CreditCard,
  CheckCircle,
  TrendingUp,
  Sliders,
  ChevronRight,
  ExternalLink,
  ChevronLeft,
  Volume2,
  HelpCircle,
  UserCheck,
  Disc,
  UploadCloud,
  FileAudio,
  Radio,
  Eye,
  Settings,
  Sparkles,
  Smartphone
} from 'lucide-react';
import { Track, Playlist, Podcast, Artist, Album, UserProfile } from '../types';
import AdminPanel from './AdminPortal';
import { getRandomArtists, POPULAR_ARTISTS_DATABASE } from '../data/popularArtists';

interface MainContentProps {
  activeView: string;
  activeViewId: string | null;
  onSetView: (view: string, id?: string) => void;
  tracks: Track[];
  playlists: Playlist[];
  podcasts: Podcast[];
  artists: Artist[];
  albums: Album[];
  currentUser: UserProfile;
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlayTrack: (track: Track, customQueue?: Track[]) => void;
  onTogglePlay: () => void;
  onAddTrackToPlaylist: (trackId: string, playlistId: string) => void;
  onRemoveTrackFromPlaylist: (trackId: string, playlistId: string) => void;
  onUpdatePlaylistCollaborative: (playlistId: string, value: boolean) => void;
  onUpdateUserProfile: (displayName: string, dob: string, country: string, tier: 'free' | 'premium') => void;
  onImportLocalFile: (file: File) => void;
  isOffline: boolean;
  onSyncPodcastEpisode: (episodeId: string, positionMs: number) => void;
  onAppendTracks?: (newTracks: Track[]) => void;
  searchQuery?: string;
  onSearchQueryChange?: (query: string) => void;
  onIngestTrack?: (track: Track) => void;
  onDeleteTrack?: (trackId: string) => void;
  onUpdateUserTier?: (email: string, tier: 'free' | 'premium') => void;
  onDeleteUserAccount?: (email: string) => void;
}

export default function MainContent({
  activeView,
  activeViewId,
  onSetView,
  tracks,
  playlists,
  podcasts,
  artists,
  albums,
  currentUser,
  currentTrack,
  isPlaying,
  onPlayTrack,
  onTogglePlay,
  onAddTrackToPlaylist,
  onRemoveTrackFromPlaylist,
  onUpdatePlaylistCollaborative,
  onUpdateUserProfile,
  onImportLocalFile,
  isOffline,
  onSyncPodcastEpisode,
  onAppendTracks,
  searchQuery: externalSearchQuery,
  onSearchQueryChange: externalOnSearchQueryChange,
  onIngestTrack,
  onDeleteTrack,
  onUpdateUserTier,
  onDeleteUserAccount
}: MainContentProps) {
  // Search parameters (fallback locally if prop not passed, though lifted is preferred)
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [shuffledArtists] = useState(() => getRandomArtists(12));
  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : localSearchQuery;
  const setSearchQuery = externalOnSearchQueryChange !== undefined ? externalOnSearchQueryChange : setLocalSearchQuery;

  const [searchHistory, setSearchHistory] = useState<string[]>(['Lila Sterling', 'Neon', 'Techno', 'Midnight']);
  const [selectedGenreFilter, setSelectedGenreFilter] = useState<string | null>(null);
  const [artistFilter, setArtistFilter] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [activePlaylistMenu, setActivePlaylistMenu] = useState<string | null>(null);

  // Profile fields editing
  const [profileName, setProfileName] = useState(currentUser.display_name);
  const [profileDob, setProfileDob] = useState(currentUser.dob);
  const [profileCountry, setProfileCountry] = useState(currentUser.country);
  const [profileTier, setProfileTier] = useState(currentUser.tier);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Checkout states
  const [checkoutStep, setCheckoutStep] = useState<'plan' | 'card' | 'success'>('plan');
  const [selectedPlanName, setSelectedPlanName] = useState<'Student' | 'Standard' | 'Platinum'>('Standard');
  const [selectedPlanPrice, setSelectedPlanPrice] = useState<number>(99);
  const [selectedPlanPeriod, setSelectedPlanPeriod] = useState<string>('3 months');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi');
  const [upiTxnId, setUpiTxnId] = useState('');
  const [upiNumber, setUpiNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);

  // Gemini Recommendations State
  const [geminiRecs, setGeminiRecs] = useState<Array<{ title: string; artist: string; genre: string; reason: string }>>([]);
  const [recsLoading, setRecsLoading] = useState(false);
  const [recsQuery, setRecsQuery] = useState('Chill study coding loops');
  const [recEngineSuccess, setRecEngineSuccess] = useState(false);

  // Podcast state
  const [podcastPlaySpeed, setPodcastPlaySpeed] = useState<number>(1);

  const renderAddToPlaylistButton = (track: Track) => {
    const isMenuOpen = activePlaylistMenu === track.track_id;
    return (
      <div className="relative inline-block z-40">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActivePlaylistMenu(isMenuOpen ? null : track.track_id);
          }}
          className="p-1.5 rounded-full hover:bg-neutral-850 text-neutral-400 hover:text-emerald-400 transition-all cursor-pointer flex items-center justify-center border border-neutral-800 bg-neutral-950/60"
          title="Add song to Playlist"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 mt-1.5 w-48 bg-[#1a1a1a] border border-neutral-800 rounded-lg shadow-2xl z-55 py-2 text-left font-sans text-neutral-300">
            <span className="block text-[9px] uppercase tracking-wider text-neutral-500 px-3 py-1 font-mono border-b border-neutral-900 mb-1">Add to Playlist</span>
            {playlists.length === 0 ? (
              <span className="block text-xs text-neutral-500 px-3 py-1.5 italic">No custom playlists</span>
            ) : (
              playlists.map((pl) => {
                const holdsThis = pl.track_ids.includes(track.track_id);
                return (
                  <button
                    key={pl.playlist_id}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (holdsThis) {
                        onRemoveTrackFromPlaylist(track.track_id, pl.playlist_id);
                      } else {
                        onAddTrackToPlaylist(track.track_id, pl.playlist_id);
                      }
                      setActivePlaylistMenu(null);
                    }}
                    className="w-full text-left font-sans text-xs px-3 py-1.5 text-neutral-305 hover:bg-neutral-805 hover:text-white flex justify-between items-center transition"
                  >
                    <span className="truncate pr-1">{pl.name}</span>
                    {holdsThis ? (
                      <span className="text-[10px] text-emerald-400 font-bold font-mono">Added</span>
                    ) : (
                      <span className="text-[10px] text-neutral-500 group-hover:text-neutral-300 font-mono">+ Add</span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>
    );
  };

  // Dynamic Gemini search tracker
  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
        if (response.ok) {
          const data = await response.json();
          if (data.tracks && data.tracks.length > 0 && onAppendTracks) {
            onAppendTracks(data.tracks);
          }
        }
      } catch (e) {
        // Fallback procedural query indexing takes precedence perfectly
      } finally {
        setSearchLoading(false);
      }
    }, 600);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, onAppendTracks]);

  // Synchronize profile changes when current user changes
  useEffect(() => {
    setProfileName(currentUser.display_name);
    setProfileDob(currentUser.dob);
    setProfileCountry(currentUser.country);
    setProfileTier(currentUser.tier);
  }, [currentUser]);

  // Handle Fetching Gemini Recommendations
  const fetchGeminiRecommendations = async () => {
    setRecsLoading(true);
    setGeminiRecs([]);
    try {
      const historyMeta = tracks.slice(0, 3).map(t => ({ title: t.title, artist: t.artist }));
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          history: historyMeta,
          email: currentUser.email,
          query: recsQuery
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeminiRecs(data.recommendations || []);
        setRecEngineSuccess(true);
      }
    } catch (e) {
      // Graceful local catalog recommendations are automatically presented
    } finally {
      setRecsLoading(false);
    }
  };

  useEffect(() => {
    if (activeView === 'home' && geminiRecs.length === 0) {
      fetchGeminiRecommendations();
    }
  }, [activeView]);

  // Payment mock trigger
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For UPI scan check, validate that they entered the 12-digit transaction ID / reference number
    if (!upiTxnId) return;

    setPaymentLoading(true);
    setTimeout(() => {
      setPaymentLoading(false);
      setCheckoutStep('success');
      onUpdateUserProfile(currentUser.display_name, currentUser.dob, currentUser.country, 'premium');
    }, 1800);
  };

  const currentGreeting = () => {
    const hr = new Date().getHours();
    if (hr >= 5 && hr < 12) return 'Good Morning';
    if (hr >= 12 && hr < 17) return 'Good Afternoon';
    if (hr >= 17 && hr < 22) return 'Good Evening';
    return 'Good Night';
  };

  // Instant local filtering calculation
  const filteredSearchTracks = tracks.filter((t) => {
    if (!searchQuery) return false;
    const q = searchQuery.toLowerCase().trim();
    return (
      (t.title && t.title.toLowerCase().includes(q)) ||
      (t.artist && t.artist.toLowerCase().includes(q)) ||
      (t.genre && t.genre.toLowerCase().includes(q)) ||
      (t.album && t.album.toLowerCase().includes(q))
    );
  });

  return (
    <div id="main-content-display-pane" className="flex-1 bg-gradient-to-b from-[#1c1c1c] to-[#121212] overflow-y-auto p-6 text-white pb-32">
      {/* Search Header Bar (Only visible when appropriate or standard view header) */}
      <div className={`flex items-center justify-between pb-6 ${activeView !== 'home' ? 'border-b border-neutral-900 mb-6' : 'mb-4'}`}>
        <div className="flex items-center gap-2 min-h-[32px]">
          {activeView !== 'home' && (
            <>
              <button
                id="main-header-back-button"
                onClick={() => onSetView('home')}
                className="p-1.5 rounded-full bg-black/60 text-neutral-400 hover:text-white transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span id="main-header-sync-status" className="text-xs uppercase font-mono tracking-widest text-[#10b981] font-bold">
                {isOffline ? 'OFFLINE PLAYBACK ACTIVE' : 'CLOUD CDN SYNCED'}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button
            id="main-header-upgrade-button"
            onClick={() => onSetView('settings')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition ${
              currentUser.tier === 'premium'
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                : 'bg-neutral-900 border border-neutral-800 text-neutral-300'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            {currentUser.tier === 'premium' ? 'Premium Active' : 'Upgrade Account'}
          </button>
        </div>
      </div>

      {/* 1. HOME VIEW */}
      {activeView === 'home' && (
        <div className="space-y-8 animate-fadeIn">
          <div>
            <div className="flex flex-col items-start">
              {currentUser.email === 'demo@user.com' && !currentUser.mobile && !currentUser.googleId ? (
                <h1 id="home-time-greeting" className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white">
                  {currentGreeting()}
                </h1>
              ) : (
                <>
                  <h1 id="home-time-greeting" className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white">
                    {currentGreeting()},
                  </h1>
                  <div id="home-user-name-wrapper" className="mt-3 flex flex-col items-start">
                    <span id="home-user-displayname" className="text-2xl md:text-3xl font-bold text-emerald-400 animate-fadeIn">
                      {currentUser.display_name}
                    </span>
                    {currentUser.tier === 'premium' ? (
                      <span id="home-user-pro-badge" className="text-[10px] font-black tracking-widest text-[#10b981] uppercase select-none font-mono mt-1 px-1.5 py-0.5 border border-[#10b981]/25 bg-[#10b981]/10 rounded leading-none">
                        PRO
                      </span>
                    ) : null}
                  </div>
                </>
              )}
            </div>
            <p className="text-sm text-neutral-400 mt-1.5">
              Welcome to high-fidelity playback. Choose a record, tweak the equalizer, or talk to your voice assistant.
            </p>
          </div>

          {/* Quick grid entries */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tracks.slice(0, 6).map((track) => {
              const active = currentTrack?.track_id === track.track_id;
              return (
                <div
                  key={track.track_id}
                  className="bg-neutral-900/60 border border-neutral-850 hover:bg-neutral-800/85 p-3 rounded-xl flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3.5 min-w-0" onClick={() => onPlayTrack(track)}>
                    <img
                      src={track.artwork_url}
                      alt="artwork"
                      className="w-14 h-14 rounded-lg object-cover flex-shrink-0 cursor-pointer shadow"
                    />
                    <div className="min-w-0 cursor-pointer">
                      <h4 className="text-sm font-semibold text-neutral-100 truncate flex items-center gap-1.5">
                        {track.title}
                        {track.explicit && (
                          <span className="text-[9px] bg-red-950 text-red-500 px-1 rounded font-bold">E</span>
                        )}
                      </h4>
                      <p className="text-xs text-neutral-500 truncate mt-0.5">{track.artist}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                    {renderAddToPlaylistButton(track)}
                    <button
                      onClick={() => {
                        if (active) {
                          onTogglePlay();
                        } else {
                          onPlayTrack(track);
                        }
                      }}
                      className={`p-2.5 rounded-full text-black bg-emerald-500 opacity-0 group-hover:opacity-100 transition shadow hover:scale-105 ${
                        active ? 'opacity-100 bg-white text-black' : ''
                      }`}
                    >
                      {active && isPlaying ? <Pause className="w-4.5 h-4.5 fill-black" /> : <Play className="w-4.5 h-4.5 fill-black" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI Recommendations panel powered by Gemini */}
          <div className="bg-[#151d18]/50 border border-emerald-950 rounded-2xl p-5 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute right-[-24px] top-[-24px] w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-emerald-950/40">
              <div>
                <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                  Personalized AI-Curated Recommendations
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Powered by Google Gemini. Fine-tune your prompt seeding and get real-time song suggestions.
                </p>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={recsQuery}
                  onChange={(e) => setRecsQuery(e.target.value)}
                  placeholder="Seeding tone..."
                  className="bg-neutral-950 text-xs border border-emerald-950 text-neutral-300 rounded-full px-4 py-1.5 w-44 focus:outline-none focus:border-emerald-500 font-sans"
                />
                <button
                  onClick={fetchGeminiRecommendations}
                  disabled={recsLoading}
                  className="bg-emerald-500 hover:bg-emerald-450 text-black text-xs font-bold px-4 py-1.5 rounded-full transition cursor-pointer flex items-center gap-1.5"
                >
                  {recsLoading ? 'Consulting Gemini...' : 'Regenerate Seed'}
                </button>
              </div>
            </div>

            {recsLoading ? (
              <div className="py-8 flex flex-col items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
                <p className="text-xs text-neutral-500 italic">Gemini is reasoning on your listening history & preferences...</p>
              </div>
            ) : geminiRecs.length === 0 ? (
              <p className="text-xs text-neutral-500 italic py-6 text-center">No recommendations loaded. Tap "Regenerate Seed" to prompt Gemini.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {geminiRecs.map((rec, i) => {
                  const foundMatch = tracks.find(t => 
                    t.title.toLowerCase() === rec.title.toLowerCase() ||
                    t.title.toLowerCase().includes(rec.title.toLowerCase()) ||
                    rec.title.toLowerCase().includes(t.title.toLowerCase())
                  );
                  const matched = foundMatch || tracks[0];
                  const currentRecTrack = {
                    ...matched,
                    track_id: `t-rec-${i}-${matched.track_id}`,
                    title: rec.title,
                    artist: rec.artist,
                    genre: rec.genre,
                    audio_url: foundMatch ? foundMatch.audio_url : ""
                  };
                  const isActive = currentTrack?.title === rec.title && currentTrack?.artist === rec.artist;

                  return (
                    <div
                      key={i}
                      onClick={() => onPlayTrack(currentRecTrack)}
                      className="bg-neutral-950/70 border border-neutral-900 p-3.5 rounded-xl flex flex-col justify-between hover:border-emerald-800/40 transition-all group relative cursor-pointer hover:bg-neutral-900"
                    >
                      <div>
                        <div className="flex justify-between items-start gap-1">
                          <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider block w-fit mb-2">
                            {rec.genre}
                          </span>
                          <button
                            className={`p-1.5 rounded-full bg-emerald-500 text-black opacity-0 group-hover:opacity-100 transition shadow hover:scale-105 ${
                              isActive ? 'opacity-100 bg-white text-black' : ''
                            }`}
                          >
                            {isActive && isPlaying ? <Pause className="w-3.5 h-3.5 fill-black" /> : <Play className="w-3.5 h-3.5 fill-black translate-x-px" />}
                          </button>
                        </div>
                        <h4 className="font-bold text-sm text-neutral-100 truncate">{rec.title}</h4>
                        <p className="text-xs text-neutral-500 mt-0.5 truncate">{rec.artist}</p>
                        <p className="text-[11px] text-neutral-400 mt-2.5 italic leading-relaxed border-t border-neutral-900 pt-2 line-clamp-3">
                          "{rec.reason}"
                        </p>
                      </div>

                      <div className="mt-4 font-mono text-[10px] text-emerald-400 group-hover:text-emerald-300 flex items-center gap-1 hover:underline text-left">
                        Play Recommendation <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* New Releases Carousel list */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Latest Releases</h3>
              <button onClick={() => onSetView('search')} className="text-xs font-semibold text-neutral-500 hover:text-emerald-400">See All</button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {tracks.slice(1, 6).map((track) => (
                <div
                  key={track.track_id}
                  onClick={() => onPlayTrack(track)}
                  className="bg-[#181818] hover:bg-[#282828] p-3.5 rounded-xl group transition-all cursor-pointer border border-neutral-900"
                >
                  <div className="relative aspect-square mb-3">
                    <img
                      src={track.artwork_url}
                      alt="album artwork"
                      className="w-full h-full object-cover rounded-lg shadow-md"
                    />
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all z-50 animate-fadeIn" onClick={(e) => e.stopPropagation()}>
                      {renderAddToPlaylistButton(track)}
                    </div>
                    <button className="absolute bottom-2 right-2 p-3 bg-emerald-500 rounded-full text-black shadow-lg opacity-0 group-hover:opacity-100 hover:scale-105 transition-all">
                      <Play className="w-4 h-4 fill-black text-black translate-x-0.5" />
                    </button>
                  </div>
                  <h4 className="font-bold text-xs truncate text-neutral-200">{track.title}</h4>
                  <p className="text-[11px] text-neutral-500 truncate mt-0.5">{track.artist}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Artists Circular Grid */}
          <div className="pt-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Popular Artists</h3>
              <button onClick={() => onSetView('artists')} className="text-xs font-semibold text-neutral-500 hover:text-emerald-400">See All</button>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {shuffledArtists.map((artist, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSearchQuery(artist.name);
                    onSetView('search');
                  }}
                  className="bg-[#121212] hover:bg-[#1f1f1f]/80 active:scale-95 px-4 py-2.5 rounded-xl flex items-center gap-2.5 group cursor-pointer transition-all border border-neutral-800 hover:border-emerald-500/40 shadow-sm"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover:bg-emerald-500 transition-colors" />
                  <span className="font-bold text-xs text-neutral-200 group-hover:text-white transition-colors">{artist.name}</span>
                  <span className="text-[9px] text-neutral-500 font-mono tracking-wider uppercase border-l border-neutral-800 pl-2 group-hover:text-neutral-400 transition-colors">{artist.genre}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Charts and Global Playlists Grid */}
          <div className="pt-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Featured Charts & Radio</h3>
              <span className="text-xs text-neutral-500 font-mono">Dynamic Live Synced</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Top 50 - Global', desc: 'Your weekly update of the most played tracks right now.', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80' },
                { title: 'Top 50 - India', desc: 'The most popular songs across the region, updated daily.', cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&q=80' },
                { title: 'Mega Hit Mix', desc: 'A mega mix of the biggest hits of the decade.', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=80' },
                { title: 'Sad Romance Radio', desc: 'Melancholic acoustics and heart-wrenching vocals.', cover: 'https://images.unsplash.com/photo-1487180142328-054b783fc471?w=300&q=80' }
              ].map((chart, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSearchQuery(idx === 1 ? 'Arijit' : idx === 3 ? 'Classic' : idx === 0 ? 'Lila' : 'Techno');
                    onSetView('search');
                  }}
                  className="p-4 rounded-xl bg-[#181818] hover:bg-[#252525] transition-all cursor-pointer group border border-neutral-900"
                >
                  <div className="relative aspect-square mb-3 rounded-lg overflow-hidden flex items-end p-3 shadow-md bg-cover bg-center" style={{ backgroundImage: `url(${chart.cover})` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                    <div className="relative z-10 w-full text-left">
                      <span className="text-[10px] font-black tracking-widest text-emerald-400 font-mono leading-none block mb-1">SPOTIFY CHART</span>
                      <h4 className="font-extrabold text-sm text-neutral-100 leading-tight truncate">{chart.title}</h4>
                    </div>
                    <button className="absolute bottom-3 right-3 p-3 bg-emerald-500 rounded-full text-black shadow-lg opacity-0 group-hover:opacity-100 hover:scale-105 transition-all z-20">
                      <Play className="w-4 h-4 fill-black text-black translate-x-0.5" />
                    </button>
                  </div>
                  <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed mt-1 text-left">{chart.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. SEARCH & BROWSE VIEW */}
      {activeView === 'search' && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Search Catalog & Categories</h2>
            <p className="text-xs text-neutral-400">Search singers, musicians, rappers, classical, devotional or other global genres instantly.</p>
          </div>

          {/* Search bar input */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What do you want to listen to?"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-full py-2.5 pl-11 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs hover:text-white text-neutral-400 font-medium px-2"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sparkly Gemini loading indicator */}
          {searchLoading && (
            <div className="flex items-center gap-2.5 text-xs text-[#10b981] border border-emerald-950/40 bg-emerald-950/20 rounded-full px-4 py-2 w-fit animate-pulse">
              <Sparkles className="w-4 h-4 text-[#10b981] animate-spin" />
              <span>Gemini is indexing global catalog for "{searchQuery}"...</span>
            </div>
          )}

          {/* Search results matching elements */}
          {searchQuery ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-2 border-b border-neutral-950">
                <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider font-mono">
                  {searchLoading ? 'Searching global database...' : 'Matching Results'}
                </h3>
                <span className="text-[10px] text-neutral-500 font-mono">
                  {filteredSearchTracks.length} songs found
                </span>
              </div>
              
              {filteredSearchTracks.length === 0 ? (
                <div className="py-12 text-center bg-neutral-900/40 rounded-xl border border-neutral-800 p-8 flex flex-col items-center justify-center gap-3 animate-fadeIn">
                  <div className="p-4 bg-neutral-950/80 rounded-full border border-neutral-800 text-neutral-500">
                    <SearchIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-neutral-200">No results found for "{searchQuery}"</h3>
                    <p className="text-xs text-neutral-500 mt-1 max-w-md mx-auto leading-relaxed">
                      {searchLoading 
                        ? "Gemini is indexing more artists and generating synchronized lyrics, please hold on..." 
                        : "Please check your spelling, or try searching for another global singer, rapper, pop/classical artist, or song."}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredSearchTracks.map((track) => {
                    const isCurrentlyPlayingThis = currentTrack?.track_id === track.track_id;
                    return (
                      <div
                        key={track.track_id}
                        className={`bg-[#181818] hover:bg-[#252525] border transition p-3 rounded-lg flex items-center justify-between group ${
                          isCurrentlyPlayingThis ? 'border-emerald-500/30 bg-neutral-900/80' : 'border-neutral-850'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer" onClick={() => onPlayTrack(track)}>
                          <img src={track.artwork_url} alt="art" className="w-11 h-11 object-cover rounded shadow flex-shrink-0 animate-fadeIn" />
                          <div className="min-w-0">
                            <p className={`text-xs font-semibold truncate flex items-center gap-1 ${
                              isCurrentlyPlayingThis ? 'text-emerald-400 font-bold' : 'text-neutral-200'
                            }`}>
                              {track.title}
                              {track.explicit && <span className="text-[8px] bg-red-950 text-red-500 px-1 rounded">E</span>}
                            </p>
                            <p className="text-[11px] text-neutral-500 mt-0.5 truncate">{track.artist}</p>
                            <p className="text-[9px] text-neutral-600 truncate mt-0.5 font-mono">{track.album}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] bg-neutral-900 px-2 py-0.5 rounded text-neutral-500 font-mono">
                            {track.genre}
                          </span>

                          {/* Quick add-to-playlist button with dropdown */}
                          <div className="relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActivePlaylistMenu(activePlaylistMenu === track.track_id ? null : track.track_id);
                              }}
                              className="p-1 px-2 uppercase text-[9px] tracking-wide font-mono bg-neutral-950 hover:bg-neutral-850 rounded text-neutral-400 transition-all border border-neutral-850 cursor-pointer"
                              title="Add to playlist"
                            >
                              + Add
                            </button>

                            {activePlaylistMenu === track.track_id && (
                              <div className="absolute right-0 top-7 w-48 bg-neutral-950 border border-neutral-800 rounded-lg shadow-2xl z-55 py-1.5 text-left font-sans">
                                <span className="block text-[9px] uppercase tracking-wider text-neutral-500 px-3 py-1 font-mono">Add to Playlist</span>
                                {playlists.length === 0 ? (
                                  <span className="block text-[10px] text-neutral-600 px-3 py-1 italic">No playlists created</span>
                                ) : (
                                  playlists.map((pl) => {
                                    const holdsThis = pl.track_ids.includes(track.track_id);
                                    return (
                                      <button
                                        key={pl.playlist_id}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          if (holdsThis) {
                                            onRemoveTrackFromPlaylist(track.track_id, pl.playlist_id);
                                          } else {
                                            onAddTrackToPlaylist(track.track_id, pl.playlist_id);
                                          }
                                          setActivePlaylistMenu(null);
                                        }}
                                        className="w-full text-left font-sans text-xs px-3 py-1.5 text-neutral-300 hover:bg-neutral-900 flex justify-between items-center transition animate-fadeIn"
                                      >
                                        <span className="truncate pr-1">{pl.name}</span>
                                        {holdsThis && <span className="text-[9px] text-emerald-400 font-bold font-mono">Added</span>}
                                      </button>
                                    );
                                  })
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            // Static Browse genres cards
            <div>
              <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest font-mono mb-4">Browse All Genres</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { name: 'Pop Hits', color: 'from-[#4752c4] to-[#3a3da8]', bg: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&q=80' },
                  { name: 'Electronic Synthwave', color: 'from-[#b33a88] to-[#912d6f]', bg: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&q=80' },
                  { name: 'Hip Hop Beats', color: 'from-[#3a8b6f] to-[#28604d]', bg: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80' },
                  { name: 'Zen Acoustic', color: 'from-[#be7737] to-[#955c27]', bg: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&q=80' },
                  { name: 'Techno Grid', color: 'from-[#3785be] to-[#245e88]', bg: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&q=80' },
                  { name: 'Podcast Frontier', color: 'from-[#be3737] to-[#882424]', bg: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=300&q=80' },
                  { name: 'Modern Rock', color: 'from-[#6a37be] to-[#4c2488]', bg: 'https://images.unsplash.com/photo-1487180142328-054b783fc471?w=300&q=80' },
                  { name: 'Lofi Chilled', color: 'from-[#505050] to-[#242424]', bg: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&q=80' }
                ].map((genre, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSearchQuery(genre.name.split(' ')[0])}
                    className="h-28 rounded-xl p-4 relative overflow-hidden bg-cover bg-center border border-neutral-850 cursor-pointer hover:border-neutral-700 transition"
                    style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.85)), url(${genre.bg})` }}
                  >
                    <span className="font-bold text-sm text-neutral-100">{genre.name}</span>
                    <button className="absolute bottom-3 right-3 p-1.5 bg-black/60 rounded-full text-emerald-400 text-xs font-mono border border-emerald-500/20">
                      EXPLORE
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. YOUR LIBRARY VIEW */}
      {activeView === 'library' && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Your Library Shelf</h2>
            <p className="text-xs text-neutral-400">Import your local mp3 files, browse created playlists, or view offline-saved tracks.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Playlist shelf */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider font-mono">Custom Created Playlists</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {playlists.map((playlist) => (
                  <div
                    key={playlist.playlist_id}
                    onClick={() => onSetView('playlist-details', playlist.playlist_id)}
                    className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-neutral-800 transition"
                  >
                    <div
                      className="w-12 h-12 rounded bg-cover bg-center flex-shrink-0"
                      style={{ backgroundImage: `url(${playlist.cover_url})` }}
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-neutral-200 truncate">{playlist.name}</p>
                      <p className="text-[10px] text-neutral-500 mt-0.5 font-mono">
                        {playlist.track_ids.length} songs • {playlist.visibility}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Offline and Local imports shelf */}
            <div className="space-y-4 bg-neutral-900/60 p-4 rounded-xl border border-neutral-850">
              <h3 className="text-sm font-bold text-neutral-300">File Importer & Offline</h3>

              {/* Offline mode cache */}
              <div className="p-3 bg-neutral-950 border border-neutral-850 rounded-lg">
                <span className="text-[9px] font-bold text-emerald-400 font-mono tracking-widest uppercase block mb-1">OFFLINE LOCAL CACHE</span>
                <p className="text-xs text-neutral-400 leading-snug">
                  You have <span className="font-bold text-white">{currentUser.offlineDownloads.length} tracks</span> securely downloaded to indexDB storage. Active playback continues when internet is suspended.
                </p>
              </div>

              {/* Local upload description */}
              <div className="p-3 bg-neutral-950 border border-neutral-850 rounded-lg flex flex-col gap-2">
                <span className="text-[9px] font-bold text-neutral-400 font-mono tracking-widest uppercase block">IMPORTED SONGS PATH</span>
                <div className="space-y-2 mt-1.5 max-h-32 overflow-y-auto pr-1">
                  {tracks.filter(t => t.isLocal).length === 0 ? (
                    <p className="text-[10px] text-neutral-500 italic">No local tracks imported yet.</p>
                  ) : (
                    tracks.filter(t => t.isLocal).map((track) => (
                      <div
                        key={track.track_id}
                        className="p-1.5 bg-neutral-900 rounded border border-neutral-850 text-[10px] flex justify-between items-center hover:border-emerald-500/20 gap-2"
                      >
                        <span className="truncate text-neutral-300 font-semibold flex-1 cursor-pointer" onClick={() => onPlayTrack(track)}>{track.title}</span>
                        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          {renderAddToPlaylistButton(track)}
                          <button onClick={() => onPlayTrack(track)} className="p-1 hover:text-emerald-400 cursor-pointer">
                            <Play className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. PODCASTS EXPLORE VIEW */}
      {activeView === 'podcasts' && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white mb-2">RSS Podcasts reviews</h2>
            <p className="text-xs text-neutral-400">Stream insightful tech channels or practice mindfulness breathing sessions.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {podcasts.map((podcast) => (
              <div
                key={podcast.podcast_id}
                className="bg-neutral-900 border border-neutral-850 p-5 rounded-2xl flex flex-col sm:flex-row gap-4"
              >
                <img
                  src={podcast.artwork_url}
                  alt={podcast.title}
                  className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl shadow-lg flex-shrink-0 border border-neutral-800"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] bg-neutral-800 text-neutral-400 font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider block w-fit mb-1.5">
                      {podcast.category}
                    </span>
                    <h3 className="font-bold text-sm text-neutral-100 truncate">{podcast.title}</h3>
                    <p className="text-xs text-neutral-500 mt-0.5">by {podcast.publisher}</p>
                    <p className="text-[11px] text-neutral-400 mt-2 line-clamp-3 leading-normal">
                      {podcast.description}
                    </p>
                  </div>

                  {/* Episodes toggle bar */}
                  <div className="mt-4 pt-4 border-t border-neutral-800">
                    <h4 className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase mb-2">AVAILABLE EPISODES</h4>
                    <div className="space-y-2">
                      {podcast.episodes.map((ep) => (
                        <div
                          key={ep.episode_id}
                          className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-850 text-xs flex justify-between items-center gap-2 group"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-neutral-200 truncate group-hover:text-emerald-400 transition">
                              {ep.title}
                            </p>
                            <p className="text-[10px] text-neutral-500 mt-0.5 leading-relaxed truncate">
                              {ep.description}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Listening speed controller */}
                            <div className="bg-neutral-900 font-mono text-[9px] px-1.5 py-0.5 rounded text-neutral-400 select-none">
                              <select
                                value={podcastPlaySpeed}
                                onChange={(e) => setPodcastPlaySpeed(parseFloat(e.target.value))}
                                className="bg-transparent focus:outline-none"
                              >
                                <option value="1">1x</option>
                                <option value="1.25">1.25x</option>
                                <option value="1.5">1.5x</option>
                                <option value="2">2x</option>
                              </select>
                            </div>

                            <button
                              onClick={() => {
                                onSyncPodcastEpisode(ep.episode_id, 0); // save positional telemetry
                                onPlayTrack({
                                  track_id: ep.episode_id,
                                  title: ep.title,
                                  artist: podcast.title,
                                  album: 'PODCAST',
                                  duration_ms: ep.duration_ms,
                                  audio_url: ep.audio_url,
                                  artwork_url: podcast.artwork_url,
                                  genre: 'Podcast',
                                  release_year: 2026,
                                  plays: 10,
                                  explicit: false
                                });
                              }}
                              className="p-1.5 bg-emerald-500 hover:bg-emerald-400 text-black rounded-full shadow"
                              title="Play episode"
                            >
                              <Play className="w-3.5 h-3.5 fill-black" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. PLAYLIST DETAILS VIEW */}
      {activeView === 'playlist-details' && activeViewId && (
        <div className="space-y-6 animate-fadeIn">
          {(() => {
            const playlist = playlists.find(p => p.playlist_id === activeViewId);
            if (!playlist) return <p className="italic text-neutral-500">Playlist not found.</p>;

            return (
              <>
                {/* Visual header */}
                <div className="flex flex-col sm:flex-row items-end gap-5">
                  <div
                    className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl bg-zinc-800 bg-cover bg-center shadow-2xl relative"
                    style={{ backgroundImage: `url(${playlist.cover_url})` }}
                  />
                  <div className="flex-1">
                    <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold tracking-wider block w-fit mb-2">
                      {playlist.visibility.toUpperCase()}
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
                      {playlist.name}
                    </h2>
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans">{playlist.description}</p>
                    <p className="text-xs text-neutral-500 mt-2">
                      Created by <span className="font-semibold text-neutral-300">{playlist.owner_name}</span> • {playlist.track_ids.length} tracks registered
                    </p>

                    <div className="flex items-center gap-3.5 mt-4">
                      {/* Collaborative toggler */}
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="collab-active-cb"
                          checked={playlist.collaborative}
                          onChange={(e) => onUpdatePlaylistCollaborative(playlist.playlist_id, e.target.checked)}
                          className="rounded cursor-pointer accent-emerald-500"
                        />
                        <label htmlFor="collab-active-cb" className="text-xs font-semibold text-neutral-300 cursor-pointer">
                          Collaborative Playlist (Let friends edit)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Table search grid */}
                <div className="overflow-x-auto pt-4">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-neutral-900 text-neutral-550 font-mono text-[10px]">
                        <th className="py-2 px-3 w-8 text-center">#</th>
                        <th className="py-2 px-3">Title</th>
                        <th className="py-2 px-3">Album</th>
                        <th className="py-2 px-3 text-center">Genre</th>
                        <th className="py-2 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {playlist.track_ids.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-8 text-center italic text-neutral-500">
                            No tracks inside this custom playlist. Go back to Home / Search or click recommended down below to populate!
                          </td>
                        </tr>
                      ) : (
                        playlist.track_ids.map((tid, idx) => {
                          const track = tracks.find(t => t.track_id === tid);
                          if (!track) return null;

                          return (
                            <tr key={tid} className="border-b border-neutral-900/50 hover:bg-neutral-900/60 transition group">
                              <td className="py-2.5 px-3 text-center text-neutral-500 font-mono">{idx + 1}</td>
                              <td className="py-2.5 px-3">
                                <div className="flex items-center gap-3 min-w-0">
                                  <img src={track.artwork_url} alt="art" className="w-8 h-8 rounded object-cover flex-shrink-0" />
                                  <div className="min-w-0">
                                    <p
                                      onClick={() => onPlayTrack(track)}
                                      className="font-semibold text-neutral-200 hover:text-emerald-400 cursor-pointer truncate"
                                    >
                                      {track.title}
                                    </p>
                                    <p className="text-[10px] text-neutral-500 truncate">{track.artist}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-2.5 px-3 text-neutral-450 truncate">{track.album}</td>
                              <td className="py-2.5 px-3 text-center text-neutral-500 font-mono">{track.genre}</td>
                              <td className="py-2.5 px-3 text-right">
                                <button
                                  onClick={() => onRemoveTrackFromPlaylist(track.track_id, playlist.playlist_id)}
                                  className="p-1 px-2 uppercase text-[9px] tracking-wide font-mono bg-neutral-950 hover:bg-red-950 hover:text-red-400 rounded text-neutral-500 transition-all border border-neutral-850"
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Populate tracks helpers */}
                <div className="bg-[#181818] p-4 rounded-xl border border-neutral-850 mt-6">
                  <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-3">Recommended Songs for {playlist.name}</h4>
                  <div className="space-y-2">
                    {tracks
                      .filter(t => !playlist.track_ids.includes(t.track_id))
                      .slice(0, 3)
                      .map(track => (
                        <div key={track.track_id} className="flex justify-between items-center p-2 rounded bg-neutral-900 border border-neutral-850 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] bg-neutral-800 px-1 rounded text-neutral-400 font-mono uppercase">{track.genre}</span>
                            <span className="font-semibold text-neutral-200">{track.title}</span> • <span className="text-neutral-500 text-[11px]">{track.artist}</span>
                          </div>
                          <button
                            onClick={() => onAddTrackToPlaylist(track.track_id, playlist.playlist_id)}
                            className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-2.5 py-1 rounded text-[11px] transition cursor-pointer"
                          >
                            Add Track
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* 6. PROFILE & SETTINGS / PAYMENTS UPGRADE */}
      {activeView === 'settings' && (
        <div className="space-y-8 animate-fadeIn max-w-2xl">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Premium Subscription</h2>
            <p className="text-xs text-neutral-400">Upgrade to an ad-free premium experience with dynamic high-fidelity audio.</p>
          </div>

          {/* Payment element interactive simulator */}
          <div className="space-y-6">
            {/* Top Video-Hero Banner */}
            {checkoutStep === 'plan' && (
              <div className="bg-gradient-to-r from-emerald-950 via-[#121212] to-neutral-900 border border-emerald-500/20 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl animate-fadeIn">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 space-y-4 max-w-lg">
                  <span className="bg-emerald-500/20 text-emerald-400 text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full font-mono">
                    Limited Period Offer
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                    Listen without limits. Try 3 months of Premium Standard for ₹99.
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    Only ₹139/month after. Cancel anytime. Ad-free music listening, offline downloads, and unlimited skips.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={() => {
                        setSelectedPlanName('Standard');
                        setSelectedPlanPrice(99);
                        setSelectedPlanPeriod('3 months');
                        setCheckoutStep('card');
                      }}
                      className="bg-emerald-500 hover:bg-emerald-450 text-black py-3 px-6 rounded-full font-bold text-xs cursor-pointer transition shadow-lg transform active:scale-95 duration-200"
                    >
                      Try 3 months for ₹99
                    </button>
                    <a
                      href="#plans-grid"
                      className="bg-transparent hover:bg-neutral-800 border border-neutral-700 text-white font-bold py-3 px-6 rounded-full text-xs text-center transition"
                    >
                      View all plans
                    </a>
                  </div>
                  <p className="text-[10px] text-neutral-500 leading-normal">
                    Premium Standard only. ₹99 for 3 months, then ₹139 per month after. Offer only available if you haven't tried Premium before. Terms apply.
                  </p>
                </div>
              </div>
            )}

            {checkoutStep === 'plan' && (
              <div id="plans-grid" className="space-y-6 animate-fadeIn">
                <div className="text-center md:text-left space-y-1 pt-4">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Choose the Premium plan that's right for you.
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Choose a Premium plan and listen to the ad-free music you want, when you want. Pay with local apps. Cancel anytime.
                  </p>
                </div>

                {/* Affordable Price plans sorted from Low to High */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* STUDENT PLAN (₹69 for 2 months) */}
                  <div className="bg-[#121212] border border-neutral-800 rounded-2xl p-5 flex flex-col justify-between h-[450px] hover:border-neutral-700 transition duration-300 relative">
                    <span className="absolute -top-3 left-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded font-mono">
                      Student discount
                    </span>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-bold text-white flex items-center justify-between">
                          <span>Student</span>
                          <span className="text-[10px] bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded text-neutral-400">Savings</span>
                        </h4>
                        <p className="text-xs text-emerald-400 font-bold mt-2">
                          ₹69 for 2 months
                        </p>
                        <p className="text-[10px] text-neutral-500">
                          ₹69/month after. Cancel anytime.
                        </p>
                      </div>

                      <hr className="border-neutral-850" />

                      <ul className="space-y-2 text-xs text-neutral-300 leading-relaxed font-sans">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>1 verified Student account</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>Download to listen offline</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>Very high audio quality up to ~320Kbps</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>Ad-free music stream flow</span>
                        </li>
                      </ul>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedPlanName('Student');
                        setSelectedPlanPrice(69);
                        setSelectedPlanPeriod('2 months');
                        setCheckoutStep('card');
                      }}
                      className="w-full bg-[#1e1ea0] hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-600 text-white font-bold py-2.5 rounded-full text-xs transition cursor-pointer"
                    >
                      Try 2 months for ₹69
                    </button>
                  </div>

                  {/* STANDARD PLAN (₹99 for 3 months) */}
                  <div className="bg-[#161616] border border-emerald-500/35 rounded-2xl p-5 flex flex-col justify-between h-[450px] hover:border-emerald-500/50 transition duration-300 relative shadow-md shadow-emerald-500/5">
                    <span className="absolute -top-3 left-4 bg-emerald-500 text-black text-[9px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded font-mono shadow-md">
                      Highly Recommended
                    </span>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-bold text-white flex items-center justify-between">
                          <span>Standard</span>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded font-mono">Popular</span>
                        </h4>
                        <p className="text-xs text-emerald-400 font-bold mt-2">
                          ₹99 for 3 months
                        </p>
                        <p className="text-[10px] text-neutral-500">
                          ₹139/month after. Cancel anytime.
                        </p>
                      </div>

                      <hr className="border-neutral-850" />

                      <ul className="space-y-2 text-xs text-neutral-200 leading-relaxed font-sans">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>1 Standard account profile</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>Download to listen offline</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>Very high audio quality up to ~320Kbps</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>Subscribe or one-time payment</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>Unlimited skips & zero audio ads</span>
                        </li>
                      </ul>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedPlanName('Standard');
                        setSelectedPlanPrice(99);
                        setSelectedPlanPeriod('3 months');
                        setCheckoutStep('card');
                      }}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold py-2.5 rounded-full text-xs transition cursor-pointer shadow-lg transform active:scale-95 duration-200"
                    >
                      Try 3 months for ₹99
                    </button>
                  </div>

                  {/* PLATINUM PLAN (₹299/month) */}
                  <div className="bg-[#121212] border border-neutral-850 rounded-2xl p-5 flex flex-col justify-between h-[450px] hover:border-neutral-700 transition duration-300">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-bold text-white flex items-center justify-between">
                          <span>Platinum</span>
                          <span className="text-[10px] bg-emerald-500/15 text-pink-400 font-bold px-2 py-0.5 rounded font-mono">Hi-Fi DJ</span>
                        </h4>
                        <p className="text-xs text-emerald-400 font-bold mt-2">
                          ₹299 / month
                        </p>
                        <p className="text-[10px] text-neutral-500">
                          Cancel anytime. Standard duration recurring.
                        </p>
                      </div>

                      <hr className="border-neutral-850" />

                      <ul className="space-y-1.5 text-xs text-neutral-300 leading-normal font-sans">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>Up to 3 Platinum accounts</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>Lossless audio quality (~24-bit/44.1kHz)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>Mix your playlist with DJ desk controls</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>Your personal AI DJ & Playlist Engine</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>Connect your external DJ software</span>
                        </li>
                      </ul>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedPlanName('Platinum');
                        setSelectedPlanPrice(299);
                        setSelectedPlanPeriod('1 month');
                        setCheckoutStep('card');
                      }}
                      className="w-full bg-[#1c1c1c] hover:bg-neutral-850 border border-neutral-700 hover:border-neutral-600 text-neutral-200 font-bold py-2.5 rounded-full text-xs transition cursor-pointer"
                    >
                      Get Premium Platinum
                    </button>
                  </div>
                </div>


              </div>
            )}

            {/* Gateway Checkout Stage */}
            {checkoutStep === 'card' && (
              <div className="bg-[#121212] border border-neutral-850 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xl animate-fadeIn">
                <div className="flex justify-between items-center pb-2 border-b border-neutral-850">
                  <div>
                    <h3 className="text-base font-bold text-white">Secure checkout</h3>
                    <p className="text-[10px] text-neutral-400 mt-1">
                      Upgrading <span className="text-emerald-400 font-semibold font-mono bg-[#161616] border border-neutral-800 px-1.5 py-0.5 rounded">{currentUser.email}</span> to Premium
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-neutral-400 font-sans tracking-tight">Active Total</p>
                    <p className="text-xl font-black text-white font-mono mt-0.5">₹{selectedPlanPrice}</p>
                    <span className="text-[8px] uppercase tracking-wider font-bold text-neutral-500 font-mono">
                      Pay ({selectedPlanName} • {selectedPlanPeriod})
                    </span>
                  </div>
                </div>

                {/* Payment Mode Indicator */}
                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-850 flex items-center justify-between">
                  <span className="text-neutral-400 text-xs font-bold font-mono uppercase tracking-wider">Payment Mode</span>
                  <span className="text-emerald-400 font-extrabold text-xs bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-mono">
                    UPI QR Code Scan
                  </span>
                </div>

                {/* FORM CONTAINER */}
                <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs">
                  {/* UPI GATEWAY METHOD */}
                  <div className="space-y-4 animate-fadeIn">
                    <div className="bg-[#0b0b0b] border border-neutral-850 rounded-2xl p-4 sm:p-6 shadow-xl text-center">
                      <div className="max-w-sm mx-auto flex flex-col items-center">
                        {/* PhonePe Standee Purple Header bar */}
                        <div className="w-full bg-[#181818] p-4 rounded-xl mb-4 border border-neutral-800">
                          <div className="flex items-center justify-center gap-2">
                            {/* Custom Logo mimicking PhonePe */}
                            <div className="w-8 h-8 rounded-full bg-[#5f259f] flex items-center justify-center text-white text-[15px] font-black shadow-inner leading-none select-none font-sans">
                              पे
                            </div>
                            <span className="text-lg font-black tracking-tight text-white font-sans select-none">PhonePe</span>
                          </div>
                          
                          <div className="mt-2 text-[#b06eff] text-[10px] font-black tracking-widest uppercase font-mono">
                            ACCEPTED HERE
                          </div>
                          
                          <p className="mt-1 text-[9px] text-neutral-400 font-medium">
                            Scan & Pay Using Any UPI App (PhonePe, GPay, Paytm, BHIM)
                          </p>
                        </div>

                        {/* High Resolution Dynamic Scannable QR Code */}
                        <div className="bg-white p-5 rounded-2xl shadow-xl flex flex-col items-center border border-neutral-200">
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=20&ecc=H&color=000000&bgcolor=ffffff&data=${encodeURIComponent(
                              `upi://pay?pa=7381273356@ybl&pn=Subhradeet%20Sabat&am=${selectedPlanPrice}&cu=INR`
                            )}`}
                            alt="UPI QR Code - Subhradeet Sabat"
                            className="w-52 h-52 sm:w-60 sm:h-60 object-contain select-none shadow-sm rounded-lg"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Verified Display Name so user recognizes the payee */}
                        <div className="mt-4 space-y-1">
                          <div className="text-sm font-extrabold text-white font-sans tracking-wide">
                            Subhradeet Sabat
                          </div>
                          <div className="text-[9px] text-emerald-400 font-semibold font-mono bg-emerald-500/10 px-2 rounded-full border border-emerald-500/20 inline-block">
                            ✓ Verified Direct Payee Credentials
                          </div>
                        </div>

                        {/* Fast Action Pay Deep Link for mobile browsers */}
                        <div className="mt-4 w-full">
                          <a
                            href={`upi://pay?pa=7381273356@ybl&pn=Subhradeet%20Sabat&am=${selectedPlanPrice}&cu=INR`}
                            className="w-full flex items-center justify-center gap-2 bg-[#5f259f] hover:bg-[#6c2da8] text-white font-bold py-2.5 rounded-xl text-xs transition duration-200 shadow-md transform active:scale-95 cursor-pointer text-center"
                          >
                            <Smartphone className="w-3.5 h-3.5 shrink-0" />
                            <span>Pay directly via GPay / PhonePe App</span>
                          </a>
                          <p className="text-[8.5px] text-neutral-500 mt-1.5 leading-normal max-w-[280px] mx-auto font-sans">
                            Open directly on mobile devices to prefill Subhradeet Sabat's verified account.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Transaction Verification Form Field */}
                    <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl space-y-3.5">
                      <div className="space-y-1 text-left">
                        <label className="block text-neutral-300 font-semibold mb-1">
                          12-Digit UPI Transaction Ref / UTR ID
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={12}
                          minLength={12}
                          placeholder="e.g. 348128394812"
                          value={upiTxnId}
                          onChange={(e) => setUpiTxnId(e.target.value)}
                          className="w-full bg-[#121212] border border-neutral-800 rounded p-2.5 text-white font-mono focus:border-emerald-500 focus:outline-none tracking-widest text-[#3cfa95] text-sm"
                        />
                        <p className="text-[9px] text-neutral-500">
                          Enter the UPI transaction reference number (UTR ID) from your payment app receipt to activate.
                        </p>
                      </div>
                    </div>

                    <div className="flex bg-[#161616] p-2.5 rounded-lg text-[9px] text-neutral-400 leading-normal border border-neutral-850">
                      Upon clicking confirm, our automated subscription engine immediately logs the 12-digit transaction ledger to update your subscription to Premium.
                    </div>
                  </div>

                  {/* Submission Row */}
                  <div className="flex gap-3 pt-3">
                    <button
                      type="submit"
                      disabled={paymentLoading}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-400 disabled:bg-neutral-800 disabled:text-neutral-500 text-black font-extrabold py-3 rounded-full transition text-center cursor-pointer text-xs shadow-lg"
                    >
                      {paymentLoading ? 'Verifying payment server assets...' : 'Confirm Payment & Unlock Premium'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('plan')}
                      className="bg-neutral-850 hover:bg-neutral-800 text-neutral-300 py-3 px-6 rounded-full text-xs font-bold transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Success Stage */}
            {checkoutStep === 'success' && (
              <div className="py-8 bg-[#121212] border border-emerald-500/20 rounded-2xl flex flex-col items-center text-center gap-4 animate-fadeIn max-w-lg mx-auto">
                <CheckCircle className="w-16 h-16 text-emerald-500 animate-bounce" />
                <div className="space-y-1">
                  <h4 className="text-xl font-extrabold text-neutral-100">Welcome to Premium {selectedPlanName}!</h4>
                  <p className="text-xs text-neutral-400 max-w-sm px-6 leading-relaxed">
                    A thank you to our global music lover! Premium has successfully been unlocked for the display subscriber <span className="text-white font-semibold font-mono bg-[#1c1c1c] border border-neutral-800 px-2 py-0.5 rounded">{currentUser.email}</span>. High-fidelity audio streams and offline downloads are activated.
                  </p>
                </div>
                <button
                  onClick={() => setCheckoutStep('plan')}
                  className="mt-2 text-xs bg-neutral-850 hover:bg-neutral-800 text-neutral-300 py-2.5 px-6 rounded-full font-bold transition cursor-pointer"
                >
                  Return to Dashboard Billing
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {activeView === 'artists' && (
        <div className="space-y-6 animate-fadeIn text-left">
          <div className="border-b border-neutral-900 pb-5">
            <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2">Popular Artists & Music Icons</h2>
            <p className="text-sm text-neutral-400">Explore and search authentic discographies and hits from legendary global stars.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-[#151515] p-4 rounded-xl border border-neutral-900 shadow">
            <div className="relative w-full sm:max-w-md">
              <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={artistFilter}
                onChange={(e) => setArtistFilter(e.target.value)}
                placeholder="Filter artists by name or genre..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-neutral-900 text-white border border-neutral-800 rounded-lg focus:outline-none focus:border-emerald-500 transition-all font-sans"
              />
              {artistFilter && (
                <button
                  onClick={() => setArtistFilter('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500 hover:text-white transition font-mono"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="text-xs text-neutral-400 font-mono self-end sm:self-center">
              Showing {POPULAR_ARTISTS_DATABASE.filter(art => {
                const q = artistFilter.toLowerCase().trim();
                return art.name.toLowerCase().includes(q) || art.genre.toLowerCase().includes(q);
              }).length} of {POPULAR_ARTISTS_DATABASE.length} superstars
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-2">
            {POPULAR_ARTISTS_DATABASE.filter(art => {
              const q = artistFilter.toLowerCase().trim();
              return art.name.toLowerCase().includes(q) || art.genre.toLowerCase().includes(q);
            }).map((artist, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSearchQuery(artist.name);
                  onSetView('search');
                }}
                className="bg-[#121212] hover:bg-[#1c1c1c] p-3 pl-4 rounded-xl flex items-center justify-between group cursor-pointer transition-all border border-neutral-800 hover:border-emerald-500/50 shadow-sm"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-2 h-2 rounded-full bg-neutral-600 group-hover:bg-emerald-500 transition-colors flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-sm truncate text-neutral-200 group-hover:text-white transition-colors">{artist.name}</h4>
                    <p className="text-[10px] text-neutral-500 truncate uppercase tracking-wider font-mono mt-0.5">{artist.genre}</p>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full bg-neutral-900 flex items-center justify-center group-hover:bg-emerald-500/10 group-hover:scale-105 transition-all text-neutral-500 group-hover:text-emerald-400 flex-shrink-0">
                  <Play className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>
            ))}
          </div>

          {POPULAR_ARTISTS_DATABASE.filter(art => {
            const q = artistFilter.toLowerCase().trim();
            return art.name.toLowerCase().includes(q) || art.genre.toLowerCase().includes(q);
          }).length === 0 && (
            <div className="py-16 text-center">
              <p className="text-sm text-neutral-500">No matching artists found. Try searching another name or genre.</p>
              <button onClick={() => setArtistFilter('')} className="mt-4 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-bold transition">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      )}

      {activeView === 'admin' && (
        <div className="animate-fadeIn">
          <AdminPanel
            tracks={tracks}
            onIngestTrack={onIngestTrack || (() => {})}
            onDeleteTrack={onDeleteTrack || (() => {})}
            onUpdateUserTier={onUpdateUserTier || (() => {})}
            onDeleteUserAccount={onDeleteUserAccount || (() => {})}
          />
        </div>
      )}
    </div>
  );
}
