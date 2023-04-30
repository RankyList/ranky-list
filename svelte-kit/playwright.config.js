import path from 'path';
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: path.join(process.cwd(), 'tests'),
  testMatch: /.*.ts/,
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
});
