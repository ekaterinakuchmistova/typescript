import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  async clickSignUp() {
    await this.page.click('a[href="/signup"]');
  }
}