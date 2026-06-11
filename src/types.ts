export type SubscriptionPlan = 'free' | 'premium';

export interface UserProfile {
  id: string;
  email: string;
  mobile?: string;
  googleId?: string;
  display_name: string;
  dob: string;
  country: string;
  tier: SubscriptionPlan;
  offlineDownloads: string[]; // List of Track IDs downloaded
  collaborativePlaylists: string[]; // List of Playlist IDs
  followedArtists: string[]; // List of Artist IDs
}

export interface Track {
  track_id: string;
  title: string;
  artist: string;
  artist_id?: string;
  album: string;
  duration_ms: number;
  audio_url: string;
  artwork_url: string;
  lyrics?: string;
  genre: string;
  release_year: number;
  plays: number;
  explicit: boolean;
  isLocal?: boolean; // For local file imports
  localBlobUrl?: string; // Blob URL for imported files
}

export interface Album {
  album_id: string;
  title: string;
  artist: string;
  release_date: string;
  upc: string;
  genre: string;
  label: string;
  type: 'single' | 'EP' | 'LP';
  tracks: Track[];
  artwork_url: string;
}

export interface Artist {
  artist_id: string;
  name: string;
  bio: string;
  genres: string[];
  followers_count: number;
  verified: boolean;
  avatar_url: string;
  tracks: Track[];
  upcoming_events?: string[];
}

export interface Playlist {
  playlist_id: string;
  owner_id: string;
  owner_name: string;
  name: string;
  description?: string;
  visibility: 'public' | 'private' | 'shared-with-link';
  collaborative: boolean;
  track_ids: string[];
  cover_url?: string;
  collaborators?: string[]; // user emails or ids
}

export interface PodcastEpisode {
  episode_id: string;
  title: string;
  podcast_title: string;
  audio_url: string;
  description: string;
  duration_ms: number;
  publish_date: string;
  saved_position_ms: number; // For resuming
}

export interface Podcast {
  podcast_id: string;
  title: string;
  rss_url?: string;
  publisher: string;
  category: string;
  description: string;
  artwork_url: string;
  episodes: PodcastEpisode[];
}

export interface FriendActivity {
  user_id: string;
  display_name: string;
  avatar_url: string;
  current_track: {
    track_id: string;
    title: string;
    artist: string;
    artwork_url: string;
    timestamp: number; // Unix timestamp
  } | null;
}

export interface EqualizerSetting {
  enabled: boolean;
  preset: 'Flat' | 'Bass Booster' | 'Acoustic' | 'Electronic' | 'Classical' | 'Vocal Booster' | 'Custom';
  // Sliders for 60Hz, 230Hz, 910Hz, 4kHz, 14kHz (gains from -12 to +12 dB)
  hz60: number;
  hz230: number;
  hz910: number;
  hz4k: number;
  hz14k: number;
}

export interface PlatformAnalytics {
  dau: number;
  mau: number;
  total_streams: number;
  subscriber_count: number;
  revenue: number;
  top_tracks: Array<{ title: string; artist: string; stream_count: number }>;
}
