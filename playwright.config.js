// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests', //what test case to run
  timeout: 40 * 1000, //timeout for loading
  expect: { timeout: 40_000}, //timeout for assertion
  reporter: 'html',
  use: {
    browserName: 'chromium'
  },
});

module.exports = config;

