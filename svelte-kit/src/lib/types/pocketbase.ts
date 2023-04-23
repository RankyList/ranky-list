/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
  Items = 'items',
  Ranks = 'ranks',
  Tierlists = 'tierlists',
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

export type ItemsRecord = {
  name: string
  description?: string
  position?: number
};

export type RanksRecord = {
  name: string
  color: string
  description?: string
  position?: number
  items?: RecordIdString[]
};

export type TierlistsRecord = {
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
export type ItemsResponse = ItemsRecord & BaseSystemFields;
export type RanksResponse<Texpand = unknown> = RanksRecord & BaseSystemFields<Texpand>;
export type TierlistsResponse<Texpand = unknown> = TierlistsRecord & BaseSystemFields<Texpand>;
export type UsersResponse = UsersRecord & AuthSystemFields;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
  items: ItemsRecord
  ranks: RanksRecord
  tierlists: TierlistsRecord
  users: UsersRecord
};

export type CollectionResponses = {
  items: ItemsResponse
  ranks: RanksResponse
  tierlists: TierlistsResponse
  users: UsersResponse
};
