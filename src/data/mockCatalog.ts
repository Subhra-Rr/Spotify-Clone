import { Track, Artist, Album, Podcast, PlatformAnalytics } from '../types';

export const INITIAL_TRACKS: Track[] = [
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

export const INITIAL_ARTISTS: Artist[] = [
  {
    artist_id: 'a-1',
    name: 'Lila Sterling',
    bio: 'Lila Sterling is a 21-year-old alternative pop vocalist and songwriter from Seattle. Her atmospheric melodies, deeply emotive lyrics, and soft melancholic production have garnered global acclaim.',
    genres: ['Pop', 'Alternative Indie'],
    followers_count: 2478900,
    verified: true,
    avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80',
    tracks: [INITIAL_TRACKS[0], INITIAL_TRACKS[6]],
    upcoming_events: [
      'Seattle Climate Pledge Arena - June 20, 2026',
      'London Wembley Arena - July 15, 2026',
      'Tokyo Dome - August 4, 2026'
    ]
  },
  {
    artist_id: 'a-2',
    name: 'Daft Pixel',
    bio: 'Pioneers of the pixel-pop and synthwave revival, Daft Pixel creates fully instrumental synthesizer compositions featuring retro soundscapes blended with modern electronic drops.',
    genres: ['Electronic', 'Synthwave', 'Electro-Pop'],
    followers_count: 1890350,
    verified: true,
    avatar_url: 'https://images.unsplash.com/photo-1549417229-aa67d3263c09?w=300&q=80',
    tracks: [INITIAL_TRACKS[1], INITIAL_TRACKS[4]],
    upcoming_events: [
      'Vapor Arcade Fest, Los Angeles - July 2, 2026',
      'ElectroDome, Paris - Sep 11, 2026'
    ]
  },
  {
    artist_id: 'a-3',
    name: 'The Groovy Rebels',
    bio: 'A hip-hop collective specializing in boom-bap, lo-fi beats, and storytelling rhymes focusing on urban life, personal struggle, and the pulse of the underground scene.',
    genres: ['Hip Hop', 'Lo-Fi Rap', 'Soulful Beats'],
    followers_count: 3105400,
    verified: true,
    avatar_url: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=300&q=80',
    tracks: [INITIAL_TRACKS[2], INITIAL_TRACKS[5]],
    upcoming_events: [
      'Brooklyn Under Midnight Mainstage - June 30, 2026',
      'Chicago Block Party - August 19, 2026'
    ]
  },
  {
    artist_id: 'a-4',
    name: 'The Acoustic Trio',
    bio: 'Born in the heart of Maine, The Acoustic Trio crafts organic, string-based acoustic records. Featuring violin, mandolin, and standard string guitars for cozy campfire nights.',
    genres: ['Acoustic', 'Folk', 'Indie'],
    followers_count: 549100,
    verified: false,
    avatar_url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&q=80',
    tracks: [INITIAL_TRACKS[3]],
    upcoming_events: [
      'Green Forest Barn, Portland ME - June 24, 2026'
    ]
  }
];

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
    tracks: [INITIAL_TRACKS[0], INITIAL_TRACKS[6]]
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
    tracks: [INITIAL_TRACKS[1], INITIAL_TRACKS[4]]
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
    tracks: [INITIAL_TRACKS[2], INITIAL_TRACKS[5]]
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
        audio_url: 'https://raw.githubusercontent.com/Anand-Chowdhary/lofi-player/master/assets/music/1.mp3',
        description: 'An overview of container strategies, horizontal auto-scaling databases, CDNs, and custom high-fidelity media players designed with Web Audio API.',
        duration_ms: 90000,
        publish_date: '2026-06-01',
        saved_position_ms: 0
      },
      {
        episode_id: 'ep-1_2',
        title: 'Designing Accessible User Interfaces',
        podcast_title: 'The Tech Frontier Review',
        audio_url: 'https://raw.githubusercontent.com/Anand-Chowdhary/lofi-player/master/assets/music/2.mp3',
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
        audio_url: 'https://raw.githubusercontent.com/Anand-Chowdhary/lofi-player/master/assets/music/4.mp3',
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
