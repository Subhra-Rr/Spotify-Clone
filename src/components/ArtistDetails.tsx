import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Check, 
  Plus, 
  MoreHorizontal, 
  CheckCircle, 
  Volume2, 
  Heart, 
  X,
  ExternalLink,
  Radio,
  FileText,
  AlertTriangle,
  Share2,
  TrendingUp
} from 'lucide-react';
import { Artist, Track, UserProfile } from '../types';

interface ArtistDetailsProps {
  artist: Artist;
  currentUser: UserProfile;
  currentTrack: Track | null;
  isPlaying: boolean;
  activeTrackId: string | null;
  favoriteTrackIds: string[];
  onPlayTrack: (track: Track) => void;
  onTogglePlay: () => void;
  onToggleFollowArtist: (artistId: string) => void;
  onToggleFavorite: (trackId: string) => void;
  onShowToast?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export default function ArtistDetails({
  artist,
  currentUser,
  currentTrack,
  isPlaying,
  activeTrackId,
  favoriteTrackIds,
  onPlayTrack,
  onTogglePlay,
  onToggleFollowArtist,
  onToggleFavorite,
  onShowToast
}: ArtistDetailsProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const isFollowing = currentUser.followedArtists?.includes(artist.artist_id) || false;

  // Custom Indian numbering system formatting (e.g. 4331184 -> 43,31,184)
  const formatIndianNumber = (num: number): string => {
    const str = num.toString();
    if (str.length <= 3) return str;
    const lastThree = str.substring(str.length - 3);
    const otherParts = str.substring(0, str.length - 3);
    return otherParts.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
  };

  // Convert milliseconds to mm:ss
  const formatDuration = (ms: number): string => {
    const totalSecs = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSecs / 60);
    const seconds = totalSecs % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Shuffle & play all popular tracks of the artist
  const handlePlayArtistPopular = () => {
    if (artist.tracks && artist.tracks.length > 0) {
      onPlayTrack(artist.tracks[0]);
    }
  };

  return (
    <div className="relative flex-1 bg-gradient-to-b from-red-950/70 via-neutral-950 to-black overflow-y-auto text-neutral-300 select-none pb-24 scrollbar-thin">
      
      {/* 1. Epic Artist Header Banner */}
      <div 
        className="relative h-60 md:h-76 flex flex-col justify-end p-6 md:p-8 bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(10,10,10,0.95)), url(${artist.avatar_url})` 
        }}
      >
        <div className="flex items-center gap-2 mb-2 select-none">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#3d91f4] fill-current shrink-0">
            <path d="M12 2l2.4 1.8 2.9-.6.8 2.9 2.7.9-.3 3 1.9 2.3-1.4 2.6.9 2.9-2.5 1.5-.9 2.9-3-.3-2 2.3-2.6-1.4-2.9.9-1.5-2.5-2.9-.9.3-3-2.3-2 1.4-2.6-.9-2.9 2.5-1.5.9-2.9 3 .3zM10.7 15l5.6-5.6-1.4-1.4-4.2 4.2-1.8-1.8-1.4 1.4z" />
          </svg>
          <span className="text-xs font-bold text-white tracking-wide">Verified Artist</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4 select-text drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] leading-none font-sans">
          {artist.name}
        </h1>

        <div className="text-sm text-neutral-200 font-medium font-sans flex items-center gap-1.5 drop-shadow">
          <span>{formatIndianNumber(artist.followers_count || 4331184)}</span>
          <span className="text-neutral-400">monthly listeners</span>
        </div>
      </div>

      {/* 2. Control Row (Big Play, Following, ... Dropdown) */}
      <div className="p-6 md:p-8 flex flex-col gap-6">
        <div className="flex items-center gap-5 relative">
          
          {/* Main Play Circle */}
          <button 
            onClick={handlePlayArtistPopular}
            className="w-14 h-14 bg-emerald-500 hover:bg-emerald-400 text-black rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-emerald-500/10 shrink-0"
            title={`Play ${artist.name}`}
          >
            {isPlaying && currentTrack?.artist_id === artist.artist_id ? (
              <Pause className="w-5 h-5 fill-black font-extrabold" />
            ) : (
              <Play className="w-5 h-5 fill-black ml-0.5 font-extrabold" />
            )}
          </button>

          {/* Shuffle Button using lucide icons to replace error route */}
          <button 
            onClick={handlePlayArtistPopular}
            className="text-neutral-400 hover:text-emerald-400 transition-colors cursor-pointer p-1.5 hover:scale-105 active:scale-95"
            title="Shuffle play artist popular tunes"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
              <path d="M16 3h5v5M4 20l5-5M20 3L14 9M3 3h5v5M14 15l6 5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Follow Button */}
          <button 
            onClick={() => onToggleFollowArtist(artist.artist_id)}
            className={`border rounded-full px-6 py-1.5 text-xs font-bold tracking-wider uppercase transition active:scale-95 cursor-pointer ${
              isFollowing 
                ? 'border-neutral-500 bg-neutral-900 text-neutral-300 hover:border-white hover:text-white' 
                : 'border-neutral-700 bg-transparent text-white hover:border-emerald-500 hover:text-emerald-400'
            }`}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>

          {/* Options button (three dots) */}
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className={`text-neutral-400 hover:text-white transition-colors cursor-pointer p-1.5 rounded-full hover:bg-neutral-900 ${showDropdown ? 'bg-neutral-850 text-white' : ''}`}
            title="Artist Options"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>

          {/* 3. Dropdown Menu (Matches Image UI Position and Content!) */}
          {showDropdown && (
            <div className="absolute left-64 top-10 bg-neutral-900 border border-neutral-800 rounded shadow-2xl p-1 w-52 z-30 animate-fadeIn flex flex-col">
              <button 
                onClick={() => {
                  onToggleFollowArtist(artist.artist_id);
                  setShowDropdown(false);
                }}
                className="w-full text-left px-3.5 py-2 hover:bg-neutral-800 rounded font-sans text-xs text-neutral-200 hover:text-white transition flex items-center justify-between"
              >
                <span>{isFollowing ? 'Unfollow' : 'Follow'}</span>
                <span className="text-[10px] text-neutral-500 font-mono">⌘F</span>
              </button>
              
              <button 
                onClick={() => {
                  if (onShowToast) {
                    onShowToast(`Restricted artist. ${artist.name} will not be automatically pooled into your recommendation feeds.`, 'warning');
                  } else {
                    alert(`Restricted artist. ${artist.name} will not be automatically pooled into your recommendation feeds.`);
                  }
                  setShowDropdown(false);
                }}
                className="w-full text-left px-3.5 py-2 hover:bg-neutral-800 rounded font-sans text-xs text-neutral-200 hover:text-white transition flex items-center gap-2"
              >
                <span>Don't play this artist</span>
              </button>
              
              <button 
                onClick={() => {
                  if (onShowToast) {
                    onShowToast(`Navigated to direct 24/7 radio playlist seeded by ${artist.name} discography.`, 'success');
                  } else {
                    alert(`Navigated to direct 24/7 radio playlist seeded by ${artist.name} discography.`);
                  }
                  setShowDropdown(false);
                }}
                className="w-full text-left px-3.5 py-2 hover:bg-neutral-800 rounded font-sans text-xs text-neutral-200 hover:text-white transition flex items-center gap-2"
              >
                <span>Go to artist radio</span>
              </button>
              
              <button 
                onClick={() => {
                  if (onShowToast) {
                    onShowToast('Our compliance crew will audit these audio streams.', 'info');
                  } else {
                    alert('Thank you for your response. Our compliance crew will audit these audio streams.');
                  }
                  setShowDropdown(false);
                }}
                className="w-full text-left px-3.5 py-2 hover:bg-neutral-800 rounded font-sans text-xs text-neutral-200 hover:text-white transition flex items-center justify-between"
              >
                <span>Report</span>
                <ExternalLink className="w-3 h-3 text-neutral-500" />
              </button>

              <div className="border-t border-neutral-800/60 my-1" />

              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  if (onShowToast) {
                    onShowToast(`Copied profile link for "${artist.name}"!`, 'success');
                  } else {
                    alert(`Copied high-fidelity profile sync link for "${artist.name}" to clipboard.`);
                  }
                  setShowDropdown(false);
                }}
                className="w-full text-left px-3.5 py-2 hover:bg-neutral-800 rounded font-sans text-xs text-neutral-200 hover:text-white transition flex items-center justify-between"
              >
                <span>Share</span>
                <span className="text-[10px] text-neutral-500 font-mono">↗</span>
              </button>
            </div>
          )}

        </div>

        {/* 4. Popular Songs List Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-sans text-white text-left">Popular</h2>
          
          <div className="flex flex-col gap-0.5">
            {artist.tracks && artist.tracks.map((track, index) => {
              const isCurrent = activeTrackId === track.track_id;
              const isLiked = favoriteTrackIds.includes(track.track_id);

              return (
                <div 
                  key={track.track_id}
                  className={`group flex items-center justify-between py-2.5 px-4 rounded-lg transition-colors hover:bg-neutral-900/60 font-sans ${isCurrent ? 'bg-neutral-900/40 text-emerald-400' : ''}`}
                >
                  
                  {/* Left block (number index, tiny art, title/explicit) */}
                  <div className="flex items-center gap-4 min-w-0 pr-4">
                    <span className="w-5 text-neutral-500 text-xs font-semibold text-center select-none">
                      {isCurrent && isPlaying ? (
                        <div className="flex items-end justify-center gap-0.5 h-3 w-5">
                          <span className="w-0.5 h-2 bg-emerald-500 animate-pulse" />
                          <span className="w-0.5 h-3 bg-emerald-500 animate-pulse delay-75" />
                          <span className="w-0.5 h-1 bg-emerald-550 animate-pulse delay-150" />
                        </div>
                      ) : (
                        <span className="group-hover:hidden">{index + 1}</span>
                      )}
                      
                      <button 
                        onClick={() => onPlayTrack(track)}
                        className="hidden group-hover:block w-full focus:outline-none"
                      >
                        {isCurrent && isPlaying ? (
                          <Pause className="w-3.5 h-3.5 text-white fill-current mx-auto" />
                        ) : (
                          <Play className="w-3.5 h-3.5 text-white fill-current mx-auto" />
                        )}
                      </button>
                    </span>

                    {/* Album cover art match */}
                    <img 
                      src={track.artwork_url} 
                      alt="" 
                      className="w-10 h-10 object-cover rounded shadow flex-shrink-0" 
                      referrerPolicy="no-referrer"
                    />

                    {/* Track descriptive tags */}
                    <div className="min-w-0">
                      <p className={`text-xs font-semibold truncate ${isCurrent ? 'text-emerald-400' : 'text-white'}`}>
                        {track.title}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        {track.explicit && (
                          <span className="text-[9px] bg-neutral-800 text-neutral-400 px-1 py-0.2 rounded font-mono font-bold uppercase select-none shrink-0" title="Explicit lyrics">
                            E
                          </span>
                        )}
                        <p className="text-[10px] text-neutral-500 truncate">
                          {track.artist}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mid block (plays count matching image layout) */}
                  <div className="hidden sm:block text-xs font-mono text-neutral-400 text-right min-w-24 shrink-0">
                    {formatIndianNumber(track.plays)}
                  </div>

                  {/* Right block (hearted toggle icon, duration time) */}
                  <div className="flex items-center gap-4 shrink-0 pr-1">
                    <button 
                      onClick={() => onToggleFavorite(track.track_id)}
                      className="text-neutral-500 hover:text-rose-500 transition-colors p-1"
                      title={isLiked ? "Remove from Favorites" : "Add to Favorites"}
                    >
                      <Heart 
                        className={`w-4 h-4 transition ${
                          isLiked 
                            ? 'fill-rose-500 text-rose-500 scale-105' 
                            : 'text-neutral-500 hover:text-neutral-200'
                        }`} 
                      />
                    </button>
                    <span className="text-[11px] font-mono text-neutral-500">
                      {formatDuration(track.duration_ms)}
                    </span>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Banner Advertisement (Literal Clone of Screenshot bottom bar!) */}
        <div className="pt-6 select-text text-left">
          <div className="relative bg-[#0d0e14] border border-neutral-920 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between p-5 md:p-6 gap-4">
            
            {/* Background design accents */}
            <div className="absolute right-0 top-0 w-28 h-28 bg-emerald-500/5 rounded-full blur-2xl" />
            <div className="absolute left-0 bottom-0 w-44 h-44 bg-blue-500/5 rounded-full blur-3xl" />

            <div className="flex items-start gap-4 z-10 w-full md:w-auto">
              {/* Financial chart mini icon */}
              <div className="w-11 h-11 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center shrink-0 text-emerald-400">
                <TrendingUp className="w-5 h-5 animate-pulse" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm md:text-base font-extrabold text-white tracking-wide">
                  Trade Gold With Tight Spreads
                </h4>
                <p className="text-xs text-neutral-200 font-bold mt-0.5 font-sans">
                  Over <span className="text-emerald-400 font-black">$5,000</span> in Deposit Bonuses
                </p>
                <p className="text-[9px] text-neutral-550 mt-1 pb-1 font-mono tracking-tight uppercase leading-none">
                  Your capital is at risk. *T&Cs apply.
                </p>
              </div>
            </div>

            {/* Premium corporate action branding */}
            <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-end z-10">
              <div className="text-right">
                <p className="text-[9px] font-bold tracking-widest text-[#d5a549] uppercase font-mono leading-none">XM SPONSOR</p>
                <div className="flex items-center gap-0.5 justify-end mt-0.5">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce" />
                  <span className="text-[13px] font-black text-white font-serif tracking-tighter uppercase">XM</span>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  if (onShowToast) {
                    onShowToast('Exiting safely to secure financial checkout gateway...', 'info');
                  } else {
                    alert('Exiting safely to secure financial checkout gateway.');
                  }
                }}
                className="bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded shadow hover:shadow-emerald-500/20 active:scale-95 transition cursor-pointer"
              >
                Trade Now
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
