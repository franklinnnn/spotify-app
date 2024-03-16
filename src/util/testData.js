export const testData = {
  album: {
    album_type: "compilation",
    total_tracks: 9,
    available_markets: ["CA", "BR", "IT"],
    external_urls: {
      spotify: "string",
    },
    href: "string",
    id: "2up3OPMp9Tb4dAKM2erWXQ",
    images: [
      {
        url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
        height: 300,
        width: 300,
      },
    ],
    name: "string",
    release_date: "1981-12",
    release_date_precision: "year",
    restrictions: {
      reason: "market",
    },
    type: "album",
    uri: "spotify:album:2up3OPMp9Tb4dAKM2erWXQ",
    copyrights: [
      {
        text: "string",
        type: "string",
      },
    ],
    external_ids: {
      isrc: "string",
      ean: "string",
      upc: "string",
    },
    genres: ["Egg punk", "Noise rock"],
    label: "string",
    popularity: 0,
    album_group: "compilation",
    artists: [
      {
        external_urls: {
          spotify: "string",
        },
        href: "string",
        id: "string",
        name: "string",
        type: "artist",
        uri: "string",
      },
    ],
  },
  artists: [
    {
      external_urls: {
        spotify: "string",
      },
      followers: {
        href: "string",
        total: 0,
      },
      genres: ["Prog rock", "Grunge"],
      href: "string",
      id: "string",
      images: [
        {
          url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
          height: 300,
          width: 300,
        },
      ],
      name: "string",
      popularity: 0,
      type: "artist",
      uri: "string",
    },
  ],
  available_markets: ["string"],
  disc_number: 0,
  duration_ms: 0,
  explicit: false,
  external_ids: {
    isrc: "string",
    ean: "string",
    upc: "string",
  },
  external_urls: {
    spotify: "string",
  },
  href: "string",
  id: "string",
  is_playable: false,
  linked_from: {},
  restrictions: {
    reason: "string",
  },
  name: "string",
  popularity: 0,
  preview_url: "string",
  track_number: 0,
  type: "track",
  uri: "string",
  is_local: false,
};

export const testAlbum = {
  album_type: "single",
  artists: [
    {
      external_urls: {
        spotify: "https://open.spotify.com/artist/6HvZYsbFfjnjFrWF950C9d",
      },
      href: "https://api.spotify.com/v1/artists/6HvZYsbFfjnjFrWF950C9d",
      id: "6HvZYsbFfjnjFrWF950C9d",
      name: "NewJeans",
      type: "artist",
      uri: "spotify:artist:6HvZYsbFfjnjFrWF950C9d",
    },
  ],
  external_urls: {
    spotify: "https://open.spotify.com/album/4N1fROq2oeyLGAlQ1C1j18",
  },
  href: "https://api.spotify.com/v1/albums/4N1fROq2oeyLGAlQ1C1j18",
  id: "4N1fROq2oeyLGAlQ1C1j18",
  images: [
    {
      height: 640,
      url: "https://i.scdn.co/image/ab67616d0000b2730744690248ef3ba7b776ea7b",
      width: 640,
    },
    {
      height: 300,
      url: "https://i.scdn.co/image/ab67616d00001e020744690248ef3ba7b776ea7b",
      width: 300,
    },
    {
      height: 64,
      url: "https://i.scdn.co/image/ab67616d000048510744690248ef3ba7b776ea7b",
      width: 64,
    },
  ],
  is_playable: true,
  name: "NewJeans 2nd EP 'Get Up'",
  release_date: "2023-07-21",
  release_date_precision: "day",
  total_tracks: 6,
  type: "album",
  uri: "spotify:album:4N1fROq2oeyLGAlQ1C1j18",
};
