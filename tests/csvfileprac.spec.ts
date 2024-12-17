import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.spec';


test('bestbuys', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto("https://www.bestbuy.com/site/misc/deal-of-the-day/pcmcat248000050016.c?id=pcmcat248000050016");

    await loginPage.addProductsMinimumToCart();
})


test('qawolf', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto("https://news.ycombinator.com/");

    let title = await page.locator("//a[normalize-space()='Hacker News']").innerText();

    //hyperlinks complete to csv
    await loginPage.getLinksAndWriteToCsv();

    await page.waitForTimeout(5000);

    await loginPage.appendToCSV(title);

})