import { test, expect } from "@playwright/test";
import { qase } from "playwright-qase-reporter";
import { HomePage } from "../pages/HomePage";

test.describe("Home Page Tests", () => {
  test("should display the correct title", async ({ page }) => {
    qase.id(1);
    const homePage = new HomePage(page);
    await homePage.goto("https://automationexercise.com");
    const title = await homePage.getTitle();
    expect(title).toBe("Automation Exere");
  });
});
