import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';

import type { AuthWindow } from '$types/auth/window';

import { browser } from '$app/environment';
import { invalidateAll } from '$app/navigation';

export const AUTH_WINDOW_CONTEXT_KEY = 'auth-window';

const createAuthWindow = () => {
  let timeout: number | null = null;

  const authWindow = writable<AuthWindow>(
    {
      window: null,
      opened: false,
    },
    () => {
      return () => {
        if (browser && timeout) {
          window.clearTimeout(timeout);
          timeout = null;
        }
      };
    },
  );
  const { subscribe, update } = authWindow;

  const processTimeout = () => {
    if (!browser) {
      return;
    }

    timeout = window.setTimeout(() => {
      update((state) => {
        if (!browser || !state.window) {
          return {
            ...state,
            opened: false,
          };
        }

        const isClosed = state.window.closed;

        if (isClosed) {
          invalidateAll();

          if (timeout) {
            window.clearTimeout(timeout);
            timeout = null;
          }
        } else {
          processTimeout();
        }

        return {
          window: isClosed ? null : state.window,
          opened: !isClosed,
        };
      });
    }, 500);
  };

  return {
    subscribe,
    /**
     * Opens a new auth window with the given URL.
     *
     * @param url - The URL to open in the auth window.
     * @returns Whether the auth window has been successfully opened.
     */
    open: (url: string) => {
      try {
        if (!browser || window.opener) {
          return false;
        }

        let hasOpened = false;

        update((state) => {
          if (state.opened) {
            hasOpened = false;

            return state;
          }

          if (timeout) {
            window.clearTimeout(timeout);
            timeout = null;
          }

          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;

          let width = 1024;
          let height = 768;

          width = width > windowWidth ? windowWidth : width;
          height = height > windowHeight ? windowHeight : height;

          const left = windowWidth / 2 - width / 2;
          const top = windowHeight / 2 - height / 2;

          const newAuthWindow = window.open(
            url,
            'rankylist_oauth2_popup',
            `width=${width},height=${height},top=${top},left=${left},resizable,menubar=no`,
          );

          hasOpened = newAuthWindow ? !newAuthWindow.closed : false;

          return {
            window: newAuthWindow,
            opened: hasOpened,
          };
        });

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (hasOpened) {
          processTimeout();
        }

        return hasOpened;
      } catch (_) {
        return false;
      }
    },
    /**
     * Close the auth window.
     *
     * @param withInvalidate - Whether to invalidate all `load` functions after closing the auth window.
     * @returns Whether the auth window has been successfully closed.
     */
    close: (withInvalidate = false) => {
      try {
        if (!browser || window.opener) {
          return false;
        }

        let hasClosed = false;

        update((state) => {
          if (!state.window || !state.opened) {
            hasClosed = false;

            return state;
          }

          state.window.close();

          if (timeout) {
            window.clearTimeout(timeout);
            timeout = null;
          }

          hasClosed = true;

          if (withInvalidate) {
            invalidateAll();
          }

          return {
            window: null,
            opened: false,
          };
        });

        return hasClosed;
      } catch (_) {
        return false;
      }
    },
    /**
     * Detaches the auth window from the store. This is useful when the auth window is opened in a new tab or window.
     *
     * @param withInvalidate - Whether to invalidate all `load` functions after detaching the auth window.
     * @returns Whether the auth window has been successfully detached.
     */
    detach: (withInvalidate = false) => {
      try {
        if (!browser) {
          return false;
        }

        let hasDetached = false;

        update((state) => {
          if (!state.window) {
            hasDetached = false;

            return state;
          }

          if (timeout) {
            window.clearTimeout(timeout);
            timeout = null;
          }

          hasDetached = true;

          if (withInvalidate) {
            invalidateAll();
          }

          return {
            window: null,
            opened: false,
          };
        });

        return hasDetached;
      } catch (_) {
        return false;
      }
    },
  };
};

export type AuthWindowStore = ReturnType<typeof createAuthWindow>;

/**
 * Initializes the auth window store. This is mandatory when using SSR (see https://github.com/sveltejs/kit/discussions/4339).
 */
export const initializeAuthWindowStore = () => {
  const authWindowStore = createAuthWindow();

  setContext<AuthWindowStore>(AUTH_WINDOW_CONTEXT_KEY, authWindowStore);
};

/**
 * Returns the auth window store. Make sure to call "initializeAuthWindowStore" before using it.
 */
export const getAuthWindowStore = () => {
  const authWindowStore = getContext<AuthWindowStore | undefined>(AUTH_WINDOW_CONTEXT_KEY);

  if (!authWindowStore) {
    throw new Error(`Store "${AUTH_WINDOW_CONTEXT_KEY}" is not initialized. Make sure to call "initializeAuthWindowStore" before using it.`);
  }

  return authWindowStore;
};
