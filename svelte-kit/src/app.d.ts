// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { UsersResponse } from '$types/pocketbase';
import type PocketBase, { AuthMethodsList, RecordAuthResponse } from 'pocketbase';

declare global {
  // and what to do when importing types
  declare namespace App {
    interface Locals {
      pb: PocketBase;
      user: RecordAuthResponse<UsersResponse> | null;
      authProviders: AuthMethodsList;
    }

    interface PageData {
      user: UsersResponse | null;
    }

    // interface Error {}

    // interface Platform {}
  }

  declare module '*.svg?component' {
    import type { ComponentType, SvelteComponentTyped } from 'svelte';
    import type { SVGAttributes } from 'svelte/elements';

    const content: ComponentType<SvelteComponentTyped<SVGAttributes<SVGSVGElement>>>;

    export default content;
  }

  declare module '*.svg?src' {
    const content: string;

    export default content;
  }

  declare module '*.svg?url' {
    const content: string;

    export default content;
  }

  declare module '*.svg?dataurl' {
    const content: string;

    export default content;
  }
}
