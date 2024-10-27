# Dive into undivided world of NFTs 🏊

Following section of docs explains functions that are available in pallet NFTs, and the outcomes they have when executed successfuly.

## collection_x_transfer
Transfer a Collection along with its associated metadata / assets to another parachain.

Origin must be Signed and the signing account must be :
- the Owner of the `Collection`;

On success emits `CollectionTransferred` or `CollectionAndNFTsTransferred`.

Required parameters:
```js
origin: OriginFor<T>, //Origin signer of the transaction
origin_collection: T::CollectionId, //The collection_id of the collection to be transferred.
dest_collection_id: Option<T::CollectionId>, //Destination collection ID - only used in Uniques pallet if provided
destination_para: ParaId, //The destination chain ID to which collection is transferred.
config: Option<CollectionConfigFor<T, I>>, //If pallet_nfts, and provided, then function will assign provided config
```

## collection_x_transfer_vote
Cast a vote on collection cross-chain transfer.

Origin must be Signed and the signing account must be :
- the Owner of the `Asset` or `Collection`;

On success emits `CrossChainPropoposalVoteRegistered`.

Required parameters:
```js
origin: OriginFor<T>, //Origin signer of the transaction
proposal_id: u64, //The cross-chain proposal ID.
actual_vote: Vote, //Enum type - either Aye or Nay.
```

## collection_x_transfer_initiate
Transfer a Collection along with its associated metadata & assets owned by different owners to another parachain.

Origin must be Signed and the signing account must be :
- the Owner of the `Collection`;

Prereqiuisites:
- Collection must be associated with proposal that has passed.

On success emits `CollectionAndNFTsDiffTransferred`.

Required parameters:
```js
origin: OriginFor<T>, //Origin signer of the transaction
proposal_id: u64, //The cross-chain proposal ID.
```

## nft_x_transfer
Transfer an asset along with associated metadata to another parachain.

Origin must be Signed and the signing account must be :
- the Owner of the `Asset`;

On success emits `NFTTransferred`.

Required parameters:
```js
origin: OriginFor<T>, //Origin signer of the transaction
origin_collection: T::CollectionId, //The collection_id of the collection to be transferred.
origin_asset: T::ItemId, //The asset_id of the asset to be transferred.
destination_para: ParaId, //The destination chain ID to which collection is transferred.
destination_collection: T::CollectionId, //The collection_id of the collection that the asset have to be received into.
destination_asset: T::ItemId, //The asset_id of the asset to be received.
```

## nft_x_claim
Claim cross-chain sent asset if its origin collection was also sent to same destination chain.

Origin must be Signed and the signing account must be :
- the Owner of the asset in the `Current collection` and owner of the asset in the `Origin collection`;

On success emits `NFTClaimed`.

Required parameters:
```js
origin: OriginFor<T>, //Origin signer of the transaction
origin_collection_at_destination: T::CollectionId, //The collection_id at the destination of the collection that was transferred (Id it has at destination chain).
origin_collection_at_origin: T::CollectionId, //The origin collection_id of the collection that was transferred (Id it had at origin chain).
origin_asset_at_destination: T::ItemId, //The origin asset id at the origin collection that is delivered.
current_collection: T::CollectionId, //The collection_id of the collection that the asset have been delivered into.
current_asset: T::ItemId, //The current asset_id of the asset in current collection.
```

## collection_x_update
Update collection metadata cross-chain.

Origin must be Signed and the signing account must be :
- the Owner of the `destination collection`;

On success emits `CollectionMetadataSent`.

Required parameters:
```js
origin: OriginFor<T>, //Origin signer of the transaction
destination_collection_id: T::CollectionId, //The collection_id at the destination.
destination_para: ParaId, //The recipient parachain ID.
data: BoundedVec<u8, T::StringLimit>, //The metadata to be added to destination collection.
```

## nft_x_update
Update NFT metadata cross-chain.

Origin must be Signed and the signing account must be :
- the Owner of the `destination collection`;

On success emits `NFTMetadataSent`.

Required parameters:
```js
origin: OriginFor<T>, //Origin signer of the transaction
destination_collection_id: T::CollectionId, // The collection_id at the destination.
destination_asset_id: T::ItemId, //The asset_id at the destination.
destination_para: ParaId, //The recipient parachain ID.
data: BoundedVec<u8, T::StringLimit>, //The metadata to be added to destination collection.
```

## collection_x_burn
Prompt to burn empty collection cross-chain.

Origin must be Signed and the signing account must be :
- the Owner of the `destination collection`;

On success emits `CollectionBurnSent`.

Required parameters:
```js
origin: OriginFor<T>, //Origin signer of the transaction
destination_collection_id: T::CollectionId, //The collection_id at the destination.
destination_para: ParaId, //The recipient parachain ID.
witnes_data: GeneralizedDestroyWitness, // The amount of NFTs, metadatas and configs in the collection (Needs to be all zeros for successful burn).
```

## nft_x_burn
Prompt to burn NFT cross-chain.

Origin must be Signed and the signing account must be :
- the Owner of the `destination NFT`;

On success emits `NFTBurnSent`.

Required parameters:
```js
origin: OriginFor<T>, //Origin signer of the transaction
destination_collection_id: T::CollectionId, //The collection_id at the destination.
destination_asset_id: T::ItemId, //The asset_id at the destination.
destination_para: ParaId, //The recipient parachain ID.
```

## collection_x_change_owner
Prompt to change collection owner cross-chain.

Origin must be Signed and the signing account must be :
- the Owner of the `destination collection`;
- the New owner must agree to the ownership change by executing function setAcceptOwnership(maybeCollection)

On success emits `CollectionOwnershipSent`.

Required parameters:
```js
origin: OriginFor<T>, //Origin signer of the transaction
destination_collection_id: T::CollectionId, //The collection_id at the destination.
destination_para: ParaId, //The recipient parachain ID.
destination_account: AccountIdLookupOf<T>, //The destination account that will receive collection.
```

## nft_x_change_owner
Prompt to change NFT owner cross-chain.

Origin must be Signed and the signing account must be :
- the Owner of the `destination asset`;

On success emits `NFTOwnershipSent`.

Required parameters:
```js
origin: OriginFor<T>, //Origin signer of the transaction
destination_collection_id: T::CollectionId, //The collection_id at the destination.
destination_asset_id: T::ItemId, //The asset_id at the destination.
destination_para: ParaId, //The recipient parachain ID.
destination_account: AccountIdLookupOf<T>, //The destination account that will receive collection.
```

## parse_collection_empty
Receive function for collection_x_transfer function. Shouldn't be used as a regular call. On success emits `CollectionReceived`.

Required parameters:
```js
origin: OriginFor<T>,  //Origin signer of the transaction
origin_collection: T::CollectionId, //Origin chain collection ID
destination_collection: Option<T::CollectionId>,  //Destination collection ID - only used in Uniques pallet if provided
collection_metadata: BoundedVec<u8, T::StringLimit>, //Metadata of the collection
config: Option<CollectionConfigFor<T, I>>, //If pallet_nfts, and provided, then function will assign provided config
```

## parse_collection_burn
Receive function for collection_x_burn function. Doesn't differ from nfts pallet destroy function. On success emits regular destroy function events.

Required parameters:
```js
origin: OriginFor<T>, //Origin signer of the transaction
collection_to_burn: T::CollectionId, //CollectionID where asset is located
witness_data: GeneralizedDestroyWitness, //xcNFT specific destroy witness, same as pallet_nfts or pallet_uniques destroy witness
```

## parse_collection_metadata
Receive function for collection_x_update function. Doesn't differ from nfts pallet setCollectionMetadara function. On success emits regular setCollectionMetadata function events.

Required parameters:
```js
origin: OriginFor<T>, //Origin signer of the transaction
collection: T::CollectionId, //CollectionID where asset is located
data: BoundedVec<u8, T::StringLimit>, //Collection metadata
```

## parse_collection_owner
Receive function for collection_x_change_owner function. Doesn't differ from nfts pallet transferOwnership function. On success emits regular transferOwnership function events.

Required parameters:
```js
origin: OriginFor<T>, //Origin signer of the transaction
new_owner: AccountIdLookupOf<T>, //The receiving owner (They have to setAcceptCollectionOwnership first!)
collection: T::CollectionId, //CollectionID where asset is located
```

## parse_nft_burn
Receive function for nft_x_burn function. Doesn't differ from nfts pallet burn function. On success emits regular burn function events.

Required parameters:
```js
origin: OriginFor<T>, //Origin signer of the transaction
collection: T::CollectionId, //CollectionID where asset is located
item: T::ItemId, //Item id where asset is located
```

## parse_nft_metadata
Receive function for  nft_x_update function. Doesn't differ from nfts pallet setMetadata function. On success emits regular setMetadata function events.

Required parameters:
```js
origin: OriginFor<T>, //Origin signer of the transaction
collection: T::CollectionId, //CollectionID where asset is located
item: T::ItemId, //Item id where asset is located
data: BoundedVec<u8, T::StringLimit>, //Asset metadata
```
## parse_nft_owner
Receive function for  nft_x_change_owner function. Doesn't differ from nfts pallet transfer function. On success emits regular transfer function events.

Required parameters: 
```js
origin: OriginFor<T>, //Origin signer of the transaction
new_owner: AccountIdLookupOf<T>,    //New owner of the asset
collection: T::CollectionId,    //CollectionID where asset is located
item: T::ItemId,    //Item id where asset is located
```
## parse_nft_transfer
Receive function for  nft_x_transfer function. This call can be, but shouldn't be used as a regular call. On success emits `NFTReceived` or `NFTReturnedToOrigin` events.

Required parameters: 
```js
origin: OriginFor<T>, //Origin signer of the transaction
collection: T::CollectionId,    //Collection to which NFT will be minted
item: T::ItemId,    //Item id to which NFT will be minted
data: BoundedVec<u8, T::StringLimit>, //Item metadata
origin_collection: T::CollectionId, //Original chain collection ID
origin_item: T::ItemId, //Original chain asset ID
origin_chain: ParaId,   //Original chain ID
```

## parse_collection_same_owner
Receive function for  collection_x_transfer function. Used when collection has nfts, but they are owned by the same owner.
This call can be, but shouldn't be used as a regular call. On success emits `CollectionWithNftsReceived` event.

Required parameters: 
```js
origin: OriginFor<T>,   //Origin signer of the transaction
config: Option<CollectionConfigFor<T, I>>, //If pallet_nfts, and provided, then function will assign provided config
collection_metadata: BoundedVec<u8, T::StringLimit>,    //Metadata of the collection
nfts: Vec<(T::ItemId, AccountIdLookupOf<T>, BoundedVec<u8, T::StringLimit>)>,   //Nfts of the collections along with their IDs and owners in vector
origin_para: ParaId,    //Parachain ID, where collection comes from
origin_collection_id: T::CollectionId,  //Original collection ID
dest_collection_id: Option<T::CollectionId>,    //Destination collection ID - only used in Uniques pallet if provided
```

## parse_collection_diff_owners
Receive function for  collection_x_transfer_initiate function. Used when collection has nfts, but they are not owned by the same owner. This call can be, but shouldn't be used as a regular call. On success emits `CollectionWithNftsDiffOwnersReceived` event.

Required parameters: 
```js
origin: OriginFor<T>,   //Origin signer of the transaction
config: Option<CollectionConfigFor<T, I>>, //If pallet_nfts, and provided, then function will assign provided config
collection_metadata: BoundedVec<u8, T::StringLimit>,    //Metadata of the collection
nfts: Vec<(T::ItemId, AccountIdLookupOf<T>, BoundedVec<u8, T::StringLimit>)>,   //Nfts of the collections along with their IDs and owners in vector
origin_para: ParaId,    //Parachain ID, where collection comes from
origin_collection_id: T::CollectionId,  //Original collection ID
dest_collection_id: Option<T::CollectionId>,    //Destination collection ID - only used in Uniques pallet if provided
```