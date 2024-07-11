import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

// | Number | Test Case Description                     | Email                 | Password                                 | Expected Result                                                                           | Type              |
// |--------|-------------------------------------------|-----------------------|------------------------------------------|-------------------------------------------------------------------------------------------|-------------------|
// | 1      | Correct email and password                | Katrin@gmail.com      | Sample1234                               | Successful login, logged user is displayed                                                | Equivalence       |
// | 2      | Incorrect email                           | wrong@example.com     | Sample1234                               | Error "Your email or password is incorrect!"                                              | Equivalence       |
// | 3      | Incorrect password                        | Katrin@gmail.com      | wrongpassword                            | Error "Your email or password is incorrect!"                                              | Equivalence       |
// | 4      | Empty email                               |                       | Sample1234                               | Error "Please fill out this field."                                                       | Boundary          |
// | 5      | Empty password                            | Katrin@gmail.com      |                                          | Error "Please fill out this field."                                                       | Boundary          |
// | 6      | Minimum length email                      | a@b.c                 | Sample1234                               | Error "Your email or password is incorrect!"                                              | Boundary          |
// | 7      | Minimum length password                   | Katrin@gmail.com      | a                                        | Error "Your email or password is incorrect!"                                              | Boundary          |
// | 8      | Maximum length email                      | aaaaaaa...@example.com| ValidPass123                             | Error "Your email or password is incorrect!"                                              | Boundary          |
// | 9      | Maximum length password                   | Katrin@gmail.com      | aaaaaaaa...                              | Error "Your email or password is incorrect!"                                              | Boundary          |
// | 10     | Email with special characters             | valid!@#$%example.com | ValidPass123                             | Error "A part following '@' should not contain the symbol '#'."                           | Equivalence       |
// | 11     | Password with special characters          | Katrin@gmail.com      | Valid!@#$                                | Error "Your email or password is incorrect!"                                              | Equivalence       |
// | 12     | Email with spaces                         | Katrin @gmail.com     | Sample1234                               | Error "A part followed by '@' should not contain the symbol ' '."                         | Equivalence       |
// | 13     | Password with spaces                      | Katrin@gmail.com      | Valid Pass123                            | Error "Your email or password is incorrect!"                                              | Equivalence       |
// | 14     | Email without "@" symbol                  | validexample.com      | ValidPass123                             | Error "Please include an '@' in the email address. 'validexample.com' is missing an '@'." | Equivalence       |
// | 15     | Email without domain                      | valid@                | ValidPass123                             | Error "Please enter a part following '@'. 'valid@' is incomplete."                        | Equivalence       |

const successfulLogins = [
  {
    number: 1,
    description: "Correct email and password",
    email: "Katrin@gmail.com",
    password: "Sample1234",
  },
];

const failedLogins = [
  {
    number: 2,
    description: "Incorrect email",
    email: "wrong@example.com",
    password: "Sample1234",
    expectedResult: "Your email or password is incorrect!",
  },
  {
    number: 3,
    description: "Incorrect password",
    email: "Katrin@gmail.com",
    password: "wrongpassword",
    expectedResult: "Your email or password is incorrect!",
  },
  {
    number: 4,
    description: "Empty email",
    email: "",
    password: "Sample1234",
    expectedResult: "Please fill out this field.",
    jsChecking: true,
  },
  {
    number: 5,
    description: "Empty password",
    email: "Katrin@gmail.com",
    password: "",
    expectedResult: "Please fill out this field.",
    jsChecking: true,
  },
  {
    number: 6,
    description: "Minimum length email",
    email: "a@b.c",
    password: "Sample1234",
    expectedResult: "Your email or password is incorrect!",
  },
  {
    number: 7,
    description: "Minimum length password",
    email: "Katrin@gmail.com",
    password: "a",
    expectedResult: "Your email or password is incorrect!",
  },
  {
    number: 8,
    description: "Maximum length email",
    email: "a".repeat(64) + "@example.com",
    password: "ValidPass123",
    expectedResult: "Your email or password is incorrect!",
  },
  {
    number: 9,
    description: "Maximum length password",
    email: "Katrin@gmail.com",
    password: "a".repeat(255),
    expectedResult: "Your email or password is incorrect!",
  },
  {
    number: 10,
    description: "Email with special characters",
    email: "valid!@#$%example.com",
    password: "ValidPass123",
    expectedResult: "A part following '@' should not contain the symbol '#'.",
    jsChecking: true,
  },
  {
    number: 11,
    description: "Password with special characters",
    email: "Katrin@gmail.com",
    password: "Valid!@#$",
    expectedResult: "Your email or password is incorrect!",
  },
  {
    number: 12,
    description: "Email with spaces",
    email: "Katrin @gmail.com",
    password: "Sample1234",
    expectedResult: "A part followed by '@' should not contain the symbol ' '.",
    jsChecking: true,
  },
  {
    number: 13,
    description: "Password with spaces",
    email: "Katrin@gmail.com",
    password: "Valid Pass123",
    expectedResult: "Your email or password is incorrect!",
  },
  {
    number: 14,
    description: "Email without '@' symbol",
    email: "validexample.com",
    password: "ValidPass123",
    expectedResult:
      "Please include an '@' in the email address. 'validexample.com' is missing an '@'.",
    jsChecking: true,
  },
  {
    number: 15,
    description: "Email without domain",
    email: "valid@",
    password: "ValidPass123",
    expectedResult:
      "Please enter a part following '@'. 'valid@' is incomplete.",
    jsChecking: true,
  },
];

test.describe("Login Page Tests", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  for (const testCase of successfulLogins) {
    test(`${testCase.number}. ${testCase.description}`, async ({ page }) => {
      await test.step("Login with valid credentials", async () => {
        await loginPage.login(testCase.email, testCase.password);
      });

      await test.step("Check if user is logged in", async () => {
        await expect(loginPage.loggedInUser).toBeVisible();
      });
    });
  }

  for (const testCase of failedLogins) {
    test(`${testCase.number}. ${testCase.description}`, async ({ page }) => {
      await test.step("Setup route interception", async () => {
        await page.route(/adsbygoogle|subscription|font-awesome|jquery|bootstrap|googleapis|prettyPhoto/, (route) => route.abort());
    });    

      await test.step("Attempt to login with invalid credentials", async () => {
        await loginPage.wrongLogin(testCase.email, testCase.password);
      });

      if (testCase.jsChecking) {
        await test.step("Validate JS error message", async () => {
          const validationMessage = await page.evaluate(() => {
            const emailInput = document.querySelector('[data-qa="login-email"]') as HTMLInputElement;
            const passwordInput = document.querySelector('[data-qa="login-password"]') as HTMLInputElement;
            return emailInput.validationMessage || passwordInput.validationMessage;
          });

          console.log("Validation Message:", validationMessage);

          expect(validationMessage).toBe(testCase.expectedResult);
        });
      } else {
        await test.step("Validate error message on the page", async () => {
          const errorMessageLocator = page.locator('p:has-text("Your email or password is incorrect!")');

          await expect(errorMessageLocator).toBeVisible();

          const errorMessage = await errorMessageLocator.innerText();

          expect(errorMessage).toBe(testCase.expectedResult);
        });
      }
    });
  }
});
