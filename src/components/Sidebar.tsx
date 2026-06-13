import React, { useState } from 'react';
import {
  Home,
  Search,
  Library,
  PlusSquare,
  Settings,
  Heart,
  Music,
  Disc,
  Radio,
  Sparkles
} from 'lucide-react';
import { Playlist, Artist } from '../types';
import { getNotesAndInstrumentsImageForName } from '../data/popularArtists';

interface SidebarProps {
  activeView: string;
  activeViewId?: string | null;
  onSetView: (view: string, id?: string) => void;
  playlists: Playlist[];
  onCreatePlaylist: () => void;
  userEmail: string;
  userDisplayName?: string;
  userTier?: 'free' | 'premium';
  isAdmin: boolean;
  onVoiceCommand: (cmd: string, arg?: string) => void;
  activeTrackTitle: string;
  artists?: Artist[];
}

export default function Sidebar({
  activeView,
  activeViewId,
  onSetView,
  playlists,
  onCreatePlaylist,
  userEmail,
  userDisplayName = 'User',
  userTier = 'free',
  isAdmin,
  onVoiceCommand,
  activeTrackTitle,
  artists = []
}: SidebarProps) {
  const [showProfilePopover, setShowProfilePopover] = useState(false);
  const [librarySearch, setLibrarySearch] = useState('');
  const [showLibSearchInput, setShowLibSearchInput] = useState(false);

  // Sync active library filter tab based on activeView
  const currentFilter = (activeView === 'artists' || activeView === 'artist-details')
    ? 'artists'
    : (activeView === 'favorites' ? 'favorites' : 'playlists');

  const handlePillClick = (filter: 'playlists' | 'artists' | 'favorites') => {
    if (filter === 'artists') {
      onSetView('artists');
    } else if (filter === 'favorites') {
      onSetView('favorites');
    } else {
      onSetView('home');
    }
  };

  return (
    <div id="navigation-sidebar" className="w-64 flex flex-col gap-2 h-full text-neutral-400 select-none flex-shrink-0 bg-transparent">
      {/* Top box: Home and Search */}
      <div className="bg-[#121212] rounded-lg p-5 flex flex-col gap-4 shadow-md">
        <div className="flex flex-col gap-1">
          <button
            onClick={() => onSetView('home')}
            className={`flex items-center gap-4 py-2 px-2 text-sm font-bold rounded-lg transition-all ${
              activeView === 'home' ? 'text-white' : 'hover:text-white transition-colors'
            }`}
          >
            <Home className="w-5 h-5 text-neutral-300" />
            Home
          </button>

          <button
            onClick={() => onSetView('search')}
            className={`flex items-center gap-4 py-2 px-2 text-sm font-bold rounded-lg transition-all ${
              activeView === 'search' ? 'text-white' : 'hover:text-white transition-colors'
            }`}
          >
            <Search className="w-5 h-5 text-neutral-300" />
            Search
          </button>
        </div>
      </div>

      {/* Bottom box: Your Library, Playlists, and Profile */}
      <div className="bg-[#121212] rounded-lg p-4 flex-1 flex flex-col gap-3 shadow-md min-h-0">
        <div className="flex items-center justify-between px-1 flex-shrink-0">
          <button
            onClick={() => onSetView('library')}
            className="flex items-center gap-3 text-neutral-400 hover:text-white transition font-bold text-sm"
          >
            <Library className="w-5 h-5 text-neutral-300" />
            Your Library
          </button>
          <button
            onClick={onCreatePlaylist}
            className="text-neutral-400 hover:text-white hover:bg-neutral-800 p-1.5 rounded-full transition"
            title="Create custom Playlist"
          >
            <PlusSquare className="w-5 h-5" />
          </button>
        </div>

        {/* Library Navigation Pill Filters */}
        <div className="flex gap-1.5 flex-wrap px-1 flex-shrink-0">
          <button
            onClick={() => handlePillClick('playlists')}
            className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${
              currentFilter === 'playlists' ? 'bg-white text-black' : 'bg-neutral-800/80 text-white hover:bg-neutral-800'
            }`}
          >
            Playlists
          </button>
          <button
            onClick={() => handlePillClick('artists')}
            className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${
              currentFilter === 'artists' ? 'bg-white text-black' : 'bg-neutral-800/80 text-white hover:bg-neutral-800'
            }`}
          >
            Artists
          </button>
          <button
            onClick={() => handlePillClick('favorites')}
            className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${
              currentFilter === 'favorites' ? 'bg-white text-black' : 'bg-neutral-800/80 text-white hover:bg-neutral-800'
            }`}
          >
            Favorites
          </button>
          {isAdmin && (
            <button
              onClick={() => onSetView('admin')}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                activeView === 'admin' ? 'bg-[#1ed760] text-black font-extrabold' : 'bg-neutral-800/50 text-emerald-400 hover:bg-neutral-800'
              }`}
            >
              Admin
            </button>
          )}
        </div>

        {/* Small in-library search filter bar */}
        <div className="flex items-center justify-between px-1 py-1 text-xs font-semibold text-neutral-400 flex-shrink-0 border-b border-neutral-900/40">
          <div className="relative flex items-center flex-1 min-w-0 mr-2">
            <button
              onClick={() => setShowLibSearchInput(!showLibSearchInput)}
              className="p-1 hover:text-white rounded-full hover:bg-neutral-800 transition shrink-0"
              title="Search Library"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
            {(showLibSearchInput || librarySearch) && (
              <input
                type="text"
                placeholder="Search library..."
                value={librarySearch}
                onChange={(e) => setLibrarySearch(e.target.value)}
                className="bg-neutral-900 text-white outline-none border-none py-1 px-2.5 rounded text-[11px] w-full ml-1 focus:ring-1 focus:ring-neutral-700"
              />
            )}
          </div>
          <span className="text-[10px] uppercase font-mono tracking-wider shrink-0 text-neutral-500">Recents</span>
        </div>

        {/* Scrollable list of items inside Your Library */}
        <div className="overflow-y-auto flex-1 flex flex-col gap-1 pr-1 scrollbar-thin">
          {currentFilter === 'artists' ? (
            /* Artists Sidebar List view - Exact as show in user's reference video */
            (() => {
              const filteredArtists = artists.filter(artist =>
                artist.name.toLowerCase().includes(librarySearch.toLowerCase())
              );
              if (filteredArtists.length === 0) {
                return (
                  <p className="text-xs text-neutral-500 italic p-3 text-center">No matching artists found</p>
                );
              }
              return filteredArtists.map(artist => (
                <button
                  key={artist.artist_id}
                  onClick={() => onSetView('artist-details', artist.artist_id)}
                  className={`w-full text-left py-2 p-2 rounded-lg transition-all flex items-center gap-3 font-semibold ${
                    activeView === 'artist-details' && activeViewId === artist.artist_id
                      ? 'text-white bg-neutral-800'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-900/40'
                  }`}
                >
                  <img
                    src={getNotesAndInstrumentsImageForName(artist.name)}
                    alt={artist.name}
                    className="w-10 h-10 object-cover rounded-full shadow flex-shrink-0 border border-neutral-900 bg-zinc-800"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs truncate font-bold text-white leading-tight">{artist.name}</p>
                    <p className="text-[10px] text-neutral-400 truncate mt-0.5">Artist</p>
                  </div>
                  {artist.verified && (
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#3d91f4] fill-current shrink-0 mr-1">
                      <path d="M12 2l2.4 1.8 2.9-.6.8 2.9 2.7.9-.3 3 1.9 2.3-1.4 2.6.9 2.9-2.5 1.5-.9 2.9-3-.3-2 2.3-2.6-1.4-2.9.9-1.5-2.5-2.9-.9.3-3-2.3-2 1.4-2.6-.9-2.9 2.5-1.5.9-2.9 3 .3zM10.7 15l5.6-5.6-1.4-1.4-4.2 4.2-1.8-1.8-1.4 1.4z" />
                    </svg>
                  )}
                </button>
              ));
            })()
          ) : currentFilter === 'favorites' ? (
            <button
              onClick={() => onSetView('favorites')}
              className={`w-full text-left py-2 p-2 rounded-lg transition-all flex items-center gap-3 font-semibold ${
                activeView === 'favorites' ? 'text-white bg-neutral-800' : 'text-neutral-300 hover:text-white hover:bg-neutral-900/40'
              }`}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-violet-700 to-indigo-800 rounded flex items-center justify-center flex-shrink-0 shadow">
                <Heart className="w-5 h-5 text-white fill-current" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs truncate font-bold text-white">Liked Songs</p>
                <p className="text-[10px] text-neutral-400 truncate mt-0.5">Fast access playlist</p>
              </div>
            </button>
          ) : (
            /* Playlists List view */
            (() => {
              const filteredPlaylists = playlists.filter(p =>
                p.name.toLowerCase().includes(librarySearch.toLowerCase())
              );
              if (filteredPlaylists.length === 0) {
                return (
                  <div className="p-4 bg-neutral-900/60 border border-neutral-900 rounded-lg text-left">
                    <p className="text-xs font-bold text-white mb-1">Create your first playlist</p>
                    <p className="text-[11px] text-neutral-400 mb-3 leading-relaxed">It's easy, we'll help you.</p>
                    <button
                      onClick={onCreatePlaylist}
                      className="bg-white hover:bg-neutral-100 text-black text-xs font-bold px-3 py-1.5 rounded-full transition active:scale-95 cursor-pointer"
                    >
                      Create playlist
                    </button>
                  </div>
                );
              }
              return filteredPlaylists.map((playlist) => (
                <button
                  key={playlist.playlist_id}
                  onClick={() => onSetView('playlist-details', playlist.playlist_id)}
                  className={`w-full text-left py-1.5 p-2 rounded-lg transition-all flex items-center gap-3 font-semibold ${
                    activeView === 'playlist-details' && playlist.playlist_id === activeViewId
                      ? 'text-white bg-neutral-800'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-900/40'
                  }`}
                >
                  <div
                    className="w-10 h-10 bg-cover bg-center rounded bg-zinc-800 shadow flex-shrink-0"
                    style={{ backgroundImage: `url(${playlist.cover_url})` }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs truncate font-bold text-white">{playlist.name}</p>
                    <p className="text-[10px] text-neutral-400 truncate mt-0.5">Playlist • {playlist.track_ids.length} songs</p>
                  </div>
                  {playlist.collaborative && (
                    <span className="text-[7px] bg-[#1ed760]/10 border border-[#1ed760]/20 text-[#1ed760] px-1 py-0.2 rounded font-mono font-bold leading-none scale-90">COLLAB</span>
                  )}
                </button>
              ));
            })()
          )}
        </div>

        {/* Account Profile and settings tag */}
        <div className="border-t border-neutral-900/60 pt-3 flex items-center gap-3 relative select-none flex-shrink-0">
          <div
            onClick={() => setShowProfilePopover(!showProfilePopover)}
            className="w-9 h-9 rounded-full bg-[#1ED760] text-black flex items-center justify-center font-bold font-mono cursor-pointer border border-[#1ed760]/10 shadow transition hover:scale-105"
          >
            {userEmail.substring(0, 1).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white font-bold truncate leading-tight">{userDisplayName}</p>
            {userTier === 'premium' ? (
              <p className="text-[8px] text-[#1ED760] font-black mt-0.5 tracking-widest font-mono">
                PREMIUM
              </p>
            ) : (
              <p className="text-[8px] text-neutral-500 font-bold mt-0.5 uppercase tracking-wider">
                FREE ACCOUNT
              </p>
            )}
          </div>
          <button
            onClick={() => onSetView('settings')}
            className="p-1.5 text-neutral-400 hover:text-white transition"
            title="Profile & Settings"
          >
            <Settings className="w-4.5 h-4.5" />
          </button>

          {showProfilePopover && (
            <div className="absolute bottom-12 left-0 w-52 bg-neutral-900 border border-neutral-800 rounded-lg p-1.5 flex flex-col gap-0.5 z-40 shadow-2xl animate-fadeIn">
              <div className="px-2.5 py-2 text-[10px] text-neutral-500 font-mono border-b border-neutral-800 break-all truncate">
                {userEmail}
              </div>
              <button
                onClick={() => {
                  onSetView('settings');
                  setShowProfilePopover(false);
                }}
                className="text-neutral-200 text-xs hover:bg-neutral-800 px-2.5 py-1.5 rounded-md text-left transition hover:text-white"
              >
                Subscription Billing Info
              </button>
              <button
                onClick={() => {
                  onSetView('library');
                  setShowProfilePopover(false);
                }}
                className="text-neutral-200 text-xs hover:bg-neutral-800 px-2.5 py-1.5 rounded-md text-left transition hover:text-white"
              >
                Saved Library Imports
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
