import { test, expect } from "@playwright/test";
import { SignupPage } from "../pages/SignupPage";

// | Number | Test Case Description                     | Email                      | Password                                  | Expected Result                                                                                                       | Type        |
// |--------|-------------------------------------------|----------------------------|-------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|-------------|
// | 1      | Correct email and password                | `text=${randomEmail}`      | Sample1234@gmail.com                      | Successful registration, user is displayed                                                                            | Equivalence |
// | 2      | Incorrect email                           | wrong@example.com          | Sample1234                                | Please include an '@' in the email address. 'Sample1234' is missing an '@'.                                           | Equivalence |
// | 3      | Incorrect password                        | Katrin@gmail.com           | wrongpassword                             | Please include an '@' in the email address. 'wrongpassword' is missing an '@'.                                        | Equivalence |
// | 4      | Empty email                               |                            | Sample1234                                | Please include an '@' in the email address. 'Sample1234' is missing an '@'.                                           | Boundary    |
// | 5      | Empty password                            | Katrin@gmail.com           |                                           | Please fill out this field.                                                                                           | Boundary    |
// | 6      | Minimum length email                      | a@b.c                      | Sample1234                                | Please include an '@' in the email address. 'Sample1234' is missing an '@'.                                           | Boundary    |
// | 7      | Minimum length password                   | Katrin@gmail.com           | a                                         | Please include an '@' in the email address. 'a' is missing an '@'.                                                    | Boundary    |
// | 8      | Maximum length email                      | a...@example.com (64 chars)| ValidPass123                              | Please include an '@' in the email address. 'ValidPass123' is missing an '@'.                                         | Boundary    |
// | 9      | Maximum length password                   | Katrin@gmail.com           | a... (255 chars)                          | Please include an '@' in the email address. 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaю...... is missing an '@'. | Boundary    |
// | 10     | Email with special characters             | valid!@#$%example.com      | ValidPass123                              | Please include an '@' in the email address. 'ValidPass123' is missing an '@'.                                         | Equivalence |
// | 11     | Password with special characters          | Katrin@gmail.com           | Valid!@#$                                 | A part following '@' should not contain the symbol '#'.                                                               | Equivalence |
// | 12     | Email with spaces                         | Katrin @gmail.com          | Sample1234                                | Please include an '@' in the email address. 'Sample1234' is missing an '@'.                                           | Equivalence |
// | 13     | Password with spaces                      | Katrin@gmail.com           | Valid Pass123                             | Please include an '@' in the email address. 'Valid Pass123' is missing an '@'.                                        | Equivalence |
// | 14     | Email without "@" symbol                  | validexample.com           | ValidPass123                              | Please include an '@' in the email address. 'ValidPass123' is missing an '@'.                                         | Equivalence |
// | 15     | Email without domain                      | valid@                     | ValidPass123                              | Please include an '@' in the email address. 'ValidPass123' is missing an '@'.                                         | Equivalence |

const successfulRegistrations = [
  {
    number: 1,
    description: "Correct email and password",
    password: "Sample1234@gmail.com",
  },
];

const failedRegistrations = [
  {
    number: 2,
    description: "Incorrect email",
    email: "wrong@example.com",
    password: "Sample1234",
    expectedResult:
      "Please include an '@' in the email address. 'Sample1234' is missing an '@'.",
    jsChecking: true,
  },
  {
    number: 3,
    description: "Incorrect password",
    email: "Katrin@gmail.com",
    password: "wrongpassword",
    expectedResult:
      "Please include an '@' in the email address. 'wrongpassword' is missing an '@'.",
    jsChecking: true,
  },
  {
    number: 4,
    description: "Empty email",
    email: "",
    password: "Sample1234",
    expectedResult:
      "Please include an '@' in the email address. 'Sample1234' is missing an '@'.",
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
    expectedResult:
      "Please include an '@' in the email address. 'Sample1234' is missing an '@'.",
    jsChecking: true,
  },
  {
    number: 7,
    description: "Minimum length password",
    email: "Katrin@gmail.com",
    password: "a",
    expectedResult:
      "Please include an '@' in the email address. 'a' is missing an '@'.",
    jsChecking: true,
  },
  {
    number: 8,
    description: "Maximum length email",
    email: "a".repeat(64) + "@example.com",
    password: "ValidPass123",
    expectedResult:
      "Please include an '@' in the email address. 'ValidPass123' is missing an '@'.",
    jsChecking: true,
  },
  {
    number: 9,
    description: "Maximum length password",
    email: "Katrin@gmail.com",
    password: "a".repeat(255),
    expectedResult: `Please include an '@' in the email address. 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' is missing an '@'.`,
    jsChecking: true,
  },
  {
    number: 10,
    description: "Email with special characters",
    email: "valid!@#$%example.com",
    password: "ValidPass123",
    expectedResult: "Please include an '@' in the email address. 'ValidPass123' is missing an '@'.",
    jsChecking: true,
  },
  {
    number: 11,
    description: "Password with special characters",
    email: "Katrin@gmail.com",
    password: "Valid!@#$",
    expectedResult: "A part following '@' should not contain the symbol '#'.",
    jsChecking: true,
  },
  {
    number: 12,
    description: "Email with spaces",
    email: "Katrin @gmail.com",
    password: "Sample1234",
    expectedResult: "Please include an '@' in the email address. 'Sample1234' is missing an '@'.",
    jsChecking: true,
  },
  {
    number: 13,
    description: "Password with spaces",
    email: "Katrin@gmail.com",
    password: "Valid Pass123",
    expectedResult: "Please include an '@' in the email address. 'Valid Pass123' is missing an '@'.",
    jsChecking: true,
  },
  {
    number: 14,
    description: "Email without '@' symbol",
    email: "validexample.com",
    password: "ValidPass123",
    expectedResult: "Please include an '@' in the email address. 'ValidPass123' is missing an '@'.",
    jsChecking: true,
  },
  {
    number: 15,
    description: "Email without domain",
    email: "valid@",
    password: "ValidPass123",
    expectedResult: "Please include an '@' in the email address. 'ValidPass123' is missing an '@'.",
    jsChecking: true,
  },
];

test.describe("Signup Page Tests", () => {
  let signupPage: SignupPage;

  test.beforeEach(async ({ page }) => {
    signupPage = new SignupPage(page);
    
    await test.step("Setup route interception", async () => {
      await page.route(
        /adsbygoogle|subscription|font-awesome|jquery|bootstrap|googleapis|prettyPhoto/,
        (route) => route.abort()
      );
    });
  });

  for (const testCase of successfulRegistrations) {
    test(`${testCase.number}. ${testCase.description}`, async ({ page }) => {
        await test.step("Signup with valid credentials", async () => {
            const { randomEmail, randomPassword } = await signupPage.createNewUserWithRandomEmail();
            await expect(page.getByText(randomEmail)).toBeVisible();
        });
    });
}

  for (const testCase of failedRegistrations) {
    test(`${testCase.number}. ${testCase.description}`, async ({ page }) => {

      await test.step("Attempt to signup with invalid credentials", async () => {
        await signupPage.createNewUser(testCase.email, testCase.password);
      });

      if (testCase.jsChecking) {
        await test.step("Validate JS error message", async () => {
          const validationMessage = await page.evaluate(() => {
            const emailInput = document.querySelector(
              '[data-qa="signup-email"]'
            ) as HTMLInputElement;
            const passwordInput = document.querySelector(
              '[data-qa="signup-password"]'
            ) as HTMLInputElement;
            return (
              emailInput.validationMessage || passwordInput.validationMessage
            );
          });

          expect(validationMessage).toBe(testCase.expectedResult);
        });
      } else {
        await test.step("Validate error message on the page", async () => {
          const errorMessageLocator = page.locator(
            'p:has-text("Invalid email address")'
          );

          await expect(errorMessageLocator).toBeVisible();

          const errorMessage = await errorMessageLocator.innerText();

          expect(errorMessage).toBe(testCase.expectedResult);
        });
      }
    });
  }
});
