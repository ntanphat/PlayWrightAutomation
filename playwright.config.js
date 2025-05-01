// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'console';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests', //what test case to run
  retries: 2,
  timeout: 30 * 1000, //timeout for loading
  expect: { timeout: 5000}, //timeout for assertion
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: true, //run with browser display or not
    screenshot: 'on',
    trace: 'on'
    //trace: 'retain-on-failure' //trace failed test only
  },
});

module.exports = config;

