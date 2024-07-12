import { BasePage } from "./BasePage";
import test, { Page, expect } from "@playwright/test";
import { LoginPage } from "./LoginPage";

export class SignupPage extends BasePage {
  readonly loginPage = new LoginPage(this.page);
  readonly createAccountBtn = this.page.locator('[data-qa="create-account"]');

  readonly registrationForm = {
    name: this.page.locator('[data-qa="signup-name"]'),
    email: this.page.locator('[data-qa="signup-email"]'),
    password: this.page.locator('[data-qa="signup-password"]'),
    signupButton: this.page.locator('[data-qa="signup-button"]'),
  };

  readonly accountInformation = {
    idGenderMrs: this.page.locator('[for="id_gender2"]'),
    idGenderMr: this.page.locator('[for="id_gender1"]'),
    name: this.page.locator('[data-qa="name"]'),
    emailForm: this.page.locator('[data-qa="email"]'),
    passwordForm: this.page.locator('[data-qa="password"]'),
    newsletterCheckbox: this.page.locator("#newsletter"),
    option: this.page.locator("#optin"),
    dayOfBirth: this.page.locator('[data-qa="days"]'),
    monthOfBirth: this.page.locator('[data-qa="months"]'),
    yearOfBirth: this.page.locator('[data-qa="years"]'),
  };

  readonly addressInformation = {
    firstName: this.page.locator('[data-qa="first_name"]'),
    lastName: this.page.locator('[data-qa="last_name"]'),
    company: this.page.locator('[data-qa="company"]'),
    address: this.page.locator('[data-qa="address"]'),
    address2: this.page.locator('[data-qa="address2"]'),
    country: this.page.locator('[data-qa="country"]'),
    state: this.page.locator('[data-qa="state"]'),
    city: this.page.locator('[data-qa="city"]'),
    zipcode: this.page.locator('[data-qa="zipcode"]'),
    mobileNumber: this.page.locator('[data-qa="mobile_number"]'),
  };

  readonly accountCreationSuccessMessage = {
    message: this.page.locator('[data-qa="account-created"]'),
    continueButton: this.page.locator('[data-qa="continue-button"]'),
  }

  constructor(page: Page) {
    super(page);
  }

  async createNewUserWithRandomEmail() {
    const randomEmail = `test${Date.now()}@gmail.com`;
    const randomPassword = `pass${Date.now()}@gmail.com`;

    await test.step("Create new user", async () => {
        await this.createNewUser(randomEmail, randomPassword);
    });

    await test.step("Wait for page load", async () => {
        await this.page.waitForLoadState("domcontentloaded");
    });

    await test.step("Fill account information", async () => {
        await this.fillAccountInformation(randomEmail, randomPassword);
    });

    await test.step("Fill address information", async () => {
        await this.fillAddressInformation(
            "John",
            "Doe",
            "Company",
            "Address",
            "Address2",
            "Canada",
            "cd Canada",
            "Canadaline",
            "724800",
            "096445653356"
        );
    });

    await test.step("Click create account button", async () => {
        await this.createAccountBtn.click();
    });

    await test.step("Wait for account creation success message", async () => {
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.accountCreationSuccessMessage.message).toHaveText("Account Created!");
    });

    await test.step("Click continue button", async () => {
        await this.accountCreationSuccessMessage.continueButton.click();
        await this.page.waitForLoadState("domcontentloaded");
    });

    return { randomEmail, randomPassword };
}

async createNewUser(email: string, password: string) {
  await test.step("Go to login page", async () => {
      await this.loginPage.gotoLogin();
  });

  await test.step("Fill registration form", async () => {
      await this.registrationForm.name.fill(email);
      await this.registrationForm.email.fill(password);
  });

  await test.step("Click signup button", async () => {
      await this.registrationForm.signupButton.click();
  });

  await test.step("Wait for page load", async () => {
      await this.page.waitForLoadState("domcontentloaded");
  });
}

async fillAccountInformation(name: string, password: string) {
  await test.step("Select gender", async () => {
      await this.accountInformation.idGenderMrs.click();
  });

  await test.step("Fill name", async () => {
      await this.accountInformation.name.fill(name);
  });

  await test.step("Fill password", async () => {
      await this.accountInformation.passwordForm.fill(password);
  });

  await test.step("Check newsletter checkbox", async () => {
      await this.accountInformation.newsletterCheckbox.check();
  });

  await test.step("Check option checkbox", async () => {
      await this.accountInformation.option.check();
  });

  await test.step("Select day of birth", async () => {
      await this.accountInformation.dayOfBirth.selectOption({ value: "1" });
  });

  await test.step("Select month of birth", async () => {
      await this.accountInformation.monthOfBirth.selectOption({ value: "1" });
  });

  await test.step("Select year of birth", async () => {
      await this.accountInformation.yearOfBirth.selectOption({ value: "2000" });
  });
}

async fillAddressInformation(
  firstName: string,
  lastName: string,
  company: string,
  address: string,
  address2: string,
  country: string,
  state: string,
  city: string,
  zipcode: string,
  mobileNumber: string
) {
  await test.step("Fill first name", async () => {
      await this.addressInformation.firstName.fill(firstName);
  });

  await test.step("Fill last name", async () => {
      await this.addressInformation.lastName.fill(lastName);
  });

  await test.step("Fill company", async () => {
      await this.addressInformation.company.fill(company);
  });

  await test.step("Fill address", async () => {
      await this.addressInformation.address.fill(address);
  });

  await test.step("Fill address2", async () => {
      await this.addressInformation.address2.fill(address2);
  });

  await test.step("Select country", async () => {
      await this.addressInformation.country.selectOption({ value: country });
  });

  await test.step("Fill state", async () => {
      await this.addressInformation.state.fill(state);
  });

  await test.step("Fill city", async () => {
      await this.addressInformation.city.fill(city);
  });

  await test.step("Fill zipcode", async () => {
      await this.addressInformation.zipcode.fill(zipcode);
  });

  await test.step("Fill mobile number", async () => {
      await this.addressInformation.mobileNumber.fill(mobileNumber);
  });
}
}
