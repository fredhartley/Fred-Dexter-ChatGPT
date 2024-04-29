const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/client/index.html");
});
