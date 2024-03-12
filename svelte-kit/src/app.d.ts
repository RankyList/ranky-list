// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { UsersResponse } from '$types/pocketbase';
import type PocketBase, { RecordAuthResponse } from 'pocketbase';

import '@poppanator/sveltekit-svg/dist/svg';
import 'unplugin-icons/types/svelte';

declare global {
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

  interface ViewTransition {
    updateCallbackDone: Promise<void>;
    ready: Promise<void>;
    finished: Promise<void>;
    skipTransition: () => void;
  }

  interface Document {
    startViewTransition(updateCallback: () => Promise<void>): ViewTransition;
  }
}
