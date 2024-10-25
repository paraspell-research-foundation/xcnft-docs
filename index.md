---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "xcNFT"
  text: "Solution for scalable cross-chain and pallet agnostic NFT transactions"
  tagline: One pallet, endless NFT possibilities
  actions:
    - theme: brand
      text: NFTs implementation
      link: /markdown-examples
    - theme: alt
      text: Uniques implementation
      link: /api-examples

features:
  - title: Pallet agnostic
    details:  xcNFT supports cross-chain transfers between chains with different NFT pallet implementation
  - title: Generalized
    details: Pre-configure special pallet specific types within cross-chain call.
  - title: Fully compatible with frame
    details: xcNFT versions implement either original pallet_nfts or pallet_uniques
---

