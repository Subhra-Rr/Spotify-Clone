import React, { useState } from 'react';
import {
  Home,
  Search,
  Library,
  PlusSquare,
  Compass,
  Radio,
  FileMusic,
  Settings,
  ShieldCheck,
  Disc,
  Flame,
  AudioLines
} from 'lucide-react';
import { Playlist } from '../types';

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
  activeTrackTitle
}: SidebarProps) {
  const [showProfilePopover, setShowProfilePopover] = useState(false);

  return (
    <div id="navigation-sidebar" className="bg-black w-64 p-4 flex flex-col gap-5 h-full text-neutral-400 select-none border-r border-neutral-900 flex-shrink-0">
      {/* Brand logo */}
      <div className="flex items-center gap-2 px-2 py-1 select-none">
        <AudioLines className="w-8 h-8 text-emerald-500 animate-pulse" />
        <h1 className="text-xl font-bold tracking-tight text-white font-sans flex items-center gap-1">
          Spotify <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-1 py-0.5 rounded font-mono font-normal">CLONE</span>
        </h1>
      </div>

      {/* Navigation tabs */}
      <div className="flex flex-col gap-1">
        <button
          onClick={() => onSetView('home')}
          className={`flex items-center gap-4 py-2 px-3.5 text-sm font-semibold rounded-lg transition-all ${
            activeView === 'home' ? 'bg-neutral-900 text-white shadow' : 'hover:text-white hover:bg-neutral-950/50'
          }`}
        >
          <Home className="w-5 h-5 text-neutral-300" />
          Home Feed
        </button>

        <button
          onClick={() => onSetView('search')}
          className={`flex items-center gap-4 py-2 px-3.5 text-sm font-semibold rounded-lg transition-all ${
            activeView === 'search' ? 'bg-neutral-900 text-white shadow' : 'hover:text-white hover:bg-neutral-950/50'
          }`}
        >
          <Search className="w-5 h-5 text-neutral-300" />
          Filter & Search
        </button>

        <button
          onClick={() => onSetView('library')}
          className={`flex items-center gap-4 py-2 px-3.5 text-sm font-semibold rounded-lg transition-all ${
            activeView === 'library' ? 'bg-neutral-900 text-white shadow' : 'hover:text-white hover:bg-neutral-950/50'
          }`}
        >
          <Library className="w-5 h-5 text-neutral-300" />
          Your Library
        </button>

        <button
          onClick={() => onSetView('podcasts')}
          className={`flex items-center gap-4 py-2 px-3.5 text-sm font-semibold rounded-lg transition-all ${
            activeView === 'podcasts' ? 'bg-neutral-900 text-white shadow' : 'hover:text-white hover:bg-neutral-950/50'
          }`}
        >
          <Compass className="w-5 h-5 text-neutral-300" />
          Podcasts explore
        </button>

        {isAdmin && (
          <button
            onClick={() => onSetView('admin')}
            className={`flex items-center gap-4 py-2 px-3.5 text-sm font-semibold rounded-lg transition-all border border-emerald-500/10 ${
              activeView === 'admin' ? 'bg-neutral-900 text-emerald-400 border-emerald-500/30' : 'text-neutral-400 hover:text-emerald-400 hover:bg-neutral-950/50'
            }`}
          >
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            Admin Content Control
          </button>
        )}
      </div>

      {/* Playlists manager */}
      <div className="flex-1 flex flex-col gap-3.5 min-h-0">
        <div className="flex items-center justify-between px-3 mt-2">
          <span className="text-[11px] font-bold tracking-wider text-neutral-500 uppercase">PLAYLISTS</span>
          <button
            onClick={onCreatePlaylist}
            className="text-neutral-550 hover:text-white transition p-0.5 rounded hover:bg-neutral-900"
            title="Create custom Playlist"
          >
            <PlusSquare className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Dynamic Playlists list scrollable box */}
        <div className="overflow-y-auto flex-1 flex flex-col gap-1.5 pr-1 scrollbar-thin">
          {playlists.length === 0 ? (
            <p className="text-xs text-neutral-600 px-3 py-2 italic font-sans">No custom playlists created yet.</p>
          ) : (
            playlists.map((playlist) => (
              <button
                key={playlist.playlist_id}
                onClick={() => onSetView('playlist-details', playlist.playlist_id)}
                className={`w-full text-left py-1.5 px-3 rounded text-xs truncate transition-all flex items-center gap-2.5 font-medium ${
                  activeView === 'playlist-details' && playlist.playlist_id === activeViewId
                    ? 'text-white font-bold bg-neutral-900'
                    : 'text-neutral-450 hover:text-white hover:bg-neutral-950'
                }`}
              >
                <div
                  className="w-5 h-5 bg-cover bg-center rounded bg-zinc-800"
                  style={{ backgroundImage: `url(${playlist.cover_url})` }}
                />
                <span className="truncate">{playlist.name}</span>
                {playlist.collaborative && (
                  <span className="text-[8px] bg-emerald-500/10 text-emerald-400 px-1 rounded-full font-mono font-bold">COLLAB</span>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Account Profile and settings tag */}
      <div className="border-t border-neutral-900 pt-3 flex items-center gap-3 relative select-none">
        <div
          onClick={() => setShowProfilePopover(!showProfilePopover)}
          className="w-10 h-10 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold font-mono cursor-pointer border border-neutral-850 shadow hover:border-emerald-400 transition"
        >
          {userEmail.substring(0, 1).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-white font-semibold truncate leading-tight">{userDisplayName}</p>
          {userTier === 'premium' ? (
            <p className="text-[9px] text-emerald-400 font-black mt-0.5 tracking-widest font-mono">
              PRO
            </p>
          ) : (
            <p className="text-[9px] text-neutral-500 font-medium mt-0.5 uppercase tracking-wider">
              Free Account
            </p>
          )}
        </div>
        <button
          onClick={() => onSetView('settings')}
          className="p-1.5 text-neutral-500 hover:text-white transition"
          title="Profile & Settings"
        >
          <Settings className="w-4 h-4" />
        </button>

        {showProfilePopover && (
          <div className="absolute bottom-14 left-0 w-52 bg-neutral-900 border border-neutral-800 rounded-lg p-2 flex flex-col gap-1 z-40 shadow-2xl animate-fadeIn">
            <div className="px-2 py-1.5 text-xs text-neutral-500 font-mono border-b border-neutral-800 break-all truncate">
              {userEmail}
            </div>
            <button
              onClick={() => {
                onSetView('settings');
                setShowProfilePopover(false);
              }}
              className="text-white text-xs hover:bg-neutral-950 p-1.5 rounded text-left transition"
            >
              Subscription Billing Info
            </button>
            <button
              onClick={() => {
                onSetView('library');
                setShowProfilePopover(false);
              }}
              className="text-white text-xs hover:bg-neutral-950 p-1.5 rounded text-left transition"
            >
              Saved Library Imports
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
