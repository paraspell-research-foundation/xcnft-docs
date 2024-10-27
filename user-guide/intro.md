# Pallet agnostic cross-chain sharing of NFTs on Polkadot no longer only myth 🧚

Welcome brave adventurer, this section of documentation will do it's best to introduce you to world of cross-chain NFTs on Polkadot.

### ⚠️ Before we dive into specific details about xcNFT here are some things to note:

- Make sure to provide optional parameters if possible.
- Before doing any transfers, check the destination chain and confirm, that the receiving details are correct, the incorrect details could lead to asset being permanently lost.
- We advise not to transfer collections with different owners from pallet_nfts to pallet_uniques, because pallet_uniques requires collection ID parameter to be provided when creating collection. There could be collection with mentioned ID created while the proposal is still active, which could lead to collection and asset loss (This is to be changed once collection ID parameter is implemented as incrementable in pallet_uniques).
- Make sure to have enough native balance in the destination chain, otherwise your assets will be lost.


### 🔜 Future work for xcNFT

The xcNFT is under active development, so here are features you can expect:

- Fail safe for transfers from pallet_nfts to pallet_uniques when it comes to collection with different owners which requires proposal to pass first.
- Light version of proposal to be stored on chain for users to find where their collection migrate in case, that they did not notice voting or weren't reminded by other asset holders
- Asset and collection traps to recover assets that contained mistaken delivery information
- Reserve transfer based (chains do not need to trust each other) transfers rather than transact based (Chains have to trust each other)
- Further generalization for implementations with different Asset ID types (For example u128 instead of u32)
- Making parse functions not exposed for use