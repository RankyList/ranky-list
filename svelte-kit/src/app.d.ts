// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

// and what to do when importing types
declare namespace App {
  // interface Locals {}
  // interface PageData {}
  // interface Error {}
  // interface Platform {}
}

declare module 'svelte-lazy' {
  import type { ComponentProps, ComponentType, SvelteComponentTyped } from 'svelte';

  import Placeholder from '$src/lib/component/util/Placeholder.svelte';

  interface FadeOption {
    delay?: number;
    duration?: number;
  }

  interface Lazy {
    height?: number | string = 0;
    offset?: number = 150;
    placeholder?: string | ComponentType<Placeholder> | null = null;
    placeholderProps?: ComponentProps<Placeholder> | null = null;
    class?: string = '';
    fadeOption?: FadeOption | null = {
      delay: 0,
      duration: 400,
    };
    onload?: ((node: Node) => void) | null = null;
    resetHeightDelay?: number = 0;
  }

  const content: ComponentType<SvelteComponentTyped<Lazy>>;

  export default content;
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
