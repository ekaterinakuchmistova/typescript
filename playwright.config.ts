import { defineConfig, devices } from "@playwright/test";
import { generateSlackReport } from "./playwrightSlackLayout";
require("dotenv").config();

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 60000,
  //testDir: "./src/tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    //["list", { printSteps: true }],
    ["line"],
    ["html"],
    //['@estruyf/github-actions-reporter'],
    // [
    //   "playwright-qase-reporter",
    //   {
    //     testops: {
    //       api: {
    //         token: process.env.qaseAuthToken,
    //       },
    //       project: "DEMO",
    //       uploadAttachments: true,
    //       run: {
    //         complete: true,
    //       },
    //     },
    //   },
    // ],
    //  [
    //     './node_modules/playwright-slack-report/dist/src/SlackReporter.js',
    //     {
    //       channels: ['autotests'], // provide one or more Slack channels
    //       sendResults: 'always', // "always" , "on-failure", "off"
    //       slackOAuthToken: process.env.slackAuthToken,
    //       layout: generateSlackReport,
    //       meta: [
    //         {
    //           key: 'Report URL',
    //           value: `<${process.env.reportUrl}|View Report>`,
    //         },
    //       ],
    //       attachments: true, // включить вложения
    //     },
    //   ]
  ], // change to 'on-failure' for local testing
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    screenshot: "on",
    video: "on",
    headless: false,
    navigationTimeout: 60000,
    baseURL: "https://automationexercise.com",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      testDir: "./src/tests",
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
