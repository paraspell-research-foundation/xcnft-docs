import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "xcnft-pallet documentation",
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
      { text: 'Implementation', link: '/markdown-examples' },
      { text: 'User guide', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/paraspell-research/xcnft-pallet' }
    ]
  },
  ignoreDeadLinks: true
})
