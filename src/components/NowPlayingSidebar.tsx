import React from 'react';
import { Check, Plus, Users, Music2, Disc } from 'lucide-react';
import { Track, UserProfile, Artist } from '../types';

interface NowPlayingSidebarProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentUser: UserProfile;
  playQueue: Track[];
  queueIndex: number;
  onToggleFollowArtist: (artistId: string) => void;
  onPlayTrack: (track: Track) => void;
  onSetView: (view: string, id?: string) => void;
  artists?: Artist[];
  onShowToast?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export default function NowPlayingSidebar({
  currentTrack,
  isPlaying,
  currentUser,
  playQueue,
  queueIndex,
  onToggleFollowArtist,
  onPlayTrack,
  onSetView,
  artists = [],
  onShowToast
}: NowPlayingSidebarProps) {
  // If there is no track currently playing, return a beautiful placeholder empty state
  if (!currentTrack) {
    return (
      <div className="w-80 bg-[#121212] rounded-lg flex-shrink-0 hidden lg:flex flex-col items-center justify-center p-6 text-center text-neutral-500 shadow-md">
        <Disc className="w-12 h-12 mb-4 text-neutral-700 animate-spin" style={{ animationDuration: '6s' }} />
        <h3 className="text-sm font-extrabold text-neutral-400">Now Playing View</h3>
        <p className="text-xs text-neutral-600 mt-2 max-w-xs leading-relaxed">
          Select or play any song from the home feed or click search to populate your active layout.
        </p>
      </div>
    );
  }

  // Get next track in queue safely
  let nextTrack: Track | null = null;
  if (playQueue.length > 0 && queueIndex !== -1) {
    const nextIdx = (queueIndex + 1) % playQueue.length;
    nextTrack = playQueue[nextIdx];
  }

  // Check if we are following KR$NA
  const isFollowingKrsna = currentUser.followedArtists?.includes('artist-krsna') || false;
  // Dhanda Nyoliwala is another artist on Boom Shaka
  const isFollowingDhanda = currentUser.followedArtists?.includes('artist-dhanda') || false;

  return (
    <div className="w-80 bg-[#121212] rounded-lg flex-shrink-0 hidden lg:flex flex-col overflow-y-auto select-none p-4 text-left shadow-md">
      
      {/* Header section (Titled Context, e.g. "Liked Songs" as seen in screenshot) */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-900 mb-4 pr-1">
        <h3 className="text-sm font-extrabold text-neutral-200 tracking-wide font-sans">
          Liked Songs
        </h3>
        <span className="text-[10px] bg-neutral-900 text-neutral-500 font-mono px-2 py-0.5 rounded uppercase tracking-wider">
          Now Active
        </span>
      </div>

      {/* Main rotating/styled cover art card */}
      <div className="group relative w-full aspect-square rounded-xl overflow-hidden shadow-2xl border border-neutral-900 mb-4 transition-transform hover:scale-[1.01]">
        <img 
          src={currentTrack.artwork_url} 
          alt="" 
          className="w-full h-full object-cover" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <span className="text-[10px] text-white/90 bg-neutral-950/80 backdrop-blur-sm px-2.5 py-1 rounded font-sans uppercase tracking-widest leading-none">
            {currentTrack.album || 'Single'}
          </span>
        </div>
      </div>

      {/* Active Track Title and Singer credits */}
      <div className="flex items-start justify-between gap-1 mb-6">
        <div className="min-w-0">
          <h4 className="text-base font-black text-white truncate font-sans tracking-wide leading-snug">
            {currentTrack.title}
          </h4>
          <div className="flex items-center gap-1 mt-0.5 min-w-0">
            <p className="text-xs text-neutral-400 truncate font-sans font-medium">
              {currentTrack.artist}
            </p>
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
              <Check className="w-2.5 h-2.5 stroke-[4]" />
            </div>
          </div>
        </div>
      </div>

      {/* Credits block (Dynamic replica of Spotify's credits with individual action buttons) */}
      <div className="bg-neutral-950 border border-neutral-910 p-4 rounded-xl mb-4 text-left">
        <div className="flex items-center justify-between mb-3">
          <h5 className="text-xs font-black text-white tracking-wide uppercase font-sans">Credits</h5>
          <button 
            onClick={() => {
              const mainArtistName = currentTrack.artist.split(/, | & | feat\. | and /i)[0]?.trim();
              const matchedArtist = artists.find(a => a.name.toLowerCase() === mainArtistName?.toLowerCase());
              if (matchedArtist) {
                onSetView('artist-details', matchedArtist.artist_id);
              } else if (currentTrack.artist_id) {
                onSetView('artist-details', currentTrack.artist_id);
              } else {
                onSetView('artists');
              }
            }}
            className="text-[10px] text-neutral-400 hover:text-emerald-400 font-bold font-sans transition pointer-events-auto cursor-pointer"
          >
            Show all
          </button>
        </div>

        <div className="space-y-4">
          {(() => {
            const artistNames = currentTrack.artist.split(/, | & | feat\. | and /i).map(n => n.trim()).filter(Boolean);
            return artistNames.map((name, index) => {
              const matchedArtist = artists.find(a => a.name.toLowerCase() === name.toLowerCase());
              const artistId = matchedArtist?.artist_id || `artist-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
              const isFollowing = currentUser.followedArtists?.includes(artistId) || false;

              return (
                <div key={`${artistId}-${index}`} className="flex items-center justify-between gap-2 select-text">
                  <div className="min-w-0 flex-1">
                    <p 
                      onClick={() => onSetView('artist-details', artistId)}
                      className="text-xs font-bold text-neutral-200 hover:text-emerald-400 cursor-pointer truncate font-sans"
                    >
                      {name}
                    </p>
                    <p className="text-[10px] text-neutral-500 mt-0.5">
                      {index === 0 ? 'Main Artist' : 'Featured Artist'}
                    </p>
                  </div>
                  <button 
                    onClick={() => onToggleFollowArtist(artistId)}
                    className={`border rounded-full px-4 py-1 text-[9px] font-black uppercase tracking-wider transition cursor-pointer shrink-0 ${
                      isFollowing 
                        ? 'border-neutral-700 bg-neutral-900 text-neutral-400 hover:border-white hover:text-white'
                        : 'border-emerald-500/10 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-black hover:border-emerald-500 pointer-events-auto'
                    }`}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>
                </div>
              );
            });
          })()}

          {/* Additional Credits Details */}
          <div className="border-t border-neutral-900/45 pt-3 flex flex-col gap-1 select-text">
            <p className="text-xs text-neutral-200 font-bold font-sans">
              {currentTrack.artist.split(/, | & | feat\. | and /i)[0] || currentTrack.artist}
            </p>
            <p className="text-[10px] text-neutral-500 font-sans">Composer • Vocals • Lyricist</p>
          </div>
        </div>
      </div>

      {/* Next in Queue slide card */}
      {nextTrack && (
        <div className="bg-neutral-950 border border-neutral-910 p-4 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-xs font-black text-white tracking-wide uppercase font-sans">Next in queue</h5>
            <button 
              onClick={() => onShowToast ? onShowToast('Accessing play history is available in bottom player queue.', 'info') : alert('Accessing full localized play history is available in Bottom player controller queue.')}
              className="text-[10px] text-neutral-400 hover:text-emerald-400 font-bold font-sans transition"
            >
              Open queue
            </button>
          </div>

          <div 
            onClick={() => onPlayTrack(nextTrack!)}
            className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-neutral-900/60 cursor-pointer transition-colors"
          >
            <img 
              src={nextTrack.artwork_url} 
              alt="" 
              className="w-10 h-10 object-cover rounded shadow shrunk-0" 
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate font-sans">{nextTrack.title}</p>
              <p className="text-[10px] text-neutral-500 truncate mt-0.5">{nextTrack.artist}</p>
            </div>
            <div className="text-[9px] text-neutral-500 bg-neutral-900 px-1.5 py-0.5 rounded font-mono shrink-0">
              NEXT
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
