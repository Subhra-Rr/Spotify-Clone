import React, { useState } from 'react';
import { Track, UserProfile } from '../types';
import { PlusCircle, Trash2, Users, Music, Layers, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface AdminPanelProps {
  tracks: Track[];
  onIngestTrack: (track: Track) => void;
  onDeleteTrack: (trackId: string) => void;
  onUpdateUserTier: (email: string, tier: 'free' | 'premium') => void;
  onDeleteUserAccount: (email: string) => void;
}

export default function AdminPanel({
  tracks,
  onIngestTrack,
  onDeleteTrack,
  onUpdateUserTier,
  onDeleteUserAccount
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'catalog' | 'users'>('catalog');

  // Track Ingestion Form State
  const [newTrack, setNewTrack] = useState({
    title: '',
    artist: '',
    audio_url: 'https://raw.githubusercontent.com/rafaelreis-hotmart/Audio-Sample-files/master/sample.mp3', // reliable demo stream fallback
    artwork_url: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300',
    genre: 'Electronic',
    lyrics: ''
  });

  // Simulated system user directory
  const [mockUsers, setMockUsers] = useState<Partial<UserProfile>[]>([
    { id: 'u-1', email: 'demo@user.com', display_name: 'Premium Explorer', tier: 'premium', country: 'United States' },
    { id: 'u-2', email: 'alex@stream.io', display_name: 'Alex FreeBird', tier: 'free', country: 'Canada' },
    { id: 'u-3', email: 'jess@beats.org', display_name: 'Jessie Bassline', tier: 'premium', country: 'United Kingdom' },
  ]);

  const handleSubmitTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrack.title || !newTrack.artist) {
      alert('Please fill in both Title and Artist fields.');
      return;
    }

    const trackPayload: Track = {
      track_id: `tr-admin-${Date.now()}`,
      title: newTrack.title,
      artist: newTrack.artist,
      album: 'Global Ingest Pool',
      audio_url: newTrack.audio_url,
      artwork_url: newTrack.artwork_url,
      duration_ms: 184000, 
      genre: newTrack.genre,
      lyrics: newTrack.lyrics || 'Instrumental mix. No registered lyric tracks.',
      isLocal: false,
      release_year: new Date().getFullYear(),
      plays: 0,
      explicit: false
    };

    onIngestTrack(trackPayload);
    // Reset form fields
    setNewTrack({
      title: '',
      artist: '',
      audio_url: 'https://raw.githubusercontent.com/rafaelreis-hotmart/Audio-Sample-files/master/sample.mp3',
      artwork_url: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300',
      genre: 'Electronic',
      lyrics: ''
    });
  };

  const handleToggleUserTierLocal = (email: string, currentTier: 'free' | 'premium') => {
    const nextTier = currentTier === 'free' ? 'premium' : 'free';
    setMockUsers(prev => prev.map(u => u.email === email ? { ...u, tier: nextTier } : u));
    onUpdateUserTier(email, nextTier);
  };

  return (
    <div className="p-6 bg-gradient-to-b from-neutral-900 to-black min-h-full text-white font-sans">
      {/* Top Meta header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-6 mb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-500 font-mono text-xs uppercase tracking-widest font-bold">
            <ShieldCheck className="w-4 h-4" /> Root Management Engine
          </div>
          <h1 className="text-3xl font-black tracking-tight mt-1">Platform Admin Console</h1>
        </div>

        {/* Dashboard quick-tabs */}
        <div className="bg-neutral-950 p-1 rounded-xl flex gap-1 border border-neutral-850">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition flex items-center gap-2 ${
              activeTab === 'catalog' ? 'bg-neutral-800 text-white shadow' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Music className="w-3.5 h-3.5" /> Media Catalog ({tracks.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition flex items-center gap-2 ${
              activeTab === 'users' ? 'bg-neutral-800 text-white shadow' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" /> User Access Directory
          </button>
        </div>
      </div>

      {activeTab === 'catalog' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Track ingestion Form panel */}
          <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-900 shadow-xl h-fit">
            <h2 className="text-base font-bold mb-4 flex items-center gap-2 text-neutral-200">
              <PlusCircle className="w-4 h-4 text-emerald-400" /> Ingest New Track Stream
            </h2>
            <form onSubmit={handleSubmitTrack} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1 font-mono tracking-wider">Track Title *</label>
                <input
                  type="text"
                  placeholder="e.g., Midnight Horizon"
                  value={newTrack.title}
                  onChange={e => setNewTrack({ ...newTrack, title: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder-neutral-600"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1 font-mono tracking-wider">Lead Artist / Producer *</label>
                <input
                  type="text"
                  placeholder="e.g., Lila Sterling"
                  value={newTrack.artist}
                  onChange={e => setNewTrack({ ...newTrack, artist: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder-neutral-600"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1 font-mono tracking-wider">Audio Source Directory Link URL</label>
                <input
                  type="text"
                  value={newTrack.audio_url}
                  onChange={e => setNewTrack({ ...newTrack, audio_url: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1 font-mono tracking-wider">Genre Node</label>
                  <select
                    value={newTrack.genre}
                    onChange={e => setNewTrack({ ...newTrack, genre: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="Electronic">Electronic</option>
                    <option value="Synthwave">Synthwave</option>
                    <option value="Lo-Fi Chill">Lo-Fi Chill</option>
                    <option value="Cinematic">Cinematic</option>
                    <option value="Ambient">Ambient</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1 font-mono tracking-wider">Cover Image URL</label>
                  <input
                    type="text"
                    value={newTrack.artwork_url}
                    onChange={e => setNewTrack({ ...newTrack, artwork_url: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 truncate"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1 font-mono tracking-wider">Track Synchronized Lyrics (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Enter scrollable lyrics documentation..."
                  value={newTrack.lyrics}
                  onChange={e => setNewTrack({ ...newTrack, lyrics: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder-neutral-600 resize-none font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs p-3 rounded-lg transition shadow-md flex items-center justify-center gap-1"
              >
                Inject Metadata Into Cluster <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Active Live Tracks View */}
          <div className="lg:col-span-2 bg-neutral-950 p-5 rounded-2xl border border-neutral-900 shadow-xl overflow-hidden flex flex-col max-h-[580px]">
            <h2 className="text-base font-bold mb-4 text-neutral-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-neutral-400" /> Active Registry Media Catalogue ({tracks.length} Loaded)
            </h2>
            
            <div className="overflow-y-auto space-y-2 flex-1 pr-1 custom-scrollbar">
              {tracks.map((track) => (
                <div
                  key={track.track_id}
                  className="bg-neutral-900/60 hover:bg-neutral-900 p-3 rounded-xl flex items-center justify-between gap-4 border border-neutral-850/30 group transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={track.artwork_url}
                      alt={track.title}
                      className="w-10 h-10 rounded-md object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate">{track.title}</p>
                      <p className="text-[11px] text-neutral-400 truncate mt-0.5">{track.artist}</p>
                    </div>
                    <span className="text-[9px] uppercase tracking-widest bg-neutral-800 text-neutral-400 font-mono px-2 py-0.5 rounded ml-2">
                      {track.genre}
                    </span>
                  </div>

                  <button
                    onClick={() => onDeleteTrack(track.track_id)}
                    className="p-2 text-neutral-500 hover:text-red-400 rounded-lg hover:bg-neutral-850/80 transition flex-shrink-0"
                    title={`Deregister ${track.title}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Access Management Tab View */
        <div className="bg-neutral-950 rounded-2xl border border-neutral-900 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-850 text-neutral-400 font-mono uppercase tracking-wider bg-neutral-900/40">
                  <th className="p-4 font-bold">User Identity Context</th>
                  <th className="p-4 font-bold">Account Level / Tier Status</th>
                  <th className="p-4 font-bold">Region Node</th>
                  <th className="p-4 font-bold text-right">Access Provisioning Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900">
                {mockUsers.map((user) => (
                  <tr key={user.email} className="hover:bg-neutral-900/30 transition">
                    <td className="p-4">
                      <p className="font-bold text-white">{user.display_name}</p>
                      <p className="text-[11px] text-neutral-500 mt-0.5">{user.email}</p>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          user.tier === 'premium'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-neutral-800 text-neutral-400'
                        }`}
                      >
                        {user.tier}
                      </span>
                    </td>
                    <td className="p-4 text-neutral-300 font-medium">{user.country}</td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleToggleUserTierLocal(user.email!, user.tier as 'free' | 'premium')}
                        className="bg-neutral-900 hover:bg-neutral-830 border border-neutral-800 px-3 py-1.5 rounded-lg text-[11px] font-bold text-neutral-200 transition"
                      >
                        Toggle Tier
                      </button>
                      <button
                        onClick={() => {
                          onDeleteUserAccount(user.email!);
                          setMockUsers(prev => prev.filter(u => u.email !== user.email));
                        }}
                        className="bg-red-950/40 hover:bg-red-900/30 border border-red-900/40 text-red-400 px-3 py-1.5 rounded-lg text-[11px] font-bold transition"
                      >
                        Suspend
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}