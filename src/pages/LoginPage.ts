import { BasePage } from "./BasePage";
import { Page, expect } from "@playwright/test";

export class LoginPage extends BasePage {
  readonly url = "/login";
  readonly emailInput = '[data-qa="login-email"]';
  readonly passwordInput = '[data-qa="login-password"]';
  readonly loginButton = '[data-qa="login-button"]';
  readonly loggedInUser = '//b[contains(text(),"Katrin")]';
  readonly errorText =
    "//p[contains(text(),'Your email or password is incorrect!')]";
  readonly logoutButton = "//a[@href='/logout']";

  constructor(page: Page) {
    super(page);
  }

  async login(email: string, password: string) {
    await this.gotoLogin();
    await this.page.locator(this.emailInput).fill(email);
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.locator(this.loginButton).click();
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.page.locator(this.loggedInUser)).toBeVisible();
  }

  async wrongLogin(email: string, password: string) {
    await this.gotoLogin();
    await this.page.locator(this.emailInput).fill(email);
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.locator(this.loginButton).click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async gotoLogin() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.page.locator(this.emailInput)).toBeVisible();
  }

  async logout() {
    await this.page.locator(this.logoutButton).click();
    await expect(this.page.getByText(this.loggedInUser)).toBeHidden();
  }
}
