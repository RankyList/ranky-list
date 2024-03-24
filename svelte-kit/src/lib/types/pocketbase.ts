/**
 * This file was @generated using pocketbase-typegen
 */

import type PocketBase from 'pocketbase';
import type { RecordService } from 'pocketbase';

export enum Collections {
  Items = 'items',
  Ranks = 'ranks',
  TierLists = 'tierLists',
  Users = 'users',
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;
export type HTMLString = string;

// System fields
export type BaseSystemFields<T = never> = {
  id: RecordIdString;
  created: IsoDateString;
  updated: IsoDateString;
  collectionId: string;
  collectionName: Collections;
  expand?: T;
};

export type AuthSystemFields<T = never> = {
  email: string;
  emailVisibility: boolean;
  username: string;
  verified: boolean;
} & BaseSystemFields<T>;

// Record types for each collection

export type ItemsRecord = {
  description?: string;
  name: string;
  position?: number;
  rank?: RecordIdString;
  tierList: RecordIdString;
};

export type RanksRecord = {
  color: string;
  description?: string;
  name: string;
  position?: number;
  tierList: RecordIdString;
};

export type TierListsRecord = {
  canBeTemplate?: boolean;
  createdBy: RecordIdString;
  description?: string;
  name: string;
  public?: boolean;
  slug: string;
};

export type UsersRecord<Twebsites = unknown> = {
  avatar?: string;
  websites?: null | Twebsites;
};

// Response types include system fields and match responses from the PocketBase API
export type ItemsResponse<Texpand = unknown> = Required<ItemsRecord> & BaseSystemFields<Texpand>;
export type RanksResponse<Texpand = unknown> = Required<RanksRecord> & BaseSystemFields<Texpand>;
export type TierListsResponse<Texpand = unknown> = Required<TierListsRecord> & BaseSystemFields<Texpand>;
export type UsersResponse<Twebsites = unknown, Texpand = unknown> = Required<UsersRecord<Twebsites>> & AuthSystemFields<Texpand>;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
  items: ItemsRecord;
  ranks: RanksRecord;
  tierLists: TierListsRecord;
  users: UsersRecord;
};

export type CollectionResponses = {
  items: ItemsResponse;
  ranks: RanksResponse;
  tierLists: TierListsResponse;
  users: UsersResponse;
};

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
  collection(idOrName: 'items'): RecordService<ItemsResponse>;
  collection(idOrName: 'ranks'): RecordService<RanksResponse>;
  collection(idOrName: 'tierLists'): RecordService<TierListsResponse>;
  collection(idOrName: 'users'): RecordService<UsersResponse>;
};
