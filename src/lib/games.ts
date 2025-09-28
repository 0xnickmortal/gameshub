export interface Game {
  id: string;
  title: string;
  tags: string[];
  rating: number;
  cover: string;
  preview: string;
}

export const GAMES: Game[] = [
    { "id":"g1", "title":"Jet Lancer", "tags":[ "Action", "Arcade", "Shooter" ], "rating":4.8, "cover":"https://asbqufgqzh42wlwt.public.blob.vercel-storage.com/Banners/images/Jet%20Lancer.jpg", "preview":"https://asbqufgqzh42wlwt.public.blob.vercel-storage.com/Banners/videos/c22b7aae6045592196c905d6b28cea2d.webm" },
    { "id":"g2", "title":"Neko Sliding", "tags":[ "Puzzle", "Cute", "Casual" ], "rating":4.5, "cover":"https://asbqufgqzh42wlwt.public.blob.vercel-storage.com/Banners/images/Neko%20Sliding.jpg", "preview":"https://asbqufgqzh42wlwt.public.blob.vercel-storage.com/Banners/videos/Neko%20Sliding%20-%20Trailer%20-%20Gearhead%20Games%20%28720p%2C%20h264%2C%20youtube%29.mp4" },
    { "id":"g3", "title":"Retro Highway", "tags":[ "Racing", "Arcade", "Retro" ], "rating":4.7, "cover":"https://asbqufgqzh42wlwt.public.blob.vercel-storage.com/Banners/images/Retro%20Highway.jpg", "preview":"https://asbqufgqzh42wlwt.public.blob.vercel-storage.com/Banners/videos/Retro%20Highway%20Trailer%20-%20Gearhead%20Games%20%28720p%2C%20h264%2C%20youtube%29.mp4" },
    { "id":"g4", "title":"Royal Card Clash", "tags":[ "Card", "Strategy", "PvP" ], "rating":4.6, "cover":"https://asbqufgqzh42wlwt.public.blob.vercel-storage.com/Banners/images/Royal%20Card%20Clash%20.jpg", "preview":"https://asbqufgqzh42wlwt.public.blob.vercel-storage.com/Banners/videos/Royal%20Card%20Clash%20-%20Trailer%20-%20Gearhead%20Games%20%28720p%2C%20h264%2C%20youtube%29.mp4" },
    { "id":"g5", "title":"Coal LLC", "tags":[ "Racing", "Arcade", "Action" ], "rating":4.2, "cover":"https://asbqufgqzh42wlwt.public.blob.vercel-storage.com/Banners/images/Coal%20LLC.jpg", "preview":"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
    { "id":"g6", "title":"Desktop Fidget", "tags":[ "Puzzle", "Sci-Fi" ], "rating":4.6, "cover":"https://asbqufgqzh42wlwt.public.blob.vercel-storage.com/Banners/images/Desktop%20Fidget.jpg", "preview":"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" },
    { "id":"g7", "title":"Easy Delivery", "tags":[ "Card", "Puzzle", "Social" ], "rating":4.4, "cover":"https://asbqufgqzh42wlwt.public.blob.vercel-storage.com/Banners/images/Easy%20Delivery.jpg", "preview":"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
    { "id":"g8", "title":"Find Fake", "tags":[ "Action", "MOBA" ], "rating":4.9, "cover":"https://asbqufgqzh42wlwt.public.blob.vercel-storage.com/Banners/images/Find%20Fake.jpg", "preview":"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" },
    { "id":"g9", "title":"Jump Space", "tags":[ "Adventure", "Puzzle" ], "rating":4.5, "cover":"https://asbqufgqzh42wlwt.public.blob.vercel-storage.com/Banners/images/Jump%20Space.jpg", "preview":"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
    { "id":"g10", "title":"Ratan", "tags":[ "Strategy", "Trading", "Sci-Fi" ], "rating":4.1, "cover":"https://asbqufgqzh42wlwt.public.blob.vercel-storage.com/Banners/images/Ratan.jpg", "preview":"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" },
    { "id":"g11", "title":"Veilcraft", "tags":[ "Strategy", "TCG" ], "rating":4.7, "cover":"https://asbqufgqzh42wlwt.public.blob.vercel-storage.com/Banners/images/Veilcraft.jpg", "preview":"https://asbqufgqzh42wlwt.public.blob.vercel-storage.com/Banners/videos/Veilcraft%20Trailer.mp4" },
    { "id":"g12", "title":"Black Myth Wukong", "tags":[ "Action", "Arcade" ], "rating":4.8, "cover":"https://asbqufgqzh42wlwt.public.blob.vercel-storage.com/Banners/images/Black%20Myth.jpg", "preview":"https://asbqufgqzh42wlwt.public.blob.vercel-storage.com/Banners/videos/Black%20Myth.mp4" },
    { "id":"g13", "title":"Void Runners", "tags":["Action", "Sci-Fi", "Roguelike"], "rating":4.6, "cover":"https://picsum.photos/seed/voidrunners/640/360", "preview":"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
    { "id":"g14", "title":"Chrono Weavers", "tags":["RPG", "Strategy", "Time Travel"], "rating":4.9, "cover":"https://picsum.photos/seed/chrono/640/360", "preview":"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" },
    { "id":"g15", "title":"Hearthstone Village", "tags":["Social", "Simulation"], "rating":4.2, "cover":"https://picsum.photos/seed/hearthstone/640/360", "preview":"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
    { "id":"g16", "title":"Nitro Derby", "tags":["Racing", "Sports"], "rating":4.4, "cover":"https://picsum.photos/seed/nitro/640/360", "preview":"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" },
    { "id":"g17", "title":"Grimoire Quest", "tags":["Card", "RPG", "Adventure"], "rating":4.7, "cover":"https://picsum.photos/seed/grimoire/640/360", "preview":"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
    { "id":"g18", "title":"Subway Surfers", "tags":["Arcade", "Action"], "rating":4.5, "cover":"https://picsum.photos/seed/subway/640/360", "preview":"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" },
    { "id":"g19", "title":"Galaxy Patrol", "tags":["Sci-Fi", "Shooter"], "rating":4.3, "cover":"https://picsum.photos/seed/galaxy/640/360", "preview":"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
    { "id":"g20", "title":"Match Masters", "tags":["Puzzle", "Social"], "rating":4.8, "cover":"https://picsum.photos/seed/match/640/360", "preview":"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" },
    { "id":"g21", "title":"Kingdom Clash", "tags":["Strategy", "Action"], "rating":4.6, "cover":"https://picsum.photos/seed/kingdom/640/360", "preview":"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
    { "id":"g22", "title":"Zen Garden", "tags":["Puzzle", "Simulation"], "rating":4.7, "cover":"https://picsum.photos/seed/zen/640/360", "preview":"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" },
    { "id":"g23", "title":"Pirate's Plunder", "tags":["Adventure", "Action"], "rating":4.4, "cover":"https://picsum.photos/seed/pirate/640/360", "preview":"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
    { "id":"g24", "title":"Hexa Grid", "tags":["Puzzle", "Strategy"], "rating":4.8, "cover":"https://picsum.photos/seed/hexa/640/360", "preview":"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" },
    { "id":"g25", "title":"Drift Kings", "tags":["Racing", "Sports"], "rating":4.5, "cover":"https://picsum.photos/seed/drift/640/360", "preview":"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" }
];

