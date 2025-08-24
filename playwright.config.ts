import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e', 
  timeout: 100000,
  globalSetup: require.resolve('./e2e/global-setup'),

  use: {
    headless: false,
    baseURL: 'http://localhost:4200',
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,        
    navigationTimeout: 15000 ,
    storageState : 'auth.json'

  },
});


