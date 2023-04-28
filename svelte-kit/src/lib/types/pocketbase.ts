/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
  Item = 'item',
  Rank = 'rank',
  Tierlist = 'tierlist',
  Users = 'users',
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;
export type HTMLString = string;

// System fields
export type BaseSystemFields<T = never> = {
  id: RecordIdString
  created: IsoDateString
  updated: IsoDateString
  collectionId: string
  collectionName: Collections
  expand?: T
};

export type AuthSystemFields<T = never> = {
  email: string
  emailVisibility: boolean
  username: string
  verified: boolean
} & BaseSystemFields<T>;

// Record types for each collection

export type ItemRecord = {
  name: string
  description?: string
  position?: number
};

export type RankRecord = {
  name: string
  color: string
  description?: string
  position?: number
  items: RecordIdString[]
};

export type TierlistRecord = {
  name: string
  slug: string
  description?: string
  public?: boolean
  canBeTemplate?: boolean
  ranks: RecordIdString[]
};

export type UsersRecord = {
  name?: string
  avatar?: string
};

// Response types include system fields and match responses from the PocketBase API
export type ItemResponse = ItemRecord & BaseSystemFields;
export type RankResponse<Texpand = unknown> = RankRecord & BaseSystemFields<Texpand>;
export type TierlistResponse<Texpand = unknown> = TierlistRecord & BaseSystemFields<Texpand>;
export type UsersResponse = UsersRecord & AuthSystemFields;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
  item: ItemRecord
  rank: RankRecord
  tierlist: TierlistRecord
  users: UsersRecord
};

export type CollectionResponses = {
  item: ItemResponse
  rank: RankResponse
  tierlist: TierlistResponse
  users: UsersResponse
};
