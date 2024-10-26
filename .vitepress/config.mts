import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "xcnft-pallet docs",
  description: "A comprehensive pallet for cross-chain NFTs on Polkadot",
  base: '/xcnft-docs/',
  head: [
    [
      'link',
      { rel: 'icon', type: 'image/x-icon',  href: 'favicon.png' }
    ]
  ],
  themeConfig: {
    logo: '/favicon.png',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Implementation', link: '/implementation-guide/introduction' },
      { text: 'User guide', link: '/user-guide/intro' }
    ],

    sidebar: [
      {
        text: 'Implementation guide',
        items: [
          { text: 'Introduction', link: '/implementation-guide/introduction' },
          { text: 'xcnft for pallet_nfts', link: '/implementation-guide/pallet-nfts' },
          { text: 'xcnft for pallet_uniques', link: '/implementation-guide/pallet-uniques' }
        ],
      },
      {
        text: 'User guide',
        items: [
          { text: 'Getting Started', link: '/user-guide/intro' },
          { text: 'Pallet storage', link: '/user-guide/storage' },
          { text: 'Pallet errors and events', link: '/user-guide/errors-events' },
          { text: 'Pallet functionality', link: '/user-guide/functions' },
        ],
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/paraspell-research/xcnft-pallet' }
    ]
  },
  ignoreDeadLinks: true
})
