# Pallet that communicates with you 🗣️

Following section goes through xcNFT's errors and events to help you identify what could be causing your problems or whether you message executed successfuly.

## Pallet errors

xcNFT contains error messages, that appear when certain conditions are not met and they should inform you, what went wrong as clearly as possible.

Unclear error message? Feel free to open issue in [following repository](https://github.com/paraspell-research/xcnft-pallet).

Below is a list of errors, where you can find the specific error you are getting along with brief explanation of it:
```js
/// Error returned when collection does not exist.
CollectionDoesNotExist,

/// Error returned when NFT does not exist.
NFTDoesNotExist,

/// Error returned NFT already exist.
NFTExists,

/// Error returned when cross-chain proposal already exists.
ProposalAlreadyExists,

/// Error returned when account is not collection owner.
NotCollectionOwner,

/// Error returned when same NFT is already received.
NFTAlreadyReceived,

/// Error returned when proposal is expired and couldn't be voted on anymore.
ProposalExpired,

/// Error returned when proposal is still active, so cross-chain transfer cannot be
/// initiated.
ProposalStillActive,

/// Error returned when proposal does not exist.
ProposalDoesNotExist,

/// Error returned when proposal did not pass.
ProposalDidNotPass,

/// Error returned when user has already voted the same vote.
AlreadyVotedThis,

/// Error returned when maximum number of owners is reached.
MaxOwnersReached,

/// Error returned when user is not NFT owner.
NotNFTOwner,

/// Error returned when NFT is not received, but user wants to claim it into different
/// collection.
NFTNotReceived,

/// Error, that shouldn't happen.
NoNextCollectionId,

/// Error returned when user enters wrong origin collection id.
WrongOriginCollectionAtOrigin,
```

## Pallet events

To notify you of successful or unsuccessful (only in receiving chain) scenarios, xcNFT implements self explanatory events, that help you diagnose state of your cross-chain calls on both origin and destination Parachains.

Unclear or buggy event message? Feel free to open issue in [following repository](https://github.com/paraspell-research/xcnft-pallet).

Below is a list of events along with brief explanation:

```js
/// Event emited when an empty collection is transferred cross-chain.
CollectionTransferred {
    origin_collection_id: T::CollectionId,
    origin_collection_metadata: BoundedVec<u8, T::StringLimit>,
    destination_para_id: ParaId,
},

/// Event emited when a collection and its NFTs are transferred cross-chain.
CollectionAndNFTsTransferred {
    origin_collection_id: T::CollectionId,
    nft_ids: Vec<T::ItemId>,
    destination_para_id: ParaId,
},

/// Event emited when a collection and its NFTs with different owners are transferred
/// cross-chain.
CollectionAndNFTsDiffTransferred {
    origin_collection_id: T::CollectionId,
    nfts: Vec<(T::ItemId, AccountIdLookupOf<T>, BoundedVec<u8, T::StringLimit>)>,
    destination_para_id: ParaId,
    to_address: AccountIdLookupOf<T>,
},

/// Event emited when collection cross-chain transfer fails.
CollectionFailedToXCM {
    e: SendError,
    collection_id: T::CollectionId,
    owner: T::AccountId,
    destination: ParaId,
},

/// Event emited when collection metadata update prompt is transferred cross-chain.
CollectionMetadataSent {
    collection_id: T::CollectionId,
    proposed_data: BoundedVec<u8, T::StringLimit>,
    owner: T::AccountId,
    destination: ParaId,
},

/// Event emited when cross-chain collection metadata update prompt transfer fails.
CollectionMetadataFailedToXCM {
    e: SendError,
    collection_id: T::CollectionId,
    proposed_data: BoundedVec<u8, T::StringLimit>,
    owner: T::AccountId,
    destination: ParaId,
},

/// Event emited when cross-chain collection burn prompt transfer fails.
CollectionBurnFailedToXCM {
    e: SendError,
    collection_id: T::CollectionId,
    burn_data: GeneralizedDestroyWitness,
    owner: T::AccountId,
    destination: ParaId,
},

/// Event emited when collection burn prompt is transferred cross-chain.
CollectionBurnSent {
    collection_id: T::CollectionId,
    burn_data: GeneralizedDestroyWitness,
    owner: T::AccountId,
    destination: ParaId,
},

/// Event emited when cross-chain collection ownership change prompt transfer fails.
CollectionOwnershipFailedToXCM {
    e: SendError,
    collection_id: T::CollectionId,
    proposed_owner: AccountIdLookupOf<T>,
    destination: ParaId,
},

/// Event emited when collection ownership change prompt is transferred cross-chain.
CollectionOwnershipSent {
    collection_id: T::CollectionId,
    proposed_owner: AccountIdLookupOf<T>,
    destination: ParaId,
},

/// Event emited on destination chain, when empty collection is received.
CollectionReceived {
    origin_collection_id: T::CollectionId,
    received_collection_id: T::CollectionId,
    to_address: AccountIdLookupOf<T>,
},

/// Event emited on destination chain, when collection with NFTs is already in received
/// collections storage.
CollectionAlreadyReceived {
    origin_collection_id: T::CollectionId,
    to_address: AccountIdLookupOf<T>,
},

/// Event emited on destination chain, when empty collection fails to be created.
CollectionCreationFailed { error: DispatchError, owner: AccountIdLookupOf<T> },

/// Event emited on destination chain, when collection burn prompt fails to execute.
CollectionBurnFailed {
    error: DispatchErrorWithPostInfo<PostDispatchInfo>,
    collection_id: T::CollectionId,
    owner: AccountIdLookupOf<T>,
},

/// Event emited on destination chain, when collection metadata update prompt fails to
/// execute.
CollectionMetadataSetFailed {
    error: DispatchError,
    collection_id: T::CollectionId,
    owner: AccountIdLookupOf<T>,
},

/// Event emited on destination chain, when collection ownership change prompt fails to
/// execute.
CollectionOwnershipTransferFailed {
    error: DispatchError,
    collection_id: T::CollectionId,
    owner: AccountIdLookupOf<T>,
},

/// Event emited on destination chain, when collection and its NFT are successfuly
/// received.
CollectionWithNftsReceived {
    collection_id: T::CollectionId,
    items: Vec<(T::ItemId, BoundedVec<u8, T::StringLimit>)>,
},

/// Event emited on destination chain, when collection and its NFTs with different owners
/// are successfuly received.
CollectionWithNftsDiffOwnersReceived {
    collection_id: T::CollectionId,
    items: Vec<(T::ItemId, AccountIdLookupOf<T>, BoundedVec<u8, T::StringLimit>)>,
},

/// Event emitted when collection cross-chain transfer proposal is created (Collection
/// contains NFTs with different owners).
CollectionTransferProposalCreated {
    proposal_id: u64,
    collection_id: T::CollectionId,
    proposer: T::AccountId,
    destination: ParaId,
},

/// Event emitted when a proposal vote is registered
CrossChainPropoposalVoteRegistered { proposal_id: u64, voter: T::AccountId, vote: Vote },

/// Event emitted when proposal expired
ProposalExpired { proposal_id: u64 },

/// Event emitted when proposal did not pass
ProposalDidNotPass { proposal_id: u64 },

/// Event emitted when non-fungible asset is transferred cross-chain
NFTTransferred {
    origin_collection_id: T::CollectionId,
    origin_asset_id: T::ItemId,
    destination_para_id: ParaId,
    destination_collection_id: T::CollectionId,
    destination_asset_id: T::ItemId,
},

/// Event emitted when non-fungible asset is claimed (Its origin collection was sent
/// cross-chain to same chain).
NFTClaimed {
    collection_claimed_from: T::CollectionId,
    asset_removed: T::ItemId,
    collection_claimed_to: T::CollectionId,
    asset_claimed: T::ItemId,
},

/// Event emitted when cross-chain NFT metadata update prompt transfer fails.
NFTMetadataFailedToXCM {
    e: SendError,
    collection_id: T::CollectionId,
    asset_id: T::ItemId,
    proposed_data: BoundedVec<u8, T::StringLimit>,
    owner: T::AccountId,
    destination: ParaId,
},

/// Event emitted when NFT metadata update prompt is transferred cross-chain.
NFTMetadataSent {
    collection_id: T::CollectionId,
    asset_id: T::ItemId,
    proposed_data: BoundedVec<u8, T::StringLimit>,
    owner: T::AccountId,
    destination: ParaId,
},

/// Event emitted when cross-chain NFT burn prompt transfer fails.
NFTBurnFailedToXCM {
    e: SendError,
    collection_id: T::CollectionId,
    asset_id: T::ItemId,
    owner: T::AccountId,
    destination: ParaId,
},

/// Event emitted when NFT burn prompt is transferred cross-chain.
NFTBurnSent {
    collection_id: T::CollectionId,
    asset_id: T::ItemId,
    owner: T::AccountId,
    destination: ParaId,
},

/// Event emitted when cross-chain NFT ownership change prompt transfer fails.
NFTOwnershipFailedToXCM {
    e: SendError,
    collection_id: T::CollectionId,
    asset_id: T::ItemId,
    proposed_owner: AccountIdLookupOf<T>,
    destination: ParaId,
},

/// Event emitted when NFT ownership change prompt is transferred cross-chain.
NFTOwnershipSent {
    collection_id: T::CollectionId,
    asset_id: T::ItemId,
    proposed_owner: AccountIdLookupOf<T>,
    destination: ParaId,
},

/// Event emitted on destination chain, when NFT burn prompt fails to execute.
NFTBurnFailed {
    error: DispatchError,
    collection_id: T::CollectionId,
    asset_id: T::ItemId,
    owner: AccountIdLookupOf<T>,
},

/// Event emitted on destination chain, when NFT metadata update prompt fails to execute.
NFTMetadataSetFailed {
    error: DispatchError,
    collection_id: T::CollectionId,
    asset_id: T::ItemId,
    owner: AccountIdLookupOf<T>,
},

/// Event emitted on destination chain, when NFT ownership change prompt fails to execute.
NFTOwnershipTransferFailed {
    error: DispatchError,
    collection_id: T::CollectionId,
    asset_id: T::ItemId,
    owner: AccountIdLookupOf<T>,
},

/// Event emitted on destination chain, when NFT fails to be minted.
NFTMintFailed {
    error: DispatchError,
    collection_id: T::CollectionId,
    asset_id: T::ItemId,
    owner: AccountIdLookupOf<T>,
},

/// Event emitted on destination chain, when NFT is successfully received along with
/// metadata if provided.
NFTReceived {
    origin_collection_id: T::CollectionId,
    origin_asset_id: T::ItemId,
    received_collection_id: T::CollectionId,
    received_asset_id: T::ItemId,
    to_address: AccountIdLookupOf<T>,
},

/// Event emitted on destination chain, when received NFT is NFT that was previously sent
/// cross-chain.
NFTReturnedToOrigin {
    returned_from_collection_id: T::CollectionId,
    returned_from_asset_id: T::ItemId,
    to_address: T::AccountId,
},

/// Event emitted when collection fails to mint on destination chain
CollectionMintFailed { error: DispatchError },


//ONLY IN UNIQUES VERSION OF XCNFT
//____________________________________________
/// Event emitted when receiving collection cannot be created due to collection storage
/// being full.
CollectionListFull { owner: AccountIdLookupOf<T> },
```