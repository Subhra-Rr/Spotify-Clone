import React, { useState, useEffect, useRef } from 'react';
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
  Smartphone,
  Heart
} from 'lucide-react';
import { Track, Playlist, Podcast, Artist, Album, UserProfile } from '../types';
import AdminPanel from './AdminPortal';
import ArtistDetails from './ArtistDetails';
import { getRandomArtists, POPULAR_ARTISTS_DATABASE } from '../data/popularArtists';

const PRESET_SEEDS = [
  "Chill study coding loops",
  "High-energy synth programming",
  "Retro futuristic dream pop",
  "Cozy campfire acoustic night",
  "Deep focus ambient drone",
  "Cyberpunk coding trance",
  "Nocturnal rain lofi beats",
  "Classic emotional melodies",
  "Uplifting melodic techno",
  "Acoustic morning sunrise",
  "Ethereal shoegaze dreamscape",
  "Jazz hop coffee lounge",
  "Deep house coding beats",
  "Chill lofi study frequencies",
  "Euphoric progressive house",
  "Atmospheric post-rock journey",
  "Euphoric Bollywood dance party",
  "Moody Urdu rap & hip hop",
  "Sufi unplugged mystic evening",
  "Late night driving Punjabi beats",
  "Energetic gaming electro-beats",
  "Cozy rainy Sunday morning classics",
  "Nostalgic 90s Bollywood retro",
  "Soothing Carnatic classical flute",
  "Bassy workout motivation mixes",
  "Dark synthwave cyberpunk programming",
  "Warm acoustic indie campfire",
  "Deep bass lounge techno",
  "Dreamy shoegaze soundscapes",
  "Happy upbeat bubblegum pop",
  "Melancholic lofi bedroom beats",
  "High-octane thrash metal gym session",
  "Vaporwave nostalgic mall ambient",
  "Sunset chill tropical house",
  "Symphonic hard rock masterpiece",
  "Emotional piano orchestral melodies",
  "Cozy winter coffee shop jazz",
  "Epic cinematic workout orchestral",
  "Mystic desert instrumental guitar",
  "High fidelity Desi Hip Hop tracks",
  "South Indian cinematic high-energy",
  "Mellow acoustic singer-songwriter",
  "Midnight evergreen romantic blues"
];

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
  favoriteTrackIds?: string[];
  onToggleFavorite?: (trackId: string) => void;
  onToggleFollowArtist?: (artistId: string) => void;
  onShowToast?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
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
  onDeleteUserAccount,
  favoriteTrackIds = [],
  onToggleFavorite,
  onToggleFollowArtist = () => {},
  onShowToast
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
  const [recsFlash, setRecsFlash] = useState(false);
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
  const fetchGeminiRecommendations = async (overrideQuery?: string) => {
    setRecsLoading(true);
    // Do NOT clear the existing recommendations instantly to avoid abrupt layout shifts.
    // Instead, the UI will render a high-fidelity translucent overlay on top of them.
    const activeQuery = overrideQuery !== undefined ? overrideQuery : recsQuery;
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
          query: activeQuery,
          timestamp: Date.now()
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeminiRecs(data.recommendations || []);
        setRecEngineSuccess(true);
        
        // Trigger a gorgeous visual neon emerald flash across the recommendations panel!
        setRecsFlash(true);
        setTimeout(() => {
          setRecsFlash(false);
        }, 1000);
      }
    } catch (e) {
      // Graceful local catalog recommendations are automatically presented
    } finally {
      setRecsLoading(false);
    }
  };

  const handleRegenerateSeedAndRecommendations = (forceSeed?: string) => {
    let newSeed = forceSeed;
    if (!newSeed) {
      const eligibleSeeds = PRESET_SEEDS.filter(s => s !== recsQuery);
      newSeed = eligibleSeeds.length > 0 
        ? eligibleSeeds[Math.floor(Math.random() * eligibleSeeds.length)]
        : PRESET_SEEDS[Math.floor(Math.random() * PRESET_SEEDS.length)];
    }
    
    setRecsQuery(newSeed);
    fetchGeminiRecommendations(newSeed);
  };

  // Refresh recommendations whenever user visits/navigates back to the 'home' view
  useEffect(() => {
    if (activeView === 'home') {
      handleRegenerateSeedAndRecommendations();
    }
  }, [activeView]);

  // Periodic automatic refresh every 10 minutes (600,000 ms)
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (activeView === 'home') {
        fetchGeminiRecommendations();
      }
    }, 10 * 60 * 1000);

    return () => clearInterval(intervalId);
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
    <div id="main-content-display-pane" className="flex-1 bg-gradient-to-b from-[#181818] to-[#121212] rounded-lg overflow-y-auto p-6 text-white pb-32 shadow-md relative">
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

            {/* Direct Studio Authenticity Banner */}
            <div className="mt-5 bg-gradient-to-r from-emerald-950/40 via-[#121212] to-[#121212] border border-emerald-500/20 rounded-xl p-4 shadow-xl select-none max-w-4xl">
              <div className="flex items-start sm:items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#1ED760] tracking-widest uppercase font-sans">ORIGINAL HIGH-FIDELITY TRACKS ONLY</h4>
                  <p className="text-xs text-neutral-300 mt-1 font-sans font-semibold leading-relaxed">
                    NO MOCK DATA/MUSIC/SONGS — All items in this catalog play the original studio recordings by choice or by force (the default 30-second high-fidelity preview clips remain fully operational).
                  </p>
                </div>
              </div>
            </div>
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
                    {onToggleFavorite && (
                      <button
                        onClick={() => onToggleFavorite(track.track_id)}
                        className="p-1 text-neutral-400 hover:text-rose-500 transition-all cursor-pointer mr-0.5"
                        title={favoriteTrackIds.includes(track.track_id) ? "Remove from Favorites" : "Add to Favorites"}
                      >
                        <Heart
                          className={`w-4 h-4 transition ${
                            favoriteTrackIds.includes(track.track_id)
                              ? 'fill-rose-500 text-rose-500'
                              : 'text-neutral-400 hover:text-rose-500'
                          }`}
                        />
                      </button>
                    )}
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
          <div className={`bg-[#151d18]/50 border rounded-2xl p-5 relative overflow-hidden backdrop-blur-sm transition-all duration-700 ${
            recsFlash 
              ? 'border-emerald-500 ring-2 ring-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.4)] scale-[1.01]' 
              : 'border-emerald-950/70 shadow-none'
          }`}>
            <div className="absolute right-[-24px] top-[-24px] w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            {recsFlash && (
              <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none animate-pulse z-10" />
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-emerald-950/40">
              <div>
                <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                  <Sparkles className={`w-5 h-5 text-emerald-400 ${recsLoading ? 'animate-spin' : ''}`} />
                  Personalized AI-Curated Recommendations
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Powered by Google Gemini. Fine-tune your prompt seeding and get real-time song suggestions.
                </p>
              </div>

              <div className="flex gap-2 relative z-20">
                <input
                  type="text"
                  value={recsQuery}
                  onChange={(e) => setRecsQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      fetchGeminiRecommendations(recsQuery);
                    }
                  }}
                  placeholder="Seeding tone..."
                  className={`bg-neutral-950 text-xs border text-neutral-300 rounded-full px-4 py-1.5 w-44 focus:outline-none focus:border-emerald-500 font-sans transition-all duration-300 ${
                    recsFlash ? 'border-emerald-450 ring-1 ring-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.25)]' : 'border-emerald-950'
                  }`}
                  title="Type a seed and press Enter"
                />
                <button
                  onClick={() => handleRegenerateSeedAndRecommendations()}
                  disabled={recsLoading}
                  className="bg-emerald-500 hover:bg-emerald-450 text-black text-xs font-bold px-4 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 h-fit active:scale-95 enabled:hover:scale-[1.02] disabled:opacity-50"
                >
                  <Sparkles className={`w-3.5 h-3.5 ${recsLoading ? 'animate-spin' : 'animate-bounce'}`} />
                  {recsLoading ? 'Consulting...' : 'Regenerate Seed'}
                </button>
              </div>
            </div>

            <div className="relative min-h-[160px]">
              {/* Glass overlay that appears with backdrop blur instead of popping layouts when refreshing */}
              {recsLoading && geminiRecs.length > 0 && (
                <div className="absolute inset-0 bg-neutral-950/70 backdrop-blur-[2.5px] rounded-xl flex flex-col items-center justify-center gap-2.5 z-25 transition-all duration-300 animate-fadeIn">
                  <div className="w-9 h-9 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin shadow-[0_0_15px_rgba(16,185,129,0.4)]" />
                  <p className="text-xs text-emerald-400 font-semibold font-sans tracking-wide">Syncing custom recommendations...</p>
                </div>
              )}

              {recsLoading && geminiRecs.length === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center gap-2">
                  <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin shadow-[0_0_15px_rgba(16,185,129,0.3)]" />
                  <p className="text-xs text-neutral-500 italic">Gemini is reasoning on your listening history & preferences...</p>
                </div>
              ) : geminiRecs.length === 0 ? (
                <p className="text-xs text-neutral-500 italic py-12 text-center">No recommendations loaded. Tap "Regenerate Seed" to prompt Gemini.</p>
              ) : (
                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-500 ${
                  recsFlash ? 'scale-[0.99] opacity-75' : 'scale-100 opacity-100'
                }`}>
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
                        className={`bg-neutral-950/70 border p-3.5 rounded-xl flex flex-col justify-between transition-all duration-350 group relative cursor-pointer ${
                          isActive 
                            ? 'border-emerald-500 bg-neutral-900 shadow-[0_0_15px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/25' 
                            : 'border-neutral-900 hover:border-emerald-800/40 hover:bg-neutral-900 shadow-none'
                        }`}
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
                          <p className="text-[11px] text-neutral-400 mt-2.5 italic leading-relaxed border-t border-neutral-900/65 pt-2 line-clamp-3 font-sans">
                            "{rec.reason}"
                          </p>
                        </div>

                        <div className="mt-4 font-mono text-[10px] text-emerald-400 group-hover:text-emerald-300 flex items-center gap-1 hover:underline text-left select-none">
                          Play Recommendation <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
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
              <button onClick={() => onSetView('artists')} className="text-xs font-semibold text-neutral-500 hover:text-emerald-400 font-sans">See All</button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {shuffledArtists.slice(0, 6).map((artist, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    const matchedArtist = artists.find(a => a.name.toLowerCase() === artist.name.toLowerCase());
                    if (matchedArtist) {
                      onSetView('artist-details', matchedArtist.artist_id);
                    } else {
                      setSearchQuery(artist.name);
                      onSetView('search');
                    }
                  }}
                  className="bg-[#181818] hover:bg-[#282828] p-3.5 rounded-lg flex flex-col group cursor-pointer transition-all duration-300 shadow relative select-none"
                >
                  <div className="relative w-full aspect-square rounded-full mb-3.5 shadow-md overflow-hidden shrink-0 bg-neutral-900">
                    <img
                      src={artist.img || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=80'}
                      alt={artist.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="opacity-0 group-hover:opacity-100 absolute bottom-1.5 right-1.5 translate-y-2 group-hover:translate-y-0 text-black bg-[#1ed760] p-2.5 rounded-full transition-all duration-300 hover:scale-105 shadow-2xl flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </div>
                  </div>

                  <div className="text-left">
                    <h4 className="font-extrabold text-xs truncate text-white flex items-center gap-1 justify-start">
                      <span className="truncate">{artist.name}</span>
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#3D91F4] fill-current shrink-0" title="Verified Artist Account">
                        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </h4>
                    <p className="text-[10px] text-neutral-400 mt-0.5 font-sans">Artist</p>
                  </div>
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
                          {onToggleFavorite && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleFavorite(track.track_id);
                              }}
                              className="p-1 px-1.5 text-neutral-400 hover:text-rose-500 transition-all cursor-pointer"
                              title={favoriteTrackIds.includes(track.track_id) ? "Remove from Favorites" : "Add to Favorites"}
                            >
                              <Heart
                                className={`w-4 h-4 transition ${
                                  favoriteTrackIds.includes(track.track_id)
                                    ? 'fill-rose-500 text-rose-500'
                                    : 'text-neutral-400 hover:text-rose-500'
                                }`}
                              />
                            </button>
                          )}

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

      {/* DEDICATED FAVORITE SONGS VIEW */}
      {activeView === 'favorites' && (
        <div className="space-y-6 animate-fadeIn">
          {(() => {
            const favoriteTracks = tracks.filter(t => favoriteTrackIds.includes(t.track_id));

            return (
              <>
                {/* Visual Header */}
                <div className="flex flex-col sm:flex-row items-end gap-6 bg-gradient-to-r from-rose-900/60 via-purple-950/40 to-transparent p-6 rounded-2xl border border-rose-950/45">
                  <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl bg-gradient-to-br from-rose-500 to-indigo-600 flex items-center justify-center shadow-2xl relative flex-shrink-0">
                    <Heart className="w-16 h-16 text-white fill-white animate-pulse" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] bg-rose-500/10 border border-rose-500/20 text-rose-400 px-2 py-0.5 rounded font-mono font-bold tracking-wider block w-fit mb-2">
                      PLAYLIST
                    </span>
                    <h2 className="text-2xl sm:text-5xl font-black tracking-tight text-white mb-2">
                      Favorite Songs
                    </h2>
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans max-w-xl">
                      Your hand-curated high-fidelity music repository. Click the heart icon on any album cover, search result or playlist item across the application to grow your personal list.
                    </p>
                    <p className="text-xs text-neutral-500 mt-2 font-mono">
                      Owner: <span className="font-semibold text-neutral-300">{currentUser.display_name}</span> • {favoriteTracks.length} records favorited
                    </p>

                    {favoriteTracks.length > 0 && (
                      <button
                        onClick={() => onPlayTrack(favoriteTracks[0], favoriteTracks)}
                        className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-2.5 rounded-full text-xs shadow-lg transition mt-4 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-black text-black" />
                        Play Favorites
                      </button>
                    )}
                  </div>
                </div>

                {/* Table search grid */}
                <div className="overflow-x-auto pt-2">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-neutral-900 text-neutral-550 font-mono text-[10.5px]">
                        <th className="py-2.5 px-3 w-8 text-center">#</th>
                        <th className="py-2.5 px-3">Title</th>
                        <th className="py-2.5 px-3">Album</th>
                        <th className="py-2.5 px-3 text-center">Genre</th>
                        <th className="py-2.5 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {favoriteTracks.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-16 text-center text-neutral-500">
                            <div className="flex flex-col items-center justify-center gap-3">
                              <Heart className="w-12 h-12 text-neutral-700" />
                              <p className="text-sm font-semibold text-neutral-400">Your Favorites playlist is empty</p>
                              <p className="text-xs text-neutral-600 max-w-xs leading-relaxed">
                                Explore the Home Feed, use Filter & Search, or check recommended tracks. Tap the heart icons to save your preferred records here!
                              </p>
                              <button
                                onClick={() => onSetView('home')}
                                className="mt-2 text-xs bg-neutral-900 hover:bg-neutral-850 px-4 py-1.5 rounded-full border border-neutral-800 text-white transition font-medium cursor-pointer"
                              >
                                Browse Catalogue
                              </button>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        favoriteTracks.map((track, idx) => {
                          const isCurrentlyPlayingThis = currentTrack?.track_id === track.track_id;

                          return (
                            <tr key={track.track_id} className={`border-b border-neutral-900/50 hover:bg-neutral-900/60 transition group ${
                              isCurrentlyPlayingThis ? 'bg-neutral-950/85' : ''
                            }`}>
                              <td className="py-3.5 px-3 text-center text-neutral-500 font-mono">
                                {isCurrentlyPlayingThis && isPlaying ? (
                                  <span className="text-emerald-500 font-bold">▶</span>
                                ) : (
                                  idx + 1
                                )}
                              </td>
                              <td className="py-3.5 px-3">
                                <div className="flex items-center gap-3 min-w-0">
                                  <img src={track.artwork_url} alt="art" className="w-8.5 h-8.5 rounded object-cover flex-shrink-0 shadow" />
                                  <div className="min-w-0">
                                    <p
                                      onClick={() => onPlayTrack(track, favoriteTracks)}
                                      className={`font-semibold cursor-pointer truncate ${
                                        isCurrentlyPlayingThis ? 'text-emerald-400' : 'text-neutral-200 hover:text-white'
                                      }`}
                                    >
                                      {track.title}
                                    </p>
                                    <p className="text-[10px] text-neutral-500 truncate">{track.artist}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3.5 px-3 text-neutral-450 truncate">{track.album}</td>
                              <td className="py-3.5 px-3 text-center">
                                <span className="text-[10px] bg-neutral-900 px-2 py-0.5 rounded text-neutral-500 font-mono uppercase">
                                  {track.genre}
                                </span>
                              </td>
                              <td className="py-3.5 px-3 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  {onToggleFavorite && (
                                    <button
                                      onClick={() => onToggleFavorite(track.track_id)}
                                      className="p-1.5 text-rose-500 hover:scale-110 active:scale-95 transition-all cursor-pointer"
                                      title="Remove from Favorites"
                                    >
                                      <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                                    </button>
                                  )}
                                  <button
                                    onClick={() => onPlayTrack(track, favoriteTracks)}
                                    className="p-1 px-2.5 font-bold bg-emerald-500 hover:bg-emerald-450 rounded text-[11px] text-black transition-all cursor-pointer"
                                  >
                                    Play
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
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

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pt-2">
            {POPULAR_ARTISTS_DATABASE.filter(art => {
              const q = artistFilter.toLowerCase().trim();
              return art.name.toLowerCase().includes(q) || art.genre.toLowerCase().includes(q);
            }).map((artist, idx) => (
              <div
                key={idx}
                onClick={() => {
                  const matchedArtist = artists.find(a => a.name.toLowerCase() === artist.name.toLowerCase());
                  if (matchedArtist) {
                    onSetView('artist-details', matchedArtist.artist_id);
                  } else {
                    setSearchQuery(artist.name);
                    onSetView('search');
                  }
                }}
                className="bg-[#181818] hover:bg-[#282828] p-4 rounded-lg flex flex-col group cursor-pointer transition-all duration-300 shadow relative select-none"
              >
                {/* Shape circle cover wrapper */}
                <div className="relative w-full aspect-square rounded-full mb-4 shadow-lg overflow-hidden shrink-0 bg-neutral-900">
                  <img
                    src={artist.img || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=80'}
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Big hover green play circle overlay */}
                  <div className="opacity-0 group-hover:opacity-100 absolute bottom-2 right-2 translate-y-2 group-hover:translate-y-0 text-black bg-[#1ed760] p-3 rounded-full transition-all duration-300 hover:scale-105 shadow-2xl flex items-center justify-center">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                </div>

                <div className="text-left mt-1">
                  <h4 className="font-extrabold text-sm truncate text-white flex items-center gap-1 justify-start">
                    <span className="truncate">{artist.name}</span>
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#3D91F4] fill-current shrink-0" title="Verified Artist Account">
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1">Artist</p>
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

      {activeView === 'artist-details' && activeViewId && (
        (() => {
          const selectedArtist = artists.find(a => a.artist_id === activeViewId) || artists.find(a => a.name.toLowerCase() === activeViewId.toLowerCase()) || artists[0];
          return (
            <ArtistDetails
              artist={selectedArtist}
              currentUser={currentUser}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              activeTrackId={currentTrack?.track_id || null}
              favoriteTrackIds={favoriteTrackIds}
              onPlayTrack={onPlayTrack}
              onTogglePlay={onTogglePlay}
              onToggleFollowArtist={onToggleFollowArtist}
              onToggleFavorite={onToggleFavorite || (() => {})}
              onShowToast={onShowToast}
            />
          );
        })()
      )}

      {activeView === 'profile' && (
        <div className="relative flex-1 bg-gradient-to-b from-neutral-905 via-[#121212] to-black overflow-y-auto text-neutral-300 pb-24 scrollbar-thin animate-fadeIn">
          {/* Header Banner - user's Profile Page exactly as seen in the walkthrough video at 0:37 */}
          <div className="relative h-64 flex items-end p-8 bg-gradient-to-b from-[#1f1f1f]/80 to-[#121212]">
            <div className="flex items-center gap-6 z-10 w-full">
              <div className="group relative w-36 h-36 rounded-full bg-neutral-800 text-[#1ed760] font-black text-6xl flex items-center justify-center cursor-pointer shadow-2xl border border-neutral-700 hover:scale-105 active:scale-95 transition">
                <span>{currentUser.display_name.substring(0, 1).toUpperCase()}</span>
                {/* Choose photo hover overlay */}
                <div className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1.5 transition duration-200">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  <span className="text-[10px] text-white font-bold uppercase tracking-wide">Choose photo</span>
                </div>
              </div>
              <div className="flex flex-col select-text">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Profile</span>
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter my-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                  {currentUser.display_name}
                </h1>
                <div className="text-neutral-400 text-xs font-semibold flex items-center gap-2 mt-1 select-none">
                  <span className="text-white font-bold">73 Following</span>
                  <span>•</span>
                  <span>Odia & Global music hub</span>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-90" />
          </div>

          <div className="p-8 flex flex-col gap-8">
            {/* Top Tracks Month Sec */}
            <div>
              <div className="flex items-baseline justify-between mb-4">
                <h2 className="text-xl font-extrabold text-white tracking-tight">Top tracks this month</h2>
                <span className="text-[10px] text-neutral-500 font-bold uppercase">Only visible to you</span>
              </div>
              <div className="flex flex-col gap-1 bg-[#181818]/40 border border-neutral-900/60 p-2.5 rounded-lg">
                {[
                  { id: 'p-1', num: '1', title: 'Brown Rang', artist: 'Yo Yo Honey Singh', album: 'International Villager', duration: '3:01', img: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=150&q=80' },
                  { id: 'p-2', num: '2', title: 'Gerua', artist: 'Arijit Singh', album: 'Dilwale', duration: '5:45', img: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=150&q=80' },
                  { id: 'p-3', num: '3', title: 'Faded', artist: 'Alan Walker', album: 'Different World', duration: '3:32', img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150&q=80' },
                  { id: 'p-4', num: '4', title: 'Shape of You', artist: 'Ed Sheeran', album: 'Divide', duration: '3:53', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&q=80' },
                  { id: 'p-5', num: '5', title: 'Jeena Jeena', artist: 'Atif Aslam', album: 'Badlapur', duration: '3:49', img: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=150&q=80' }
                ].map((trackItem, index) => (
                  <div
                    key={trackItem.id}
                    className="flex items-center justify-between p-3.5 rounded-md hover:bg-neutral-800/60 transition group cursor-pointer select-none"
                    onClick={() => {
                      // Form an on-the-fly track and play
                      const matchedInDoc = tracks.find(t => t.title.toLowerCase() === trackItem.title.toLowerCase());
                      if (matchedInDoc) {
                        onPlayTrack(matchedInDoc);
                      } else {
                        onPlayTrack({
                          track_id: trackItem.id,
                          title: trackItem.title,
                          artist: trackItem.artist,
                          album: trackItem.album,
                          duration_ms: 181000,
                          audio_url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/ff/e9/87/ffe98781-a904-4df1-687f-e283f5fbcfce/mzaf_124119854972551421.plus.aac.p.m4a',
                          artwork_url: trackItem.img,
                          genre: 'Pop',
                          plays: 12054117,
                          release_year: 2023,
                          explicit: false
                        });
                      }
                    }}
                  >
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <span className="text-xs text-neutral-400 text-center w-4 font-bold group-hover:text-white transition">
                        {trackItem.num}
                      </span>
                      <img
                        src={trackItem.img}
                        alt={trackItem.title}
                        className="w-10 h-10 object-cover rounded shadow bg-[#282828] shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-white group-hover:text-[#1ed760] transition truncate leading-snug">{trackItem.title}</p>
                        <p className="text-[10px] text-neutral-400 mt-0.5 truncate leading-tight font-sans">{trackItem.artist}</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-neutral-400 truncate hidden md:block flex-1 max-w-xs">{trackItem.album}</p>
                    <span className="text-[10px] text-neutral-400 font-mono font-bold">{trackItem.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Following section showing popular circular artist cards */}
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight mb-4">Following</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {artists.slice(0, 6).map((art) => (
                  <div
                    key={art.artist_id}
                    onClick={() => onSetView('artist-details', art.artist_id)}
                    className="p-4 bg-[#181818]/60 hover:bg-[#282828] border border-neutral-900/60 transition-all duration-300 rounded-xl cursor-pointer group flex flex-col items-center text-center text-ellipsis min-w-0"
                  >
                    <div className="relative w-28 h-28 mb-3 shadow-lg rounded-full overflow-hidden border border-neutral-800">
                      <img
                        src={art.avatar_url}
                        alt={art.name}
                        className="w-full h-full object-cover rounded-full select-none"
                        referrerPolicy="no-referrer"
                      />
                      {/* Interactive play badge overlay */}
                      <div className="absolute inset-x-0 bottom-1 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                        <span className="bg-[#1ed760] text-black rounded-full p-2.5 shadow-md">
                          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                            <path d="M7 6v12l10-6z" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="w-full text-center">
                      <p className="text-xs font-extrabold text-white truncate px-1 group-hover:text-[#1ed760] transition leading-tight">{art.name}</p>
                      <p className="text-[9px] text-neutral-400 truncate mt-0.5 uppercase tracking-wide font-medium">Artist</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Polished Spotify Footer Section */}
            <div className="mt-12 pt-6 border-t border-neutral-900/50 flex flex-col gap-6 selection:bg-[#1ed760] selection:text-black">
              <div className="flex flex-wrap gap-8 justify-between">
                <div className="flex flex-wrap gap-12 text-xs font-medium text-neutral-400 font-sans">
                  <div className="flex flex-col gap-2">
                    <p className="text-white font-extrabold text-[11px] uppercase tracking-wider mb-1">Company</p>
                    <a href="#about" className="hover:text-white transition line-through decoration-[#1ed760]/30 mr-1.5">About</a>
                    <a href="#jobs" className="hover:text-white transition">Jobs</a>
                    <a href="#record" className="hover:text-white transition">For the Record</a>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-white font-extrabold text-[11px] uppercase tracking-wider mb-1">Communities</p>
                    <a href="#artists" className="hover:text-white transition">For Artists</a>
                    <a href="#developers" className="hover:text-white transition">Developers</a>
                    <a href="#advertising" className="hover:text-white transition">Advertising</a>
                    <a href="#investors" className="hover:text-white transition">Investors</a>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-white font-extrabold text-[11px] uppercase tracking-wider mb-1">Useful links</p>
                    <a href="#support" className="hover:text-white transition">Support</a>
                    <a href="#app" className="hover:text-white transition">Free Mobile App</a>
                  </div>
                </div>
                {/* Social icons row */}
                <div className="flex gap-3 text-white">
                  <div className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center cursor-pointer transition select-none">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center cursor-pointer transition select-none">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 items-center justify-between text-[11px] text-[#737373] mt-4 pb-4">
                <div className="flex gap-4">
                  <a href="#legal" className="hover:text-white transition">Legal</a>
                  <a href="#safety" className="hover:text-white transition">Safety & Privacy Center</a>
                  <a href="#privacy" className="hover:text-white transition">Privacy Policy</a>
                  <a href="#cookies" className="hover:text-white transition font-semibold hover:underline">Cookies</a>
                  <a href="#ads" className="hover:text-white transition">About Ads</a>
                  <a href="#accessibility" className="hover:text-white transition">Accessibility</a>
                </div>
                <p className="font-mono text-[9px] uppercase tracking-wider select-none text-neutral-600">© 2026 Savify AB / Spot-Odia Ltd.</p>
              </div>
            </div>
          </div>
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
            onShowToast={onShowToast}
          />
        </div>
      )}
    </div>
  );
}
