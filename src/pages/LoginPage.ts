import { BasePage } from "./BasePage";
import { Page, expect } from "@playwright/test";

export class LoginPage extends BasePage {
  readonly url = "/login";
  readonly emailInput = this.page.locator('[data-qa="login-email"]');
  readonly passwordInput = this.page.locator('[data-qa="login-password"]');
  readonly loginButton = this.page.locator('[data-qa="login-button"]');
  readonly loggedInUser = this.page.locator('//b[contains(text(),"Katrin")]');
  readonly errorText =
    this.page.locator("//p[contains(text(),'Your email or password is incorrect!')]");
  readonly logoutButton = this.page.locator("//a[@href='/logout']");

  constructor(page: Page) {
    super(page);
  }

  async login(email: string, password: string) {
    await this.gotoLogin();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.loggedInUser).toBeVisible();
  }

  async wrongLogin(email: string, password: string) {
    await this.gotoLogin();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async gotoLogin() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.emailInput).toBeVisible();
  }

  async logout() {
    await this.logoutButton.click();
    await expect(this.loggedInUser).toBeHidden();
  }
}
