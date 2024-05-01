const { test, expect } = require("@playwright/test");

test("testing chat gpt response display", async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/client/index.html");

    const userInput = "Hello!";

    await page.locator("#prompt-input").fill(userInput);

    await page.locator("#submit-button").click();

    const textOutput = page.locator(".response__container p");

    expect(
        await textOutput.waitFor({
            timeout: 7000,
        })
    );
});
