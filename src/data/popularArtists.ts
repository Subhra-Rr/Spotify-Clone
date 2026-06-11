export interface PopularArtist {
  name: string;
  genre: string;
  img: string;
}

export const POPULAR_ARTISTS_DATABASE: PopularArtist[] = [
  // BOLLYWOOD & INDIAN REGIONAL (INDIA)
  { name: 'Arijit Singh', genre: 'Bollywood Romantic', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/d/df/Arijit_Singh_at_Renault_Star_Guild_Awards.jpg&w=300&q=80' },
  { name: 'Shreya Ghoshal', genre: 'Bollywood Melody', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/c/cc/Shreya_Ghoshal_at_the_Greenathon_support.jpg&w=300&q=80' },
  { name: 'Diljit Dosanjh', genre: 'Punjabi Pop Fusion', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/b/b3/Diljit_Dosanjh_promoting_Arjun_Patiala.jpg&w=300&q=80' },
  { name: 'Yo Yo Honey Singh', genre: 'Party Beats', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/1/14/Yo_Yo_Honey_Singh_in_2023.jpg&w=300&q=80' },
  { name: 'Badshah', genre: 'Desi Hip-Hop', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/9/9f/Badshah_rapper_GIMA_2015_%28cropped%29.jpg&w=300&q=80' },
  { name: 'Jubin Nautiyal', genre: 'Sufi & Devotional', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/7/7a/Jubin_Nautiyal_at_the_screening_of_Khandaani_Shafakhana.jpg&w=300&q=80' },
  { name: 'Atif Aslam', genre: 'Bollywood Rock & Love', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/a/ae/Atif_Aslam_at_Sunsilk_New_Year_party.jpg&w=300&q=80' },
  { name: 'A. R. Rahman', genre: 'Oscar Soundtrack', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/d/d7/A_R_Rahman_at_the_launch_of_his_book.jpg&w=300&q=80' },
  { name: 'Anirudh Ravichander', genre: 'Kollywood Electronic', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/f/f6/Anirudh_at_SIIMA_2016.jpg&w=300&q=80' },
  { name: 'Sid Sriram', genre: 'Carnatic Soulful Pop', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/c/c5/Sid_Sriram_at_the_Sarkaru_Vaari_Paata_pre-release_event.jpg&w=300&q=80' },
  { name: 'Lata Mangeshkar', genre: 'Melody Queen (Legend)', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/c/c7/Lata_Mangeshkar_at_an_event_in_2010.jpg&w=300&q=80' },
  { name: 'Kishore Kumar', genre: 'Evergreen Retro (Legend)', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/8/8b/Kishore_Kumar_Indian_singer.jpg&w=300&q=80' },
  { name: 'Mohammed Rafi', genre: 'Classic Sufi (Legend)', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/8/8a/MohdRafi.jpg&w=300&q=80' },
  { name: 'Sidhu Moose Wala', genre: 'Punjabi Folk-Rap', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/b/b3/Sidhu_Moose_Wala_at_press_conference.jpg&w=300&q=80' },
  { name: 'AP Dhillon', genre: 'Indo-Canadian Beats', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/6/6d/AP_Dhillon_cropped.png&w=300&q=80' },
  { name: 'Karan Aujla', genre: 'Punjabi Hip-Hop', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/d/df/Karan_Aujla_cropped.png&w=300&q=80' },
  { name: 'Humanane Sagar', genre: 'Ollywood Modern Pop', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/0/0a/Humane_Sagar.jpg&w=300&q=80' },
  { name: 'Asima Panda', genre: 'Odia Dance Hits', img: 'https://images.weserv.nl/?url=https://a10.gaanacdn.com/images/artists/11/1410111/crop_480x480_1410111.jpg&w=300&q=80' },
  { name: 'Akshaya Mohanty', genre: 'Odia Golden Era Legend', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/1/18/Akshaya_Mohanty.jpg&w=300&q=80' },
  { name: 'Divine', genre: 'Mumbai Desi Hip-Hop', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/4/49/Divine_Rapper_GIMA_2016.jpg&w=300&q=80' },
  { name: 'Prateek Kuhad', genre: 'Indie Singer-Songwriter', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/e/e9/Prateek_Kuhad_at_NH7_Weekender.jpg&w=300&q=80' },
  { name: 'S. P. Balasubrahmanyam', genre: 'South Indian Legend', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/a/a2/S_P_Balasubrahmanyam_at_SIIMA_2016.jpg&w=300&q=80' },
  { name: 'K. S. Chithra', genre: 'Nightingale of Kerala', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/8/8c/KS_Chithra_2015.jpg&w=300&q=80' },

  // HOLLYWOOD & WESTERN POP/ROCK/HIP-HOP
  { name: 'Taylor Swift', genre: 'Global Pop Queen', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/b/b6/Taylor_Swift_at_the_2019_Golden_Globes.jpg&w=300&q=80' },
  { name: 'Billie Eilish', genre: 'Alternative Pop Icon', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/f/fa/Billie_Eilish_2019_by_Glenn_Francis_%28cropped%29.jpg&w=300&q=80' },
  { name: 'The Weeknd', genre: 'Synth Pop & R&B', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/9/9f/The_Weeknd_at_the_2016_Juno_Awards_cropped.jpg&w=300&q=80' },
  { name: 'Adele', genre: 'Soul & Pop Powerhouse', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/8/85/Adele_at_the_2013_Golden_Globes.jpg&w=300&q=80' },
  { name: 'Eminem', genre: 'Rap God & Hip-Hop Legend', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/6/6f/Eminem_at_the_2009_MTV_Movie_Awards_cropped.jpg&w=300&q=80' },
  { name: 'Bruno Mars', genre: 'Retro Funk & Soul Pop', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/b/b4/Bruno_Mars_Grammy_Awards_2018.jpg&w=300&q=80' },
  { name: 'Ariana Grande', genre: 'Contemporary Pop Diva', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/5/57/Ariana_Grande_2020.jpg&w=300&q=80' },
  { name: 'Justin Bieber', genre: 'Global Pop Icon', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/d/da/Justin_Bieber_in_2020.jpg&w=300&q=80' },
  { name: 'Ed Sheeran', genre: 'Acoustic Guitar Pop', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/1/1a/Ed_Sheeran_2021.jpg&w=300&q=80' },
  { name: 'Michael Jackson', genre: 'King of Pop (Legend)', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/5/52/Michael_Jackson_in_1988.jpg&w=300&q=80' },
  { name: 'Freddie Mercury', genre: 'Stadium Rock Legend', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/d/d3/Freddie_Mercury_New_Haven_1978.jpg&w=300&q=80' },
  { name: 'Chester Bennington', genre: 'Alternative Rock Icon', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/2/23/Linkin_Park_Chester_Bennington_Rock_im_Park_2014.jpg&w=300&q=80' },
  { name: 'Frank Sinatra', genre: 'Mid-Century Jazz Legend', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/a/af/Frank_Sinatra_1957.jpg&w=300&q=80' },
  { name: 'Coldplay', genre: 'Stadium Arena Rock', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/2/2e/Coldplay_at_the_2012_MetLife_Stadium_show.jpg&w=300&q=80' },
  { name: 'Imagine Dragons', genre: 'High-Energy Indie Rock', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/b/b5/Imagine_Dragons_at_Lollapalooza_Berlin_2022.jpg&w=300&q=80' },
  { name: 'Sabrina Carpenter', genre: 'Upbeat Teen Pop', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/4/4b/Sabrina_Carpenter_at_the_2024_Met_Gala.jpg&w=300&q=80' },
  { name: 'Zara Larsson', genre: 'European Dance Pop', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/1/15/Zara_Larsson_Lollapalooza_Stockholm_2019.jpg&w=300&q=80' },

  // K-POP & ASIAN POP
  { name: 'BTS', genre: 'K-Pop Supergroup', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/a/ab/BTS_at_the_2018_Billboard_Music_Awards.jpg&w=300&q=80' },
  { name: 'Blackpink', genre: 'Queen of K-Pop', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/1/1f/Blackpink_at_Coachella_2023.jpg&w=300&q=80' },
  { name: 'NewJeans', genre: 'Retro Synth K-Pop', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/4/4c/NewJeans_at_the_2023_Billboard_Music_Awards.jpg&w=300&q=80' },
  { name: 'Yoasobi', genre: 'J-Pop Anime Sensation', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/3/30/Yoasobi_at_the_2023_Anime_Expo.jpg&w=300&q=80' },
  { name: 'Fujii Kaze', genre: 'Japanese R&B & Soul', img: 'https://images.weserv.nl/?url=https://e-cdns-images.dzcdn.net/images/artist/c-87459142/500x500.jpg&w=300&q=80' },

  // LATIN & REGGAETON
  { name: 'Shakira', genre: 'Latin Pop Sensation', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/3/35/Shakira_at_the_2023_Latin_Grammys.jpg&w=300&q=80' },
  { name: 'Bad Bunny', genre: 'Reggaeton & Latin Trap', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/1/11/Bad_Bunny_at_the_2023_Met_Gala.jpg&w=300&q=80' },

  // AFROBEATS
  { name: 'Burna Boy', genre: 'Modern Afrobeats Giant', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/c/c9/Burna_Boy_Grammy_Awards_2021_interview.jpg&w=300&q=80' },
  { name: 'Rema', genre: 'Global Afro-Melody', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/a/ad/Rema_Afrobeats_Wizkid_concert_2021.jpg&w=300&q=80' },

  // EDM & GLOBAL DANCE
  { name: 'Alan Walker', genre: 'Melodic Cyber House', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/2/23/Alan_Walker_at_the_2018_Echo_Awards.jpg&w=300&q=80' },
  { name: 'Avicii', genre: 'Stadium EDM (Legend)', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/d/db/Avicii_in_concert_2014.jpg&w=300&q=80' },
  { name: 'ABBA', genre: 'Swedish Pop Icons', img: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/c/cb/ABBA_Gold_cropped.jpg&w=300&q=80' }
];

export function getRandomArtists(count: number = 6): PopularArtist[] {
  const shuffled = [...POPULAR_ARTISTS_DATABASE].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
