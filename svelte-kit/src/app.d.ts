// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { TypedPocketBase, UsersResponse } from '$types/pocketbase';
import type { RecordAuthResponse } from 'pocketbase';
import type { MetaTagsProps } from 'svelte-meta-tags';

import '@poppanator/sveltekit-svg/dist/svg';
import 'unplugin-icons/types/svelte';

declare global {
  declare namespace App {
    interface Locals {
      pb: TypedPocketBase;
      user: RecordAuthResponse<UsersResponse> | null;
    }

    interface PageData {
      user: UsersResponse | null;
      seo?: MetaTagsProps;
    }

    interface Error {
      message: string;
      seo?: MetaTagsProps;
    }

    // interface Platform {}

    // interface PageState {}
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
