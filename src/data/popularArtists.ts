export interface PopularArtist {
  name: string;
  genre: string;
  img: string;
}

// Curated high-fidelity Unsplash images of beautiful glowing music notes (with orange/red/gold gradients like your reference image)
// and professional warm-lit musical instruments (guitars, grand pianos, saxophones, violins, mixers).
// 100% original, crystal-clear high-definition assets.
export const INSTRUMENTS_AND_NOTES_IMAGES: string[] = [
  // 1. Double eighth music note glowing with an elegant orange/red gradient
  "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&h=400&fit=crop&q=80",
  // 2. Premium acoustic guitar catching a soft golden hour spotlight
  "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=400&fit=crop&q=80",
  // 3. Elegant grand piano keys catching a warm golden backlight in studio
  "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&h=400&fit=crop&q=80",
  // 4. Glowing warm neon abstract wave lights and musical note ambiance
  "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=400&fit=crop&q=80",
  // 5. Classic wooden violin close-up with warm retro studio spotlights
  "https://images.unsplash.com/photo-1612222869049-d8ec83637a3c?w=400&h=400&fit=crop&q=80",
  // 6. Professional glossy brass saxophone catching golden studio lights
  "https://images.unsplash.com/photo-1528143358888-6d3c7f67bd5d?w=400&h=400&fit=crop&q=80",
  // 7. Fender electric guitar glowing with gorgeous sunset orange highlights
  "https://images.unsplash.com/photo-1525201548942-d87215be59b1?w=400&h=400&fit=crop&q=80",
  // 8. Elegant acoustic harp / string detail - musical instrument
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop&q=80",
  // 9. Classical grand piano wood keys detail - musical instrument
  "https://images.unsplash.com/photo-1552422535-c45813c61732?w=400&h=400&fit=crop&q=80",
  // 10. Gorgeous custom wood acoustic guitar back body - musical instrument
  "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=400&fit=crop&q=80",
  // 11. Modern music synthesizer keyboard under warm stage glow
  "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=400&fit=crop&q=80",
  // 12. Golden drum kits cymbals reflecting warm sunset lighting
  "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=400&h=400&fit=crop&q=80",
  // 13. Another stunning neon glowing music notes backdrop - musical note
  "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop&q=80",
  // 14. Classic brass trumpet with warm reflections and ambient shine
  "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&h=400&fit=crop&q=80",
  // 15. Sleek electric bass guitar wood finish close-up - musical instrument
  "https://images.unsplash.com/photo-1564186763535-ebb21ef5278f?w=400&h=400&fit=crop&q=80",
  // 16. Beautiful classical wooden cello body structure under studio spotlight
  "https://images.unsplash.com/photo-1484755560693-a4074577af3a?w=400&h=400&fit=crop&q=80"
];

const RAW_ARTISTS: { name: string; genre: string }[] = [
  // BOLLYWOOD & INDIAN REGIONAL (INDIA)
  { name: 'KR$NA', genre: 'Desi Hip-Hop' },
  { name: 'Arijit Singh', genre: 'Bollywood Romantic' },
  { name: 'Shreya Ghoshal', genre: 'Bollywood Melody' },
  { name: 'Diljit Dosanjh', genre: 'Punjabi Pop Fusion' },
  { name: 'Yo Yo Honey Singh', genre: 'Party Beats' },
  { name: 'Badshah', genre: 'Desi Hip-Hop' },
  { name: 'Jubin Nautiyal', genre: 'Sufi & Devotional' },
  { name: 'Atif Aslam', genre: 'Bollywood Rock & Love' },
  { name: 'A. R. Rahman', genre: 'Oscar Soundtrack' },
  { name: 'Anirudh Ravichander', genre: 'Kollywood Electronic' },
  { name: 'Sid Sriram', genre: 'Carnatic Soulful Pop' },
  { name: 'Lata Mangeshkar', genre: 'Melody Queen (Legend)' },
  { name: 'Kishore Kumar', genre: 'Evergreen Retro (Legend)' },
  { name: 'Mohammed Rafi', genre: 'Classic Sufi (Legend)' },
  { name: 'Sidhu Moose Wala', genre: 'Punjabi Folk-Rap' },
  { name: 'AP Dhillon', genre: 'Indo-Canadian Beats' },
  { name: 'Karan Aujla', genre: 'Punjabi Hip-Hop' },
  { name: 'Humanane Sagar', genre: 'Ollywood Modern Pop' },
  { name: 'Asima Panda', genre: 'Odia Dance Hits' },
  { name: 'Akshaya Mohanty', genre: 'Odia Golden Era Legend' },
  { name: 'Divine', genre: 'Mumbai Desi Hip-Hop' },
  { name: 'Prateek Kuhad', genre: 'Indie Singer-Songwriter' },
  { name: 'S. P. Balasubrahmanyam', genre: 'South Indian Legend' },
  { name: 'K. S. Chithra', genre: 'Nightingale of Kerala' },

  // HOLLYWOOD & WESTERN POP/ROCK/HIP-HOP
  { name: 'Taylor Swift', genre: 'Global Pop Queen' },
  { name: 'Billie Eilish', genre: 'Alternative Pop Icon' },
  { name: 'The Weeknd', genre: 'Synth Pop & R&B' },
  { name: 'Adele', genre: 'Soul & Pop Powerhouse' },
  { name: 'Eminem', genre: 'Rap God & Hip-Hop Legend' },
  { name: 'Bruno Mars', genre: 'Retro Funk & Soul Pop' },
  { name: 'Ariana Grande', genre: 'Contemporary Pop Diva' },
  { name: 'Justin Bieber', genre: 'Global Pop Icon' },
  { name: 'Ed Sheeran', genre: 'Acoustic Guitar Pop' },
  { name: 'Michael Jackson', genre: 'King of Pop (Legend)' },
  { name: 'Freddie Mercury', genre: 'Stadium Rock Legend' },
  { name: 'Chester Bennington', genre: 'Alternative Rock Icon' },
  { name: 'Frank Sinatra', genre: 'Mid-Century Jazz Legend' },
  { name: 'Coldplay', genre: 'Stadium Arena Rock' },
  { name: 'Imagine Dragons', genre: 'High-Energy Indie Rock' },
  { name: 'Sabrina Carpenter', genre: 'Upbeat Teen Pop' },
  { name: 'Zara Larsson', genre: 'European Dance Pop' },
  { name: 'Travis Scott', genre: 'Hip-Hop & Trap Pioneer' },
  { name: 'Drake', genre: 'Hip-Hop & Melodic R&B' },
  { name: 'Post Malone', genre: 'Pop-Rap & Alternative Rock' },
  { name: 'Dua Lipa', genre: 'Dance-Pop & Future Disco' },
  { name: 'Olivia Rodrigo', genre: 'Alternative Pop/Rock' },
  { name: 'Lana Del Rey', genre: 'Cinematic Baroque Pop' },
  { name: 'Kendrick Lamar', genre: 'Conscious Rap Legend' },
  { name: 'Rihanna', genre: 'R&B & Pop Icon' },
  { name: 'Kanye West', genre: 'Hip-Hop Innovator & Legend' },
  { name: 'SZA', genre: 'Contemporary Neo-R&B' },

  // K-POP & ASIAN POP
  { name: 'BTS', genre: 'K-Pop Supergroup' },
  { name: 'Blackpink', genre: 'Queen of K-Pop' },
  { name: 'NewJeans', genre: 'Retro Synth K-Pop' },
  { name: 'Yoasobi', genre: 'J-Pop Anime Sensation' },
  { name: 'Fujii Kaze', genre: 'Japanese R&B & Soul' },

  // LATIN & REGGAETON
  { name: 'Shakira', genre: 'Latin Pop Sensation' },
  { name: 'Bad Bunny', genre: 'Reggaeton & Latin Trap' },

  // AFROBEATS
  { name: 'Burna Boy', genre: 'Modern Afrobeats Giant' },
  { name: 'Rema', genre: 'Global Afro-Melody' },

  // ADDITIONAL VIDEO ARTISTS
  { name: 'Benny Dayal', genre: 'Bollywood Funk & Dance' },
  { name: 'Vijay', genre: 'Tamil Cinema & Pop' },
  { name: 'Dhanush', genre: 'Tamil Folk & Romantic' },
  { name: 'Sukh-E Muzical Doctorz', genre: 'Punjabi Hip-Hop & Garage' },
  { name: 'Pav Dharia', genre: 'Punjabi Pop Fusion' },
  { name: 'Bilal Saeed', genre: 'Desi Soulful Pop' },

  // EDM & GLOBAL DANCE
  { name: 'Alan Walker', genre: 'Melodic Cyber House' },
  { name: 'Avicii', genre: 'Stadium EDM (Legend)' },
  { name: 'ABBA', genre: 'Swedish Pop Icons' }
];

// Map over RAW_ARTISTS to dynamically assign beautiful warm-glow elements with zero broken mock headers
export const POPULAR_ARTISTS_DATABASE: PopularArtist[] = RAW_ARTISTS.map((artist, idx) => {
  const nameLower = artist.name.toLowerCase().trim();
  let chosenImg = "";
  
  if (nameLower.includes("justin bieber") || nameLower.includes("justin biber")) {
    chosenImg = INSTRUMENTS_AND_NOTES_IMAGES[2]; // Grand piano keys
  } else if (nameLower.includes("imagine dragons")) {
    chosenImg = INSTRUMENTS_AND_NOTES_IMAGES[6]; // Fender electric guitar
  } else if (nameLower.includes("sabrina carpenter")) {
    chosenImg = INSTRUMENTS_AND_NOTES_IMAGES[0]; // Double eighth music note glowing
  } else if (nameLower.includes("travis scott")) {
    chosenImg = INSTRUMENTS_AND_NOTES_IMAGES[10]; // Modern music synthesizer keyboard
  } else if (nameLower.includes("kendrick lamar")) {
    chosenImg = INSTRUMENTS_AND_NOTES_IMAGES[11]; // Golden drum kits cymbals
  } else if (nameLower.includes("yoasobi")) {
    chosenImg = INSTRUMENTS_AND_NOTES_IMAGES[4]; // Classic wooden violin
  } else if (nameLower.includes("fujii kaze")) {
    chosenImg = INSTRUMENTS_AND_NOTES_IMAGES[2]; // Grand piano keys
  } else if (nameLower.includes("bad bunny")) {
    chosenImg = INSTRUMENTS_AND_NOTES_IMAGES[3]; // Glowing warm neon wave note
  } else if (nameLower.includes("sukh-e") || nameLower.includes("sukh-e muzical doctorz")) {
    chosenImg = INSTRUMENTS_AND_NOTES_IMAGES[1]; // Premium acoustic guitar
  } else {
    chosenImg = INSTRUMENTS_AND_NOTES_IMAGES[idx % INSTRUMENTS_AND_NOTES_IMAGES.length];
  }

  return {
    name: artist.name,
    genre: artist.genre,
    img: chosenImg
  };
});

export function getRandomArtists(count: number = 6): PopularArtist[] {
  const shuffled = [...POPULAR_ARTISTS_DATABASE].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
