# xcNFT storage structure 📦

Following section goes through xcNFT pallet storage structure.

## Proposal storage
Following storage stores important information about collections with different owners, that wish to transfer/migrate their collection to the other chain.

Storage entry example:
```js
[
  [
    [
      0 //Proposal id
    ]
    {
      proposalId: 0
      collectionId: 0
      proposedCollectionOwner: 5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY
      proposedDestinationPara: 1,000    //Specifies destination chain
      proposedDestCollectionId: null    //Specifies collection id (If provided - used only if destination chain has pallet_uniques)
      proposedDestinationConfig: null   //Specifies collection config (If provided - used only if destination chain has pallet_nfts)
      owners: [             //Specifies all nft owners
        5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy
        5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty
        5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw
        5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY
      ]
      numberOfVotes: {
        aye: [              //Specifies aye voters
          5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY
          5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty
          5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy
          5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw
        ]
        nay: []             //Specifies nay voters
      }
      endTime: 2,595        //Specifies proposal ending block
    }
  ]
]
```

## Next proposalID storage
Following storage holds incrementable proposal ID.

Storage entry example:
```
1 //Next proposal will have id 1
```

## Received collection storage

Following storage stores received collections if they contained assets during the transfer. It is then used to prove origin of collection in `asset-claim function`.


Storage entry example:
```js
[
  [
    [
      1 //Received collection id
    ]
    {
      originParaId: 1,001
      originCollectionId: 0
      receivedCollectionId: 1
    }
  ]
]
```

## Received asset storage

Following storage stores received non-fungible assets. The parameters of the storage are self explanatory.
This storage is also used to prove origin of NFT for `asset-claim function`.

Storage entry example:
```js
[
  [
    [
      [
        0 //Received collection id
        0 //Received asset id
      ]
    ]
    {
      originParaId: 1,001
      originCollectionId: 0
      originAssetId: 2
      receivedCollectionId: 0
      receivedAssetId: 0
    }
  ]
]
```

## Sent asset storage

Following storage stores sent non-fungible assets. The parameters of the storage are self explanatory. This storage is used to identify whether non-fungible asset returned to the origin chain.

Storage entry example:
```js
[
  [
    [
      [
        0 //Origin collection id
        2 //Origin asset id
      ]
    ]
    {
      originParaId: 1,001
      originCollectionId: 0
      originAssetId: 2
      destinationCollectionId: 0
      destinationAssetId: 0
    }
  ]
]
```