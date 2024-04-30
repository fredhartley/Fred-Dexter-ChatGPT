const { test, expect } = require("@playwright/test");

test("testing form input and output", async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/client/index.html");

    const userInput = "This is test text.";

    await page.locator("#prompt-input").fill(userInput);

    await page.locator("#submit-button").click();

    const textOutput = await page
        .locator(".user-input__container p")
        .textContent();

    expect(textOutput).toBe(userInput);
});
