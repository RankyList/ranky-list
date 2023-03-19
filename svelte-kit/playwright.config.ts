import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  webServer: {
    command: 'yarn build && yarn preview',
    ignoreHTTPSErrors: true,
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI
  },
  use: {
    headless: true,
    baseURL: 'http://localhost:4173',
    screenshot: 'only-on-failure'
  },
};

export default config;
