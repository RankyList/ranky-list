// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { UsersResponse } from '$types/pocketbase';
import type PocketBase, { RecordAuthResponse } from 'pocketbase';

import '@poppanator/sveltekit-svg/dist/svg';

declare global {
  // and what to do when importing types
  declare namespace App {
    interface Locals {
      pb: PocketBase;
      user: RecordAuthResponse<UsersResponse> | null;
    }

    interface PageData {
      user: UsersResponse | null;
    }

    // interface Error {}

    // interface Platform {}
  }
}
