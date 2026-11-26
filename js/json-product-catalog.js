//#region JSON Array LICENSE INFORMATION
const LICENSES = [
    {
        "licenseKey": "free",
        "title": "Free / Non-Profit",
        "extraPrice": 0.00,
        "description": "For personal projects, demos, and non-monetized uploads (e.g., SoundCloud or YouTube without ads). Credit required.",
        "features": [
            "Personal & non-commercial use only",
            "No monetization on streaming platforms",
            "Credit required in title (Prod. by ...)"
        ]
    },
    {
        "licenseKey": "basic",
        "title": "Basic Lease",
        "extraPrice": 14.90,
        "description": "Ideal for independent releases on Spotify, Apple Music, and YouTube with limited reach.",
        "features": [
            "Commercial use permitted",
            "Up to 50,000 audio streams included",
            "1 monetized music video"
        ]
    },
    {
        "licenseKey": "pro",
        "title": "Pro Unlimited",
        "extraPrice": 29.90,
        "description": "For professional releases without stream caps, including all trackout stems for mixing.",
        "features": [
            "Unlimited streams & sales",
            "Trackout stems included",
            "Radio & live performances covered"
        ]
    },
    {
        "licenseKey": "exclusive",
        "title": "Exclusive Rights",
        "extraPrice": 99.00,
        "description": "Full commercial exploitation rights without limits. The loop will be permanently removed from the store after purchase.",
        "features": [
            "Unlimited worldwide commercial rights",
            "Exclusivity: Removed from the store",
            "All master files & trackout stems included"
        ]
    }
];
// #endregion
// -------------------------------------------------------------

//#region JSON Array  AUDIO FORMAT INFORMATION
const AUDIO_FORMATS = [
    {
        "formatKey": "mp3",
        "format": "MP3 (320 kbps)",
        "extraPrice": 0.00,
        "description": "High-bitrate lossy compression (320 kbps / 44.1 kHz). Lightweight file size ideal for quick beat sketching, demos, and mobile listening.",
        "features": [
            "Bitrate: 320 kbps (CBR) at 44.1 kHz",
            "Small file size for fast downloads & demos",
            "Not recommended for heavy mastering or time-stretching"
        ]
    },
    {
        "formatKey": "wav",
        "format": "WAV (16-Bit / 44.1 kHz)",
        "extraPrice": 2.00,
        "description": "Uncompressed CD-quality stereo audio (1,411 kbps). The universal industry standard for DAW production, streaming uploads, and live DJ sets.",
        "features": [
            "Bitrate: 1,411 kbps uncompressed PCM",
            "Zero compression artifacts for clean mixing",
            "Compatible with every DAW and hardware sampler"
        ]
    },
    {
        "formatKey": "flac",
        "format": "FLAC (24-Bit Lossless)",
        "extraPrice": 4.00,
        "description": "Lossless compressed 24-bit / 48 kHz audio (~2,304 kbps). Delivers full studio dynamic range at roughly half the file size of raw WAV files.",
        "features": [
            "24-bit depth / 48 kHz sample rate",
            "100% bit-identical to the studio source",
            "Ideal for archiving and cloud collaboration"
        ]
    },
    {
        "formatKey": "master",
        "format": "24-Bit / 96 kHz Studio Master",
        "extraPrice": 7.00,
        "description": "Ultra-high-resolution uncompressed WAV master (4,608 kbps) plus dry/wet stems. Built for extreme pitch-shifting, sound design, and commercial mastering.",
        "features": [
            "Bitrate: 4,608 kbps (24-bit / 96 kHz)",
            "Maximum headroom for heavy distortion & pitching",
            "Includes dry/wet single trackout stems"
        ]
    }
];
// #endregion
// -------------------------------------------------------------

//#region JSON Array PRODUCT DATA CATALOG
let loopCatalog = [
    {
        "category": "Slam & Beatdown Metal",
        "iconPath": "./assets/icons/beatdown1.svg",
        "loops": [
            {
                "loopKey": "idMetal0",
                "title": "Concrete Breakdown Riff (Drop A)",
                "bpm": 135,
                "defaultLicense": "free",
                "defaultFormat": "mp3",
                "price": 12.90,
                "includedSamples": [
                    "2x Ping Snare One-Shots",
                    "1x Sub-Drop 808 Boom",
                    "3x Chug Guitar Stems (DI & Amped)"
                ]
            },
            {
                "loopKey": "idMetal1",
                "title": "Gutter Slam Groove & China Loop",
                "bpm": 140,
                "defaultLicense": "free",
                "defaultFormat": "mp3",
                "price": 14.90,
                "includedSamples": [
                    "4x Raw Kick & Snare Hits",
                    "1x Trashy China Cymbal",
                    "2x Downtuned Bass Riffs"
                ]
            }
        ]
    },
    {
        "category": "Underground Hip-Hop",
        "iconPath": "./assets/icons/underground-hiphop1.svg",
        "loops": [
            {
                "loopKey": "idHiphop0",
                "title": "Memphis Tape Phonk Melody",
                "bpm": 130,
                "defaultLicense": "free",
                "defaultFormat": "mp3",
                "price": 11.90,
                "includedSamples": [
                    "1x Distorted Cowbell Loop",
                    "3x Gritty 808 Bass Hits",
                    "2x VHS Vocal Chop FX"
                ]
            },
            {
                "loopKey": "idHiphop1",
                "title": "Midnight Alley Boom-Bap Loop",
                "bpm": 92,
                "defaultLicense": "free",
                "defaultFormat": "mp3",
                "price": 10.90,
                "includedSamples": [
                    "4x Dusty Vinyl Drum One-Shots",
                    "1x Dark Rhodes Piano Stem",
                    "1x Tape Hiss Texture"
                ]
            }
        ]
    },
    {
        "category": "Hard & Melodic Techno",
        "iconPath": "./assets/icons/techno1.svg",
        "loops": [
            {
                "loopKey": "idTechno0",
                "title": "Warehouse Rumble & Acid Line",
                "bpm": 145,
                "defaultLicense": "free",
                "defaultFormat": "mp3",
                "price": 13.90,
                "includedSamples": [
                    "1x Industrial Kick + Rumble Stem",
                    "1x 303 Acid Synth Loop",
                    "3x Metallic Hi-Hat & Ride Hits"
                ]
            },
            {
                "loopKey": "idTechno1",
                "title": "Hypnotic Dark Melodic Arp",
                "bpm": 136,
                "defaultLicense": "free",
                "defaultFormat": "mp3",
                "price": 12.90,
                "includedSamples": [
                    "2x Analog Lead Synth Stems",
                    "1x Deep Rolling Bassline",
                    "2x White Noise Riser FX"
                ]
            }
        ]
    },
    {
        "category": "Psychedelic Indie & Lo-Fi",
        "iconPath": "./assets/icons/indie1.svg",
        "loops": [
            {
                "loopKey": "idIndie0",
                "title": "Desert Fuzz Guitar & Tape Drums",
                "bpm": 112,
                "defaultLicense": "free",
                "defaultFormat": "mp3",
                "price": 11.90,
                "includedSamples": [
                    "2x Spring-Reverb Guitar Loops",
                    "3x Warm Analog Drum Hits",
                    "1x Vintage Organ Drone"
                ]
            },
            {
                "loopKey": "idIndie1",
                "title": "Sunbleached 70s Bass & Tambourine",
                "bpm": 104,
                "defaultLicense": "free",
                "defaultFormat": "mp3",
                "price": 9.90,
                "includedSamples": [
                    "1x Hofner Bassline Stem",
                    "2x Live Percussion Loops",
                    "1x Cassette Wow & Flutter FX"
                ]
            }
        ]
    }
];
// #endregion
// -------------------------------------------------------------