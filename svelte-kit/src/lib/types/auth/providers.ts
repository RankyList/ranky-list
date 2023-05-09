import type { ComponentType } from 'svelte';

export type AuthProviderState = {
  name: string;
  authUrl: string;
};

export type AuthProviderInfo = {
  displayName: string;
  icon: ComponentType;
};

export type AuthProvider = AuthProviderState & AuthProviderInfo;
