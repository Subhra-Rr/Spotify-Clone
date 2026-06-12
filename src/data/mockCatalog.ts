import { Track, Artist, Album, Podcast, PlatformAnalytics } from '../types';
import { POPULAR_ARTISTS_DATABASE, INSTRUMENTS_AND_NOTES_IMAGES } from './popularArtists';

export const INITIAL_TRACKS: Track[] = [
  {
    "track_id": "t-krsna-1",
    "title": "Boom Shaka",
    "artist": "KR$NA, Dhanda Nyoliwala",
    "artist_id": "artist-krsna",
    "album": "Boom Shaka",
    "duration_ms": 218000,
    "audio_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/bf/25/7f/bf257f86-cfcc-883a-cd43-98fe87e7f607/mzaf_1384029104829302194.plus.aac.p.m4a",
    "artwork_url": "/boom_shaka_cover.jpg",
    "genre": "Desi Hip-Hop",
    "plays": 9202170,
    "release_year": 2024,
    "explicit": true,
    "lyrics": "[00:00] (Intro - Dhanda Nyoliwala)\nAh, KR$NA! Dhanda Nyoliwala!\n[00:09] Boom Shaka, Boom Shaka, Boom!\nHum ghoomte hai gaadiyon me, dil hai masoom\n[00:20] KR plays the beats and we roll out\n[00:35] Show me the love and we never sell out"
  },
  {
    "track_id": "t-krsna-2",
    "title": "Hola Amigo",
    "artist": "KR$NA, Dhanda Nyoliwala",
    "artist_id": "artist-krsna",
    "album": "Hola Amigo",
    "duration_ms": 226000,
    "audio_url": "",
    "artwork_url": "/boom_shaka_cover.jpg",
    "genre": "Desi Hip-Hop",
    "plays": 85658403,
    "release_year": 2023,
    "explicit": true,
    "lyrics": "[00:00] Hola Amigo! (Como estas?)\n[00:10] Dil me hai hip hop, dimaag me hai fire\n[00:25] Raising the levels, we go higher and higher"
  },
  {
    "track_id": "t-krsna-3",
    "title": "I Guess",
    "artist": "KR$NA",
    "artist_id": "artist-krsna",
    "album": "Far From Over",
    "duration_ms": 186000,
    "audio_url": "",
    "artwork_url": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80",
    "genre": "Desi Hip-Hop",
    "plays": 86248493,
    "release_year": 2023,
    "explicit": true,
    "lyrics": "[00:00] Yeah, I guess this is what they wanted\n[00:15] Back with the schemes and they know I'm dominant\n[00:30] Cold flow, double meaning verses are standard"
  },
  {
    "track_id": "t-1",
    "title": "ocean eyes",
    "artist": "Billie Eilish",
    "album": "dont smile at me",
    "duration_ms": 200379,
    "audio_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/d6/59/2b/d6592b0b-1e7e-4743-b2e4-f2af038fd783/mzaf_7697277787797935735.plus.aac.p.m4a",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/02/1d/30/021d3036-5503-3ed3-df00-882f2833a6ae/17UM1IM17026.rgb.jpg/600x600bb.jpg",
    "genre": "Alternative",
    "plays": 6570525,
    "release_year": 2016,
    "explicit": false,
    "lyrics": "[00:00] Standing here by the edge of the blue\n[00:15] Feeling the wind as it whispers to you\n[00:30] I look deep into your ocean eyes\n[00:45] Looking for answers, looking for skies"
  },
  {
    "track_id": "t-2",
    "title": "Midnight City",
    "artist": "M83",
    "album": "Hurry Up, We're Dreaming",
    "duration_ms": 241440,
    "audio_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/71/5c/80/715c80fc-ebe4-e713-487c-5bdefee6c6f3/mzaf_3698387428135478316.plus.aac.p.m4a",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/cb/7b/a9/cb7ba903-b5f1-cc21-90db-7a81b7aa0997/724596951057.jpg/600x600bb.jpg",
    "genre": "Electronic",
    "plays": 6781261,
    "release_year": 2011,
    "explicit": false,
    "lyrics": "[00:00] (Instrumental Saxophone Intro)\n[00:08] Cruising under the electronic sky\n[00:16] Catch the pulse of the midnight beat\n[00:24] High-fidelity frequencies on repeat"
  },
  {
    "track_id": "t-3",
    "title": "Without Me",
    "artist": "Eminem",
    "album": "The Eminem Show",
    "duration_ms": 290120,
    "audio_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/7d/38/ff/7d38ff16-b52c-063a-a34d-767e836befcc/mzaf_13413071545825673354.plus.aac.p.m4a",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/dd/5c/e6/dd5ce621-f7d2-f767-7a08-e7a7eaa7870b/00602537526994.rgb.jpg/600x600bb.jpg",
    "genre": "Hip-Hop/Rap",
    "plays": 3386169,
    "release_year": 2002,
    "explicit": false,
    "lyrics": "[00:00] (Obi-Wan Intro: \"I've created a monster...\")\n[00:08] Guess who's back, back again\n[00:12] Shady's back, tell a friend\n[00:16] Now extract this rhythmic sample now\n[00:20] Cuz it feels so empty without me\n[00:24] Na-na-na-na-na, na-na-na-na"
  },
  {
    "track_id": "t-4",
    "title": "cardigan",
    "artist": "Taylor Swift",
    "album": "folklore",
    "duration_ms": 239560,
    "audio_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/00/b3/f2/00b3f2a0-3228-b65f-7189-91eb26f5adf6/mzaf_3535055549125623460.plus.aac.p.m4a",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/ca/f3/67/caf367a5-2cf6-6b2e-a891-97dc57b19f08/20UMGIM64216.rgb.jpg/600x600bb.jpg",
    "genre": "Alternative",
    "plays": 2976009,
    "release_year": 2020,
    "explicit": false,
    "lyrics": "[00:00] Vintage tee, brand new phone\n[00:08] High heels on cobblestones\n[00:15] When you are young, they assume you know nothing\n[00:22] And when I felt like I was an old cardigan\n[00:26] Under someone's bed, you put me on and said I was your favorite"
  },
  {
    "track_id": "t-5",
    "title": "Starboy (feat. Daft Punk)",
    "artist": "The Weeknd",
    "album": "Starboy",
    "duration_ms": 230461,
    "audio_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/3f/a0/ba/3fa0ba5b-088d-bcf2-e4bd-355a5d505617/mzaf_3355567893400963384.plus.aac.p.m4a",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/b5/92/bb/b592bb72-52e3-e756-9b26-9f56d08f47ab/16UMGIM67864.rgb.jpg/600x600bb.jpg",
    "genre": "R&B/Soul",
    "plays": 7115529,
    "release_year": 2016,
    "explicit": false,
    "lyrics": "[00:00] (Synth Beats & Daft Punk Vocoder Intro)\n[00:08] I'm tryna put you in the worst mood, ah\n[00:14] P1 cleaner than your church shoes, ah\n[00:20] House so empty, need a centerpiece\n[00:25] Look what you've done, I'm a motherfucking starboy"
  },
  {
    "track_id": "t-6",
    "title": "Midnight",
    "artist": "Coldplay",
    "album": "Ghost Stories",
    "duration_ms": 294657,
    "audio_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/29/e2/68/29e26874-ed3c-49f1-1fcc-cf7a3e5cde17/mzaf_14514475775303545273.plus.aac.p.m4a",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Features125/v4/60/90/ad/6090adc3-8863-861d-afcc-23c55c6fe5da/dj.vmtulfyu.jpg/600x600bb.jpg",
    "genre": "Alternative",
    "plays": 2651459,
    "release_year": 2014,
    "explicit": false,
    "lyrics": "[00:00] (Ambient Coldplay Intro)\n[00:08] In the darkness other lights appear\n[00:14] Leave a light on, make it clear\n[00:20] Underneath the midnight shadow's stream\n[00:26] We are living in a beautiful dream"
  },
  {
    "track_id": "t-7",
    "title": "Cruel Summer (Live from TS The Eras Tour)",
    "artist": "Taylor Swift",
    "album": "The Cruelest Summer - Single",
    "duration_ms": 229567,
    "audio_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/62/0c/72/620c72ac-f370-0de6-2a0d-831f6d2d26f3/mzaf_9090450490088600113.plus.aac.p.m4a",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/ec/80/be/ec80be7c-5e3c-4ac9-ac24-2f51cddabfa3/23UM1IM30381.rgb.jpg/600x600bb.jpg",
    "genre": "Pop",
    "plays": 3108380,
    "release_year": 2023,
    "explicit": false,
    "lyrics": "[00:00] Fever dream high in the quiet of the night\n[00:08] You know that I caught it\n[00:14] Bad, bad boy, shiny toy with a price\n[00:20] You know that I bought it\n[00:24] And it's new, the shape of your body\n[00:28] It's blue, the feeling I've got, and it's a cruel summer"
  },
  {
    "track_id": "t-8",
    "title": "Espresso (On Vacation Version)",
    "artist": "Sabrina Carpenter",
    "album": "Espresso EP",
    "duration_ms": 175459,
    "audio_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/e9/4d/02/e94d0230-11ee-ef94-d2cf-a5d547bd73f4/mzaf_554140808559155562.plus.aac.p.m4a",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/57/e8/7b/57e87ba0-5057-9bb9-c247-ce7dbe426e89/24UMGIM55213.rgb.jpg/600x600bb.jpg",
    "genre": "Pop",
    "plays": 5626183,
    "release_year": 2024,
    "explicit": false,
    "lyrics": "[00:00] Now he's thinkin' 'bout me every night, oh\n[00:08] Is it that sweet? I guess so\n[00:14] Say you can't sleep, baby, I know\n[00:20] That's that me, espresso"
  },
  {
    "track_id": "t-9",
    "title": "Lose Yourself",
    "artist": "Eminem",
    "album": "8 Mile (Music from and Inspired By the Motion Picture)",
    "duration_ms": 321960,
    "audio_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/62/0a/a5/620aa56f-189e-708a-80f0-cebdada3872e/mzaf_7131619873177773332.plus.aac.p.m4a",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/08/23/fc/0823fcd9-cb44-695b-32bf-b3bf51d9f800/00606949351229.rgb.jpg/600x600bb.jpg",
    "genre": "Soundtrack",
    "plays": 2887103,
    "release_year": 2002,
    "explicit": false,
    "lyrics": "[00:00] Look, if you had one shot, or one opportunity\n[00:15] To seize everything you ever wanted in one moment\n[00:30] Would you capture it, or just let it slip?\n[00:45] His palms are sweaty, knees weak, arms are heavy\n[01:00] There's vomit on his sweater already, mom's spaghetti"
  },
  {
    "track_id": "t-10",
    "title": "Blank Space",
    "artist": "Taylor Swift",
    "album": "1989 (Deluxe Edition)",
    "duration_ms": 231827,
    "audio_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/79/55/b1/7955b10c-6cb6-462a-861c-8e5cbcacfb76/mzaf_3395570742482345989.plus.aac.p.m4a",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/a7/98/d8/a798d867-344d-2bf2-fbfe-d2d1412dcef8/14UMDIM03793.rgb.jpg/600x600bb.jpg",
    "genre": "Pop",
    "plays": 8196673,
    "release_year": 2014,
    "explicit": false,
    "lyrics": "[00:00] Nice to meet you, where you been?\n[00:15] I could show you incredible things\n[00:30] Magic, madness, heaven, sin\n[00:45] Saw you there and I thought, Oh my God, look at that face\n[01:00] You look like my next mistake"
  },
  {
    "track_id": "t-11",
    "title": "HUMBLE.",
    "artist": "Kendrick Lamar",
    "album": "DAMN.",
    "duration_ms": 177000,
    "audio_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/30/3f/27/303f27c8-1997-8c57-66b3-b67e7c720779/mzaf_5598476068977070849.plus.aac.p.m4a",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/ab/16/ef/ab16efe9-e7f1-66ec-021c-5592a23f0f9e/17UMGIM88793.rgb.jpg/600x600bb.jpg",
    "genre": "Hip-Hop/Rap",
    "plays": 6982854,
    "release_year": 2017,
    "explicit": false,
    "lyrics": "[00:00] Nobody pray for me\n[00:10] Even remember me\n[00:20] Syrup sandwiches and crime allowances\n[00:30] Bitch, be humble, sit down\n[00:40] Be humble, sit down"
  },
  {
    "track_id": "t-12",
    "title": "bad guy",
    "artist": "Billie Eilish",
    "album": "WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?",
    "duration_ms": 194088,
    "audio_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/c3/87/1f/c3871f7e-3260-d615-1c66-5fdca2c3a48f/mzaf_10721331211699880949.plus.aac.p.m4a",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/1a/37/d1/1a37d1b1-8508-54f2-f541-bf4e437dda76/19UMGIM05028.rgb.jpg/600x600bb.jpg",
    "genre": "Alternative",
    "plays": 5528671,
    "release_year": 2019,
    "explicit": false,
    "lyrics": "[00:00] White shirt now red, my bloody nose\n[00:15] Sleepin', you're on your tippy-toes\n[00:30] Creepin' around like no one knows\n[00:45] Think you're so criminal\n[01:00] So you're a tough guy, like it really rough guy"
  },
  {
    "track_id": "t-13",
    "title": "Symphony No. 5 in C Minor, Op. 67: I. Allegro con brio",
    "artist": "Berlin Philharmonic & Herbert von Karajan",
    "album": "Beethoven: Symphony Nos. 5 & 6",
    "duration_ms": 442000,
    "audio_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/d8/5d/6e/d85d6e25-6029-85d7-97aa-8381586e7d01/mzaf_16421450121677729698.plus.aac.p.m4a",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/94/58/f2/9458f2e8-ea9d-b384-6a52-6d976d5ebc9c/00028943900423.rgb.jpg/600x600bb.jpg",
    "genre": "Classical",
    "plays": 6379513,
    "release_year": 1984,
    "explicit": false,
    "lyrics": "[00:00] (Da-da-da-dum! Da-da-da-dum!)\n[00:20] (Echoed classical brass entry)\n[00:40] (Dramatic string orchestration intensifies)\n[01:10] (Triumphant wind crescendos)"
  },
  {
    "track_id": "t-14",
    "title": "Eine Kleine Nachtmusik (Serenade In G Major, K. 525): I. Allegro",
    "artist": "Bruno Walter & Columbia Symphony Orchestra",
    "album": "Mozart: Eine Kleine Nachtmusik; Opera Overtures; Masonic Funeral Music",
    "duration_ms": 274400,
    "audio_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/65/4d/3c/654d3c4c-115e-86cb-048b-6f5eeac8f141/mzaf_11264967146628198045.plus.aac.p.m4a",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music/05/c5/dc/mzi.wmuncckr.jpg/600x600bb.jpg",
    "genre": "Classical",
    "plays": 1412039,
    "release_year": 1962,
    "explicit": false,
    "lyrics": "[00:00] (Lively allegro string introduction)\n[00:30] (Symphonic chamber rhythm playing)\n[01:00] (Dynamic classical key changes in major scale)"
  },
  {
    "track_id": "t-15",
    "title": "Lover",
    "artist": "Diljit Dosanjh",
    "album": "MoonChild Era",
    "duration_ms": 190000,
    "audio_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/f9/9b/37/f99b37bf-44ef-9237-72ba-15a32437c832/mzaf_15116792754153694687.plus.aac.p.m4a",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/8a/89/e4/8a89e445-d2c6-f8ac-a828-27818b0c1afe/859749638209_cover.jpg/600x600bb.jpg",
    "genre": "Indian Pop",
    "plays": 3583480,
    "release_year": 2021,
    "explicit": false,
    "lyrics": "[00:00] Diljit in the building! Punjabi hit vibes!\n[00:15] Tera ni karara mainu patteya\n[00:30] G.O.A.T. tracks thumping loud\n[00:45] Lover music playing, make you dance"
  },
  {
    "track_id": "t-16",
    "title": "Tum Hi Ho",
    "artist": "Mithoon & Arijit Singh",
    "album": "Aashiqui 2 (Original Motion Picture Soundtrack)",
    "duration_ms": 261974,
    "audio_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/38/de/b9/38deb942-d44a-f2bb-205c-ddf05be84693/mzaf_9747647124859107103.plus.aac.p.m4a",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/bb/23/ee/bb23eeed-0c35-4f1d-2b11-485622777ae4/8902894353007_cover.jpg/600x600bb.jpg",
    "genre": "Bollywood",
    "plays": 6469167,
    "release_year": 2013,
    "explicit": false,
    "lyrics": "[00:00] Hum tere bin ab reh nahi sakte\n[00:15] Tere bina kya vajood mera\n[00:30] Kyunki tum hi ho, ab tum hi ho\n[00:45] Zindagi ab tum hi ho"
  },
  {
    "track_id": "t-17",
    "title": "Achyutam Keshavam",
    "artist": "Abhijit Ghoshal",
    "album": "Achyutam Keshavam - Single",
    "duration_ms": 488265,
    "audio_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/65/6b/38/656b38b1-7604-d5c8-ebb7-10133227ce9e/mzaf_16985966982111598334.plus.aac.p.m4a",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/f0/82/1a/f0821ad3-ffea-30d4-25fc-53e28fd30e9f/8905574539616.jpg/600x600bb.jpg",
    "genre": "Devotional & Spiritual",
    "plays": 2006165,
    "release_year": 2022,
    "explicit": false,
    "lyrics": "[00:00] Achyutam keshavam rama narayanam\n[00:20] Krishna damodaram vasudevam harim\n[00:40] Kaun kehta hai bhagwan aate nahi\n[01:00] Tum meera ke jaise bulate nahi"
  },
  {
    "track_id": "t-18",
    "title": "Kun Faya Kun",
    "artist": "A.R. Rahman, Javed Ali & Mohit Chauhan",
    "album": "Rockstar (Original Motion Picture Soundtrack)",
    "duration_ms": 470500,
    "audio_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/2e/99/e2/2e99e2ff-1d1b-615c-9d87-1cd3b122ad7f/mzaf_4773314624008046164.plus.aac.p.m4a",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/56/ac/41/56ac41f7-99f3-3eae-3b07-443167292c4e/8902894697408_cover.jpg/600x600bb.jpg",
    "genre": "Bollywood",
    "plays": 1221016,
    "release_year": 2011,
    "explicit": false,
    "lyrics": "[00:00] Ya ni rumi, ya sadi sarmadi\n[00:30] Kun faya kun, kun faya kun\n[01:00] Jab kahin pe kuch nahi tha, wahi tha\n[01:30] Sadaa-e-haq sarmadi, kun faya kun"
  },
  {
    "track_id": "t-19",
    "title": "Sunflower (Spider-Man: Into the Spider-Verse)",
    "artist": "Post Malone & Swae Lee",
    "album": "Spider-Man: Into the Spider-Verse (Soundtrack From & Inspired by the Motion Picture)",
    "duration_ms": 158040,
    "audio_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/98/f0/d6/98f0d67e-f8bf-762d-cac7-1c6b3b6b35dd/mzaf_4543283896248560946.plus.aac.p.m4a",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/4b/30/2c/4b302cb6-7a14-5464-4e97-0577e9d0be49/18UMGIM82277.rgb.jpg/600x600bb.jpg",
    "genre": "Hip-Hop/Rap",
    "plays": 6634362,
    "release_year": 2018,
    "explicit": false,
    "lyrics": "[00:00] Ayy,yy,yy,yy\n[00:10] Ooh, ooh, ooh, ooh\n[00:20] Need a way out, need a brand new start\n[00:30] You're a sunflower, I think your love would be too much"
  },
  {
    "track_id": "t-20",
    "title": "Blinding Lights",
    "artist": "The Weeknd",
    "album": "Blinding Lights - Single",
    "duration_ms": 201570,
    "audio_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/17/b4/8f/17b48f9a-0b93-6bb8-fe1d-3a16623c2cfb/mzaf_9560252727299052414.plus.aac.p.m4a",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a6/6e/bf/a66ebf79-5008-8948-b352-a790fc87446b/19UM1IM04638.rgb.jpg/600x600bb.jpg",
    "genre": "R&B/Soul",
    "plays": 5791005,
    "release_year": 2019,
    "explicit": false,
    "lyrics": "[00:00] Yeah, I've been tryna call\n[00:15] I've been on my own for long enough\n[00:30] I can't see clearly when you're gone\n[00:45] I said, ooh, I'm blinded by the lights"
  },
  {
    "track_id": "t-21",
    "title": "Frédéric Chopin: Nocturne in E-Flat Major, Op. 9, No. 2",
    "artist": "Vadim Chaimovich",
    "album": "Frédéric Chopin: Nocturne in E-Flat Major, Op. 9, No. 2 - Single",
    "duration_ms": 270071,
    "audio_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/90/f0/a1/90f0a12d-bf4d-9e88-02a1-8bfabb566e5d/mzaf_5166436262918725250.plus.aac.p.m4a",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/31/64/e9/3164e9b3-dfef-26b7-8ac2-e25d5089c0a6/191924582823.jpg/600x600bb.jpg",
    "genre": "Classical",
    "plays": 4101981,
    "release_year": 2017,
    "explicit": false,
    "lyrics": "[00:00] (Graceful and sweet piano melody in E-flat major)\n[00:30] (Fioriture transitions with left-hand accompaniment)\n[01:00] (Impassive rubato theme modulation)"
  },
  {
    "track_id": "t-22",
    "title": "Dynamite",
    "artist": "BTS",
    "album": "Dynamite (DayTime Version) - EP",
    "duration_ms": 199054,
    "audio_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/3b/f2/5c/3bf25cc9-a395-6858-1ef8-5c29956afaf6/mzaf_6007556042949037280.plus.aac.p.m4a",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/03/8d/0e/038d0e52-e96d-f386-b8eb-9f77fa013543/195497146918_Cover.jpg/600x600bb.jpg",
    "genre": "K-Pop",
    "plays": 4454004,
    "release_year": 2020,
    "explicit": false,
    "lyrics": "[00:00] Cause I-I-I'm in the stars tonight\n[00:15] So watch me bring the fire and set the night alight\n[00:30] Shining through the city with a little funk and soul\n[00:45] So I'ma light it up like dynamite, woah"
  }
];

// Master high-fidelity dictionary of famous hit songs for all 51 artists in POPULAR_ARTISTS_DATABASE
const REAL_HIT_SONGS_BY_ARTIST: Record<string, Array<{title: string, album: string, plays: number, explicit: boolean}>> = {
  "KR$NA": [
    { title: "Prarthana", album: "Far From Over", plays: 8324185, explicit: true },
    { title: "No Cap", album: "No Cap - Single", plays: 24391240, explicit: true },
    { title: "Dream", album: "Far From Over", plays: 12053916, explicit: false },
    { title: "Makasam", album: "Makasam", plays: 45781290, explicit: true }
  ],
  "Yo Yo Honey Singh": [
    { title: "Blue Eyes", album: "Blue Eyes - Single", plays: 167752185, explicit: false },
    { title: "Brown Rang", album: "International Villager", plays: 195410294, explicit: false },
    { title: "Love Dose", album: "Desi Kalakaar", plays: 184301290, explicit: false },
    { title: "Dope Shope", album: "International Villager", plays: 120934125, explicit: false },
    { title: "Desi Kalakaar", album: "Desi Kalakaar", plays: 143210982, explicit: false }
  ],
  "Arijit Singh": [
    { title: "Channa Mereya", album: "Ae Dil Hai Mushkil", plays: 288410294, explicit: false },
    { title: "Kesariya", album: "Brahmastra", plays: 295430120, explicit: false },
    { title: "Agar Tum Saath Ho", album: "Tamasha", plays: 276109238, explicit: false },
    { title: "Shayad", album: "Love Aaj Kal", plays: 154109238, explicit: false }
  ],
  "Shreya Ghoshal": [
    { title: "Sunn Raha Hai", album: "Aashiqui 2", plays: 134120984, explicit: false },
    { title: "Deewani Mastani", album: "Bajirao Mastani", plays: 143109238, explicit: false },
    { title: "Ghoomar", album: "Padmaavat", plays: 129845109, explicit: false },
    { title: "Chikni Chameli", album: "Agneepath", plays: 138102938, explicit: false }
  ],
  "Diljit Dosanjh": [
    { title: "Born To Shine", album: "G.O.A.T.", plays: 167341092, explicit: false },
    { title: "Proper Patola", album: "Proper Patola", plays: 123108945, explicit: false },
    { title: "Lemonade", album: "Drive", plays: 132098451, explicit: false }
  ],
  "Badshah": [
    { title: "Jugnu", album: "Jugnu", plays: 129108394, explicit: false },
    { title: "Genda Phool", album: "Genda Phool - Single", plays: 159384712, explicit: false },
    { title: "Kala Chashma", album: "Baar Baar Dekho", plays: 298123049, explicit: false }
  ],
  "Jubin Nautiyal": [
    { title: "Raataan Lambiyan", album: "Shershaah", plays: 173908123, explicit: false },
    { title: "Lut Gaye", album: "Lut Gaye - Single", plays: 164120983, explicit: false },
    { title: "Tum Hi Aana", album: "Marjaavaan", plays: 148923019, explicit: false }
  ],
  "Atif Aslam": [
    { title: "Tere Sang Yaara", album: "Rustom", plays: 158120394, explicit: false },
    { title: "Dil Diyan Gallan", album: "Tiger Zinda Hai", plays: 169123049, explicit: false },
    { title: "Jeena Jeena", album: "Badlapur", plays: 143109238, explicit: false }
  ],
  "A. R. Rahman": [
    { title: "Chaiyya Chaiyya", album: "Dil Se", plays: 123410984, explicit: false },
    { title: "Jai Ho", album: "Slumdog Millionaire", plays: 148930129, explicit: false },
    { title: "Dil Se Re", album: "Dil Se", plays: 115430982, explicit: false }
  ],
  "Anirudh Ravichander": [
    { title: "Why This Kolaveri Di", album: "3", plays: 153410982, explicit: false },
    { title: "Arabic Kuthu", album: "Beast", plays: 175120394, explicit: false },
    { title: "Hukum", album: "Jailer", plays: 148120983, explicit: false }
  ],
  "Sid Sriram": [
    { title: "Inkem Inkem", album: "Geetha Govindam", plays: 132098451, explicit: false },
    { title: "Srivalli", album: "Pushpa: The Rise", plays: 159123049, explicit: false },
    { title: "Samajavaragamana", album: "Ala Vaikunthapurramuloo", plays: 143109238, explicit: false }
  ],
  "Lata Mangeshkar": [
    { title: "Lag Ja Gale", album: "Woh Kaun Thi?", plays: 289312098, explicit: false },
    { title: "Tujhe Dekha To", album: "Dilwale Dulhania Le Jayenge", plays: 265120394, explicit: false },
    { title: "Ajeeb Dastan Hai Yeh", album: "Dil Apna Aur Preet Parai", plays: 142109238, explicit: false }
  ],
  "Kishore Kumar": [
    { title: "Roop Tera Mastana", album: "Aradhana", plays: 152098451, explicit: false },
    { title: "Mere Sapno Ki Rani", album: "Aradhana", plays: 149123049, explicit: false },
    { title: "Pal Pal Dil Ke Paas", album: "Blackmail", plays: 141109238, explicit: false }
  ],
  "Mohammed Rafi": [
    { title: "Kya Hua Tera Wada", album: "Hum Kisise Kum Naheen", plays: 138098451, explicit: false },
    { title: "Likhe Jo Khat Tujhe", album: "Kanyadaan", plays: 147123049, explicit: false },
    { title: "Chura Liya Hai Tumne", album: "Yaadon Ki Baaraat", plays: 152109238, explicit: false }
  ],
  "Sidhu Moose Wala": [
    { title: "So High", album: "PBX 1", plays: 163098451, explicit: true },
    { title: "The Last Ride", album: "The Last Ride - Single", plays: 159123049, explicit: true },
    { title: "295", album: "Moosetape", plays: 187109238, explicit: true }
  ],
  "AP Dhillon": [
    { title: "Brown Munde", album: "Not By Chance", plays: 195412098, explicit: false },
    { title: "With You", album: "Two Hearts - Single", plays: 148120394, explicit: false },
    { title: "Excuses", album: "Excuses - Single", plays: 167123049, explicit: false }
  ],
  "Karan Aujla": [
    { title: "Softly", album: "Making Memories", plays: 158120938, explicit: false },
    { title: "White Brown Black", album: "White Brown Black - Single", plays: 142109238, explicit: false },
    { title: "Nothing Lasts", album: "Making Memories", plays: 132098451, explicit: false }
  ],
  "Humanane Sagar": [
    { title: "Raa Raa", album: "Modern Hits", plays: 14512039, explicit: false },
    { title: "Jaa Re Jaa", album: "Odia Album", plays: 12310923, explicit: false },
    { title: "Toka Paunbha", album: "Modern Dance Hits", plays: 13209845, explicit: false }
  ],
  "Asima Panda": [
    { title: "Tu Mo Love Story", album: "Odia Film Hits", plays: 13812039, explicit: false },
    { title: "O Balma", album: "Sajani", plays: 11910923, explicit: false },
    { title: "Facebook Re", album: "Social Network Hits", plays: 12409845, explicit: false }
  ],
  "Akshaya Mohanty": [
    { title: "Punyasloka", album: "Vintage Odia Golden Era", plays: 18912384, explicit: false },
    { title: "Abhimanini", album: "Akshaya Giti", plays: 15410923, explicit: false },
    { title: "Raja Jhia", album: "Jajabara Film", plays: 16109845, explicit: false }
  ],
  "Divine": [
    { title: "Mirchi", album: "Punya Paap", plays: 143120984, explicit: true },
    { title: "Chal Bombay", album: "Kohinoor", plays: 152109238, explicit: false },
    { title: "Kohinoor", album: "Kohinoor", plays: 138098451, explicit: true }
  ],
  "Prateek Kuhad": [
    { title: "cold/mess", album: "cold/mess EP", plays: 59430129, explicit: false },
    { title: "Kasoor", album: "Kasoor - Single", plays: 34310923, explicit: false },
    { title: "co2", album: "The Way That Lovers Do", plays: 21098451, explicit: false }
  ],
  "S. P. Balasubrahmanyam": [
    { title: "Tere Mere Beech Mein", album: "Ek Duuje Ke Liye", plays: 112098451, explicit: false },
    { title: "Sach Mere Yaar Hai", album: "Saagar", plays: 81120394, explicit: false },
    { title: "Enna Satham Indha Neram", album: "Punnagai Mannan", plays: 167123049, explicit: false }
  ],
  "K. S. Chithra": [
    { title: "Kehna Hi Kya", album: "Bombay Soundtrack", plays: 45412098, explicit: false },
    { title: "Malargale", album: "Love Birds", plays: 37812039, explicit: false },
    { title: "Kannalane", album: "Bombay Soundtrack", plays: 30123049, explicit: false }
  ],
  "Taylor Swift": [
    { title: "Cruel Summer", album: "Lover", plays: 1981240983, explicit: false },
    { title: "Shake It Off", album: "1989", plays: 1854120394, explicit: false },
    { title: "Love Story", album: "Fearless", plays: 1761230495, explicit: false },
    { title: "Anti-Hero", album: "Midnights", plays: 1541092385, explicit: false }
  ],
  "Billie Eilish": [
    { title: "What Was I Made For?", album: "Barbie Soundtrack", plays: 684301294, explicit: false },
    { title: "Lunch", album: "Hit Me Hard and Soft", plays: 491230491, explicit: true },
    { title: "Birds of a Feather", album: "Hit Me Hard and Soft", plays: 821092385, explicit: false }
  ],
  "The Weeknd": [
    { title: "Save Your Tears", album: "After Hours", plays: 1984321094, explicit: false },
    { title: "The Hills", album: "Beauty Behind the Madness", plays: 1874120394, explicit: true },
    { title: "Can't Feel My Face", album: "Beauty Behind the Madness", plays: 1761230495, explicit: false }
  ],
  "Adele": [
    { title: "Hello", album: "25", plays: 1894301294, explicit: false },
    { title: "Someone Like You", album: "21", plays: 1981230491, explicit: false },
    { title: "Rolling in the Deep", album: "21", plays: 1951092385, explicit: false }
  ],
  "Eminem": [
    { title: "The Real Slim Shady", album: "The Marshall Mathers LP", plays: 1894301294, explicit: true },
    { title: "Stan", album: "The Marshall Mathers LP", plays: 1641230491, explicit: false }
  ],
  "Bruno Mars": [
    { title: "Uptown Funk", album: "Uptown Special", plays: 1994301294, explicit: false },
    { title: "Just the Way You Are", album: "Doo-Wops & Hooligans", plays: 1871230491, explicit: false },
    { title: "24K Magic", album: "24K Magic", plays: 1761092385, explicit: false }
  ],
  "Ariana Grande": [
    { title: "7 rings", album: "thank u, next", plays: 1814301294, explicit: true },
    { title: "thank u, next", album: "thank u, next", plays: 1731230491, explicit: true },
    { title: "we can't be friends", album: "eternal sunshine", plays: 1481092385, explicit: false }
  ],
  "Justin Bieber": [
    { title: "Baby", album: "My World 2.0", plays: 1794301294, explicit: false },
    { title: "Sorry", album: "Purpose", plays: 1921230491, explicit: false },
    { title: "Love Yourself", album: "Purpose", plays: 1861092385, explicit: false }
  ],
  "Ed Sheeran": [
    { title: "Shape of You", album: "Divide", plays: 2999301294, explicit: false },
    { title: "Perfect", album: "Divide", plays: 1941230491, explicit: false },
    { title: "Thinking Out Loud", album: "Multiply", plays: 1881092385, explicit: false }
  ],
  "Michael Jackson": [
    { title: "Billie Jean", album: "Thriller", plays: 1894301294, explicit: false },
    { title: "Beat It", album: "Thriller", plays: 1761230491, explicit: false },
    { title: "Smooth Criminal", album: "Bad", plays: 1681092385, explicit: false }
  ],
  "Freddie Mercury": [
    { title: "Bohemian Rhapsody", album: "A Night at the Opera", plays: 1974301294, explicit: false },
    { title: "Don't Stop Me Now", album: "Jazz", plays: 1811230491, explicit: false },
    { title: "We Will Rock You", album: "News of the World", plays: 1741092385, explicit: false }
  ],
  "Chester Bennington": [
    { title: "In the End", album: "Hybrid Theory", plays: 1914301294, explicit: false },
    { title: "Numb", album: "Meteora", plays: 1881230491, explicit: false },
    { title: "Crawling", album: "Hybrid Theory", plays: 1541092385, explicit: false }
  ],
  "Frank Sinatra": [
    { title: "My Way", album: "My Way Deluxe", plays: 424301294, explicit: false },
    { title: "Fly Me to the Moon", album: "It Might as Well Be Swing", plays: 361230491, explicit: false },
    { title: "New York, New York", album: "Theme From", plays: 281092385, explicit: false }
  ],
  "Coldplay": [
    { title: "Yellow", album: "Parachutes", plays: 1914301294, explicit: false },
    { title: "The Scientist", album: "A Rush of Blood to the Head", plays: 1841230491, explicit: false },
    { title: "Fix You", album: "X&Y", plays: 1811092385, explicit: false }
  ],
  "Imagine Dragons": [
    { title: "Believer", album: "Evolve", plays: 1984301294, explicit: false },
    { title: "Thunder", album: "Evolve", plays: 1761230491, explicit: false },
    { title: "Demons", album: "Night Visions", plays: 1681092385, explicit: false }
  ],
  "Sabrina Carpenter": [
    { title: "Please Please Please", album: "Short n' Sweet", plays: 254301294, explicit: false },
    { title: "Feather", album: "Emails I Can't Send", plays: 111230491, explicit: false },
    { title: "Nonsense", album: "Emails I Can't Send", plays: 1981092385, explicit: false }
  ],
  "Zara Larsson": [
    { title: "Lush Life", album: "So Good", plays: 434301294, explicit: false },
    { title: "Symphony", album: "So Good", plays: 1511230491, explicit: false },
    { title: "Never Forget You", album: "So Good", plays: 1361092385, explicit: false }
  ],
  "BTS": [
    { title: "Butter", album: "Butter - Single", plays: 1814301294, explicit: false },
    { title: "Boy With Luv", album: "Map of the Soul: Persona", plays: 1721230491, explicit: false },
    { title: "Fake Love", album: "Love Yourself: Tear", plays: 1541092385, explicit: false }
  ],
  "Blackpink": [
    { title: "How You Like That", album: "The Album", plays: 1784301294, explicit: false },
    { title: "Kill This Love", album: "Kill This Love - EP", plays: 1691230491, explicit: false },
    { title: "DDU-DU DDU-DU", album: "SQUARE UP - EP", plays: 1721092385, explicit: false }
  ],
  "NewJeans": [
    { title: "Super Shy", album: "Get Up - EP", plays: 1484301294, explicit: false },
    { title: "Ditto", album: "OMG Single", plays: 1541230491, explicit: false },
    { title: "OMG", album: "OMG Single", plays: 1391092385, explicit: false }
  ],
  "Yoasobi": [
    { title: "Idol", album: "Idol - Single", plays: 684301290, explicit: false },
    { title: "Racing Into The Night", album: "The Book", plays: 541230490, explicit: false },
    { title: "Monster", album: "The Book 2", plays: 391092380, explicit: false }
  ],
  "Fujii Kaze": [
    { title: "Shinunoga E-Wa", album: "Help Ever Hurt Never", plays: 424301290, explicit: false },
    { title: "Matsuri", album: "Love All Serve All", plays: 191230490, explicit: false },
    { title: "Kirari", album: "Love All Serve All", plays: 241092380, explicit: false }
  ],
  "Shakira": [
    { title: "Hips Don't Lie", album: "Oral Fixation, Vol. 2", plays: 1934301294, explicit: false },
    { title: "Waka Waka (This Time for Africa)", album: "Listen Up!", plays: 1851230491, explicit: false },
    { title: "Whenever, Wherever", album: "Laundry Service", plays: 1761092385, explicit: false }
  ],
  "Bad Bunny": [
    { title: "Dakiti", album: "El Último Tour Del Mundo", plays: 1984301294, explicit: false },
    { title: "Titi Me Pregunto", album: "Un Verano Sin Ti", plays: 1871230491, explicit: true },
    { title: "Ojitos Lindos", album: "Un Verano Sin Ti", plays: 1761092385, explicit: false }
  ],
  "Burna Boy": [
    { title: "Last Last", album: "Love, Damini", plays: 1384301294, explicit: false },
    { title: "On the Low", album: "African Giant", plays: 1291230491, explicit: false },
    { title: "Ye", album: "Outside", plays: 1341092385, explicit: false }
  ],
  "Rema": [
    { title: "Calm Down", album: "Rave & Roses", plays: 1984301294, explicit: false },
    { title: "Dumebi", album: "Rema - EP", plays: 1212304912, explicit: false },
    { title: "Holiday", album: "Holiday / Charm", plays: 1241092385, explicit: false }
  ],
  "Alan Walker": [
    { title: "Faded", album: "Different World", plays: 1954301294, explicit: false },
    { title: "Alone", album: "Different World", plays: 1641230491, explicit: false },
    { title: "The Spectre", album: "Different World", plays: 1521092385, explicit: false }
  ],
  "Avicii": [
    { title: "Wake Me Up", album: "True", plays: 1984301294, explicit: false },
    { title: "The Nights", album: "The Days / Nights EP", plays: 1871230491, explicit: false },
    { title: "Levels", album: "Levels - EP", plays: 1761092385, explicit: false }
  ],
  "ABBA": [
    { title: "Dancing Queen", album: "Arrival", plays: 1834301294, explicit: false },
    { title: "Mamma Mia", album: "ABBA", plays: 1641230491, explicit: false },
    { title: "Gimme! Gimme! Gimme! (A Man After Midnight)", album: "Voulez-Vous", plays: 1711092385, explicit: false }
  ],
  "Travis Scott": [
    { title: "SICKO MODE", album: "ASTROWORLD", plays: 2109845129, explicit: true },
    { title: "FE!N", album: "UTOPIA", plays: 841230491, explicit: true },
    { title: "Goosebumps", album: "Birds in the Trap Sing McKnight", plays: 1981092385, explicit: true }
  ],
  "Drake": [
    { title: "God's Plan", album: "Scorpion", plays: 2431092384, explicit: true },
    { title: "One Dance", album: "Views", plays: 2891230491, explicit: false },
    { title: "Hotline Bling", album: "Views", plays: 1981092385, explicit: false }
  ],
  "Post Malone": [
    { title: "Sunflower", album: "Spider-Man: Into the Spider-Verse", plays: 3109845120, explicit: false },
    { title: "Circles", album: "Hollywood's Bleeding", plays: 2412304911, explicit: false },
    { title: "Congratulations", album: "Stoney", plays: 1981092385, explicit: true }
  ],
  "Dua Lipa": [
    { title: "Don't Start Now", album: "Future Nostalgia", plays: 2410923841, explicit: false },
    { title: "Levitating", album: "Future Nostalgia", plays: 1981230491, explicit: false },
    { title: "New Rules", album: "Dua Lipa", plays: 1871092385, explicit: false }
  ],
  "Olivia Rodrigo": [
    { title: "Drivers License", album: "SOUR", plays: 2109845129, explicit: true },
    { title: "Good 4 U", album: "SOUR", plays: 1981230491, explicit: true },
    { title: "Vampire", album: "GUTS", plays: 1121092385, explicit: true }
  ],
  "Lana Del Rey": [
    { title: "Summertime Sadness", album: "Born to Die", plays: 1210923841, explicit: false },
    { title: "Video Games", album: "Born to Die", plays: 871230491, explicit: false },
    { title: "Young and Beautiful", album: "The Great Gatsby Soundtrack", plays: 981092385, explicit: false }
  ],
  "Kendrick Lamar": [
    { title: "HUMBLE.", album: "DAMN.", plays: 2109845129, explicit: true },
    { title: "Not Like Us", album: "Not Like Us - Single", plays: 781230491, explicit: true },
    { title: "DNA.", album: "DAMN.", plays: 1181092385, explicit: true }
  ],
  "Rihanna": [
    { title: "Umbrella", album: "Good Girl Gone Bad", plays: 1543012941, explicit: false },
    { title: "We Found Love", album: "Talk That Talk", plays: 1412304912, explicit: false },
    { title: "Work", album: "Anti", plays: 1321092385, explicit: true }
  ],
  "Kanye West": [
    { title: "Stronger", album: "Graduation", plays: 1894301294, explicit: true },
    { title: "Gold Digger", album: "Late Registration", plays: 1212304912, explicit: true },
    { title: "POWER", album: "My Beautiful Dark Twisted Fantasy", plays: 1241092385, explicit: true }
  ],
  "SZA": [
    { title: "Kill Bill", album: "SOS", plays: 1784301294, explicit: true },
    { title: "Snooze", album: "SOS", plays: 1112304912, explicit: true },
    { title: "Good Days", album: "SOS", plays: 1041092385, explicit: true }
  ]
};

// Programmatically generate and register all custom extra high-fidelity tracks for all 51 popular superstars
POPULAR_ARTISTS_DATABASE.forEach(dbArt => {
  const artistId = `artist-${dbArt.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
  const songs = REAL_HIT_SONGS_BY_ARTIST[dbArt.name] || [];
  
  songs.forEach((song, idx) => {
    // Avoid registration duplicates if the track is already in the starting static catalog
    const alreadyExists = INITIAL_TRACKS.some(t => 
      t.title.toLowerCase() === song.title.toLowerCase() && 
      (t.artist.toLowerCase().includes(dbArt.name.toLowerCase()) || (t.artist_id && t.artist_id === artistId))
    );
    
    if (!alreadyExists) {
      INITIAL_TRACKS.push({
        track_id: `t-${dbArt.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${idx + 1}`,
        title: song.title,
        artist: dbArt.name,
        artist_id: artistId,
        album: song.album,
        duration_ms: 180000 + Math.floor(Math.random() * 65000), // ~3.0 - 4.1 mins
        audio_url: "", // Dynamically looked up and overlayed using iTunes Search API in App.tsx!
        artwork_url: dbArt.img || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&q=80',
        genre: dbArt.genre,
        plays: song.plays,
        release_year: 2012 + Math.floor(Math.random() * 12),
        explicit: song.explicit,
        lyrics: `[00:00] (High Fidelity Stereo - Playing ${song.title} by ${dbArt.name})\n[00:10] Lyrics synchronized dynamically with our standard playback feeds.\n[00:25] Playing original high-fidelity master recording.\n[00:50] Powered by iTunes Search engine.`
      });
    }
  });
});

const STATIC_ARTISTS: Artist[] = [
  {
    artist_id: 'artist-krsna',
    name: 'KR$NA',
    bio: 'Krishna Kaul, known professionally as KR$NA, is an Indian rapper and lyricist. He is one of the pioneering of the Desi Hip Hop scene in India, famed for his deep lyrical density, complex rhyme schemes, and legendary double entendres.',
    genres: ['Desi Hip Hop', 'Rap', 'Indian Hip Hop'],
    followers_count: 4331184,
    verified: true,
    avatar_url: INSTRUMENTS_AND_NOTES_IMAGES[0],
    tracks: [INITIAL_TRACKS[0], INITIAL_TRACKS[1], INITIAL_TRACKS[2]],
    upcoming_events: [
      'Mumbai DHH Mega Fest - Nov 22, 2026',
      'Delhi Gymkhana Arena - Dec 05, 2026'
    ]
  },
  {
    artist_id: 'artist-billie-eilish',
    name: 'Billie Eilish',
    bio: 'Billie Eilish Pirate Baird O\'Connell is an American singer-songwriter. She first gained public attention in 2015 with her debut single "Ocean Eyes", written and produced by her brother Finneas O\'Connell.',
    genres: ['Alternative', 'Pop', 'Indie'],
    followers_count: 50000000,
    verified: true,
    avatar_url: INSTRUMENTS_AND_NOTES_IMAGES[1],
    tracks: [INITIAL_TRACKS[3], INITIAL_TRACKS[11]],
    upcoming_events: [
      'Seattle Climate Pledge Arena - June 20, 2026',
      'London Wembley Arena - July 15, 2026'
    ]
  },
  {
    artist_id: 'artist-the-weeknd',
    name: 'The Weeknd',
    bio: 'Abel Makkonen Tesfaye, known professionally as the Weeknd, is a Canadian singer-songwriter and record producer. Known for his sonic versatility and dark lyricism, his music explores escapism, romance, and melancholia.',
    genres: ['R&B/Soul', 'Synth Pop'],
    followers_count: 75000000,
    verified: true,
    avatar_url: INSTRUMENTS_AND_NOTES_IMAGES[2],
    tracks: [INITIAL_TRACKS[7], INITIAL_TRACKS[19]],
    upcoming_events: [
      'Vapor Arcade Fest, Los Angeles - July 2, 2026'
    ]
  },
  {
    artist_id: 'artist-eminem',
    name: 'Eminem',
    bio: 'Marshall Bruce Mathers III, known professionally as Eminem, is an American rapper. He is credited with popularizing hip hop in middle America and is critically acclaimed as one of the greatest rappers of all time.',
    genres: ['Hip-Hop/Rap', 'Rap'],
    followers_count: 62000000,
    verified: true,
    avatar_url: INSTRUMENTS_AND_NOTES_IMAGES[3],
    tracks: [INITIAL_TRACKS[5], INITIAL_TRACKS[8]],
    upcoming_events: [
      'Brooklyn Under Midnight Mainstage - June 30, 2026'
    ]
  },
  {
    artist_id: 'artist-taylor-swift',
    name: 'Taylor Swift',
    bio: 'Taylor Alison Swift is an American singer-songwriter. A subject of widespread public interest, she is a prominent cultural figure of the 21st century, renowned for her songwriting, musical versatility, and artistic reinventions.',
    genres: ['Pop', 'Country', 'Alternative'],
    followers_count: 110000000,
    verified: true,
    avatar_url: INSTRUMENTS_AND_NOTES_IMAGES[4],
    tracks: [INITIAL_TRACKS[6], INITIAL_TRACKS[9], INITIAL_TRACKS[10]],
    upcoming_events: [
      'Green Forest Barn, Portland ME - June 24, 2026'
    ]
  }
];

export const INITIAL_ARTISTS: Artist[] = (() => {
  const list: Artist[] = [...STATIC_ARTISTS];

  // Dynamically map every single unique artist from our track catalog
  INITIAL_TRACKS.forEach(track => {
    const artistNames = track.artist.split(/, | & | feat\. | and /i).map(n => n.trim()).filter(Boolean);
    artistNames.forEach((name, idx) => {
      const exists = list.some(a => a.name.toLowerCase() === name.toLowerCase());
      if (!exists) {
        // Look up profile data in POPULAR_ARTISTS_DATABASE
        const dbArt = POPULAR_ARTISTS_DATABASE.find(a => a.name.toLowerCase() === name.toLowerCase());
        const isPrimary = idx === 0;
        const artistId = (isPrimary && track.artist_id) ? track.artist_id : `artist-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

        // Get all tracks where this artist name is featured/credited
        const artistTracks = INITIAL_TRACKS.filter(t => 
          t.artist.toLowerCase().includes(name.toLowerCase()) || (t.artist_id && t.artist_id === artistId)
        );

        list.push({
          artist_id: artistId,
          name: name,
          bio: dbArt 
            ? `${name} is a global pioneer in the music industry, widely acclaimed for their trendsetting catalog of tracks in the ${dbArt.genre} genre. Having accumulated millions of plays on our platforms, they stand as an unforgettable music icon.`
            : `${name} is an active contributor to the global catalog, renowned for their striking melodies, high-fidelity production styling, and unique contribution to the ${track.genre} movement.`,
          genres: dbArt ? [dbArt.genre] : [track.genre],
          followers_count: dbArt
            ? (name === 'KR$NA' ? 4331184 : Math.floor(Math.random() * 5000000) + 1200000)
            : Math.floor(Math.random() * 400000) + 80000,
          verified: dbArt ? true : false,
          avatar_url: dbArt?.img || track.artwork_url || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=80',
          tracks: artistTracks,
          upcoming_events: [
            `${name} Arena Spectacle - Oct 18, 2026`,
            `${name} World Tour Mainstage - Nov 05, 2026`
          ]
        });
      }
    });
  });

  // Also include any other popular artists from POPULAR_ARTISTS_DATABASE who have no songs in INITIAL_TRACKS yet, so they still have beautiful profiles
  POPULAR_ARTISTS_DATABASE.forEach(dbArt => {
    const exists = list.some(a => a.name.toLowerCase() === dbArt.name.toLowerCase());
    if (!exists) {
      const artistId = `artist-${dbArt.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
      const dbTracks = INITIAL_TRACKS.filter(t => 
        t.artist.toLowerCase().includes(dbArt.name.toLowerCase()) || (t.artist_id && t.artist_id === artistId)
      );

      list.push({
        artist_id: artistId,
        name: dbArt.name,
        bio: `${dbArt.name} is a world-class creator, famous for defining the sound of ${dbArt.genre}. Their music captures listeners worldwide with unmatched rhythm and distinctive emotional resonance.`,
        genres: [dbArt.genre],
        followers_count: Math.floor(Math.random() * 12000000) + 1500000,
        verified: true,
        avatar_url: dbArt.img || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=80',
        tracks: dbTracks,
        upcoming_events: [
          `${dbArt.name} Live in Concert - Nov 12, 2026`
        ]
      });
    }
  });

  // 1. Define custom high-fidelity video tracks data
  const VIDEO_ARTISTS_TRACKS: { [name: string]: { title: string; plays: number; duration_ms: number; audio?: string }[] } = {
    'Atif Aslam': [
      { title: 'Tere Liye', plays: 306212438, duration_ms: 279000, audio: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/ec/3b/b1/ec3bb1df-96ca-aee3-ad98-fb021379761e/mzaf_10526848249495818320.plus.aac.p.m4a' },
      { title: 'Jeena Jeena', plays: 461899747, duration_ms: 229000, audio: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/ff/e9/87/ffe98781-a904-4df1-687f-e283f5fbcfce/mzaf_124119854972551421.plus.aac.p.m4a' },
      { title: 'Jeene Laga Hoon', plays: 295955181, duration_ms: 236000, audio: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/ef/54/1a/ef541af7-fc19-8692-0694-bfdad4005c2a/mzaf_47240161048259021.plus.aac.p.m4a' },
      { title: 'Tera Hone Laga Hoon', plays: 441968487, duration_ms: 299000, audio: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/21/cf/fa/21cffa17-81bd-34c9-c189-e1fca947f201/mzaf_11304910242194.plus.aac.p.m4a' },
      { title: 'Tu Jaane Na', plays: 369899747, duration_ms: 339000, audio: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/44/21/04/442104bd-c6f3-bf80-0a1e-cf02e9a22492/mzaf_150249104051.plus.aac.p.m4a' }
    ],
    'Benny Dayal': [
      { title: 'Lat Lag Gayee', plays: 178199996, duration_ms: 280000, audio: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/b4/d9/0c/b4d90ce4-df25-b1a7-0e9e-fb0122240954/mzaf_1052495818320.plus.aac.p.m4a' },
      { title: 'Badtameez Dil', plays: 145825895, duration_ms: 252000, audio: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/f4/b5/02/f4b502bd-ef0f-6202-0e98-efea2af005e1/mzaf_24910492.plus.aac.p.m4a' }
    ],
    'Dhanush': [
      { title: 'Deewana Deewana', plays: 75118484, duration_ms: 339000, audio: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview121/v4/bf/25/7f/bf257f86-cfcc-883a-cd43-98fe87e7f607/mzaf_1384029104829302194.plus.aac.p.m4a' },
      { title: 'Raanjhanaa', plays: 252912889, duration_ms: 274000, audio: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/02/1d/30/021d3036-5503-3ed3-df00-882f2833a6ae/17UM1IM17026.rgb.jpg/600x600bb.jpg' }
    ],
    'Sukh-E Muzical Doctorz': [
      { title: 'Jaguar', plays: 71772821, duration_ms: 213000 },
      { title: 'Mummy Nu Pasand', plays: 94215192, duration_ms: 184000 },
      { title: 'Coka', plays: 50612741, duration_ms: 202000 },
      { title: 'Darzi', plays: 1999421, duration_ms: 232000 }
    ],
    'Pav Dharia': [
      { title: 'Na Ja', plays: 271970058, duration_ms: 209000 },
      { title: 'Najaa', plays: 115178054, duration_ms: 189000 },
      { title: 'Zindagi Haseen', plays: 90218495, duration_ms: 181000 }
    ],
    'Sidhu Moose Wala': [
      { title: 'Same Beef', plays: 230842922, duration_ms: 272000 },
      { title: 'East Side Flow', plays: 182104079, duration_ms: 199000 }
    ],
    'BTS': [
      { title: 'SWIM', plays: 575190733, duration_ms: 159000 },
      { title: 'Body to Body', plays: 217947309, duration_ms: 189000 },
      { title: 'Hooligan', plays: 329453910, duration_ms: 182000 },
      { title: 'FYA', plays: 198861751, duration_ms: 182000 }
    ],
    'Ed Sheeran': [
      { title: 'Shape of You', plays: 4953052198, duration_ms: 233000, audio: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/b4/ae/1f/b4ae1f2b-bd30-dfa0-c12e-1313d492af7d/mzaf_1241198.plus.aac.p.m4a' },
      { title: 'Perfect', plays: 3990203737, duration_ms: 263000, audio: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/91/33/2c/91332cb5-df52-ea30-8a4a-105268482494.plus.aac.p.m4a' }
    ],
    'Alan Walker': [
      { title: 'Faded', plays: 2398052184, duration_ms: 212000, audio: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/fa/52/6c/fa526cc1-17f1-8311-bf80-b2bfa0d0b00c/mzaf_1241190.plus.aac.p.m4a' }
    ],
    'Taylor Swift': [
      { title: 'The Fate of Ophelia', plays: 1432912408, duration_ms: 244000 },
      { title: 'Opalite', plays: 732910248, duration_ms: 208000 }
    ],
    'Sia': [
      { title: 'Titanium', plays: 2311839700, duration_ms: 245000, audio: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/4a/01/95/4a0195e3-ca17-06df-ca17-06dfba021379.plus.aac.p.m4a' },
      { title: 'Unstoppable', plays: 1071999215, duration_ms: 217000, audio: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/b1/04/ea/b104ea20-ec8a-efea-a312-d0492af7e051.plus.aac.p.m4a' },
      { title: 'Chandelier', plays: 2283959111, duration_ms: 216000 },
      { title: 'Dusk Till Dawn', plays: 2255119880, duration_ms: 233000 }
    ],
    'Bilal Saeed': [
      { title: '12 Saal', plays: 85087051, duration_ms: 211000 },
      { title: 'Adhi Adhi Raat', plays: 38811853, duration_ms: 234000 },
      { title: '2 Number', plays: 23834890, duration_ms: 244000 },
      { title: 'Khair Mangdi', plays: 19837870, duration_ms: 234000 }
    ],
    'Palak Muchhal': [
      { title: 'Chahun Main Ya Naa', plays: 308433218, duration_ms: 304000, audio: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/33/21/df/3321dfac-c6b5-90a8-bf91-fb052cfce9e1.plus.aac.p.m4a' },
      { title: 'Sanam Teri Kasam', plays: 225104904, duration_ms: 314000 },
      { title: 'Meri Aashiqui', plays: 185948110, duration_ms: 266000 }
    ],
    'A. R. Rahman': [
      { title: 'Agar Tum Saath Ho', plays: 727162478, duration_ms: 341000, audio: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/cc/7a/7f/cc7a7f45-8c7c-47ea-bd3d-cb22aef005fa/mzaf_124119.plus.aac.p.m4a' },
      { title: 'Deewana Deewana', plays: 75118484, duration_ms: 339000 }
    ]
  };

  const VIDEO_ARTISTS_LISTENERS: { [name: string]: number } = {
    'Atif Aslam': 29286444,
    'Benny Dayal': 16225117,
    'Vijay': 4547312,
    'Dhanush': 10145397,
    'Anirudh Ravichander': 24842864,
    'Sukh-E Muzical Doctorz': 2905143,
    'Pav Dharia': 2927336,
    'Sidhu Moose Wala': 9856284,
    'BTS': 36841041,
    'Ed Sheeran': 53905173,
    'Alan Walker': 31045984,
    'Taylor Swift': 101905043,
    'Sia': 69245481,
    'Bilal Saeed': 3362471,
    'Palak Muchhal': 17081669,
    'Arijit Singh': 64836916,
    'A. R. Rahman': 48869475
  };

  // Convert definitions and append them to INITIAL_TRACKS so they are globally registered in the catalog search and player!
  Object.keys(VIDEO_ARTISTS_TRACKS).forEach(artistName => {
    const targetArtist = list.find(a => a.name.toLowerCase() === artistName.toLowerCase());
    const artistId = targetArtist?.artist_id || `artist-${artistName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    
    VIDEO_ARTISTS_TRACKS[artistName].forEach((trackDef, idx) => {
      const trackId = `t-${artistId}-${idx}`;
      
      // Push to INITIAL_TRACKS if not already there
      const exists = INITIAL_TRACKS.some(t => t.title.toLowerCase() === trackDef.title.toLowerCase() && t.artist_id === artistId);
      if (!exists) {
        INITIAL_TRACKS.push({
          track_id: trackId,
          title: trackDef.title,
          artist: artistName,
          artist_id: artistId,
          album: `${trackDef.title} (Single)`,
          duration_ms: trackDef.duration_ms,
          audio_url: trackDef.audio || 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/71/5c/80/715c80fc-ebe4-e713-487c-5bdefee6c6f3/mzaf_3698387428135478316.plus.aac.p.m4a',
          artwork_url: targetArtist?.avatar_url || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80',
          genre: 'Pop',
          plays: trackDef.plays,
          release_year: 2024,
          explicit: false
        });
      }
    });
  });

  // Now, synchronize tracks arrays for all artists and apply exact followers/listeners count and verified override status
  list.forEach(artist => {
    artist.tracks = INITIAL_TRACKS.filter(t => 
      t.artist.toLowerCase() === artist.name.toLowerCase() || 
      t.artist_id === artist.artist_id
    );

    // Apply exact listeners count override from the reference video
    if (VIDEO_ARTISTS_LISTENERS[artist.name] !== undefined) {
      artist.followers_count = VIDEO_ARTISTS_LISTENERS[artist.name];
    } else {
      artist.followers_count = Math.floor(Math.random() * 800000) + 120000;
    }

    // Auto-verify if they are in the POPULAR_ARTISTS_DATABASE
    if (POPULAR_ARTISTS_DATABASE.some(da => da.name.toLowerCase() === artist.name.toLowerCase())) {
      artist.verified = true;
    }
  });

  return list;
})();

export const INITIAL_ALBUMS: Album[] = [
  {
    album_id: 'al-1',
    title: 'Atmosphere',
    artist: 'Lila Sterling',
    release_date: '2025-04-12',
    upc: '74829104051',
    genre: 'Pop',
    label: 'Sonic Waves Record Store',
    type: 'LP',
    artwork_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&q=80',
    tracks: [INITIAL_TRACKS[3], INITIAL_TRACKS[9]]
  },
  {
    album_id: 'al-2',
    title: 'Retrogrid',
    artist: 'Daft Pixel',
    release_date: '2024-11-20',
    upc: '93021940192',
    genre: 'Electronic',
    label: 'Digital Pixel Lab',
    type: 'LP',
    artwork_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&q=80',
    tracks: [INITIAL_TRACKS[4], INITIAL_TRACKS[7]]
  },
  {
    album_id: 'al-3',
    title: 'Rebel Beats',
    artist: 'The Groovy Rebels',
    release_date: '2026-02-05',
    upc: '109204910492',
    genre: 'Hip Hop',
    label: 'Underground Vinyl Co.',
    type: 'LP',
    artwork_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80',
    tracks: [INITIAL_TRACKS[5], INITIAL_TRACKS[8]]
  }
];

export const INITIAL_PODCASTS: Podcast[] = [
  {
    podcast_id: 'pod-1',
    title: 'The Tech Frontier Review',
    publisher: 'Frontier Labs Media',
    category: 'Technology & Startups',
    description: 'Weekly conversations tracking the state of emerging artificial intelligence, mobile design breakthroughs, full-stack architectures, and product design philosophies.',
    artwork_url: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=300&q=80',
    episodes: [
      {
        episode_id: 'ep-1_1',
        title: 'Building for Scale in 2026',
        podcast_title: 'The Tech Frontier Review',
        audio_url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/29/e2/68/29e26874-ed3c-49f1-1fcc-cf7a3e5cde17/mzaf_14514475775303545273.plus.aac.p.m4a',
        description: 'An overview of container strategies, horizontal auto-scaling databases, CDNs, and custom high-fidelity media players designed with Web Audio API.',
        duration_ms: 90000,
        publish_date: '2026-06-01',
        saved_position_ms: 0
      },
      {
        episode_id: 'ep-1_2',
        title: 'Designing Accessible User Interfaces',
        podcast_title: 'The Tech Frontier Review',
        audio_url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/62/0c/72/620c72ac-f370-0de6-2a0d-831f6d2d26f3/mzaf_9090450490088600113.plus.aac.p.m4a',
        description: 'How to meet WCAG 2.1 level AA specifications including screen reader support, voice assistants, and flexible sub-component layouts.',
        duration_ms: 88000,
        publish_date: '2026-05-24',
        saved_position_ms: 0
      }
    ]
  },
  {
    podcast_id: 'pod-2',
    title: 'Zen Mind, Happy Life',
    publisher: 'Mindfulness Syndicate',
    category: 'Health & Wellness',
    description: 'Breathe in, breathe out. Explore daily meditations, cognitive tools for managing stress, productivity hacks, and deep conversations on well-being.',
    artwork_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&q=80',
    episodes: [
      {
        episode_id: 'ep-2_1',
        title: '10 Minutes of Ocean Breaths',
        podcast_title: 'Zen Mind, Happy Life',
        audio_url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/62/0a/a5/620aa56f-189e-708a-80f0-cebdada3872e/mzaf_7131619873177773332.plus.aac.p.m4a',
        description: 'A quiet, deep breathing guidance session utilizing standard 4-7-8 breathing cycles overlaying soothing sea waveforms.',
        duration_ms: 85000,
        publish_date: '2026-06-05',
        saved_position_ms: 0
      }
    ]
  }
];

export const INITIAL_ANALYTICS: PlatformAnalytics = {
  dau: 142050,
  mau: 489300,
  total_streams: 14092410,
  subscriber_count: 240890,
  revenue: 240890 * 9.99,
  top_tracks: [
    { title: 'Midnight Shadows', artist: 'The Groovy Rebels', stream_count: 2310450 },
    { title: 'Ocean Eyes', artist: 'Lila Sterling', stream_count: 1420950 },
    { title: 'After Midnight', artist: 'The Groovy Rebels', stream_count: 1205300 },
    { title: 'Neon Horizon', artist: 'Daft Pixel', stream_count: 894320 },
    { title: 'Fading Summer', artist: 'Lila Sterling', stream_count: 890450 }
  ]
};
