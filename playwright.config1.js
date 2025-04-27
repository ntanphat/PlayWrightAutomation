// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'console';
import { permission } from 'process';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests', //what test case to run
  retries: 1,
  //workers: 1, //disable running parralel
  workers: 3, //disable running parralel
  timeout: 30 * 1000, //timeout for loading
  expect: { timeout: 5000}, //timeout for assertion
  reporter: 'html',
  projects:[
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: false, //run with browser display or not
        screenshot: 'on',
        trace: 'on',
        //trace: 'retain-on-failure' //trace failed test only
        ...devices['iPhone 11']
      }
    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false, //run with browser display or not
        screenshot: 'on',
        trace: 'on',
        ignoreHttpsErrors: true, //google SSL certificate (https) error
        permission: ['geolocation'],
        video: 'retain-on-failure',
        //trace: 'retain-on-failure' //trace failed test only
        //viewport:{width:720, height:720},
        //...devices['Galaxy S III landscape']
      }
    }
  ]
});

module.exports = config;

