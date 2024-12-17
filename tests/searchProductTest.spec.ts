import {test,expect} from '@playwright/test';

test('searchProduct', async({page})=>{

    await page.goto("http://automationexercise.com");

    await expect(page.locator("//img[@alt='Website for automation practice']")).toBeVisible();

    await page.locator("//a[@href='/products']").click();

    await expect(page.getByText("All Products")).toBeVisible();

    await page.locator("//input[@id='search_product']").fill("Winter Top");

    await page.locator("//button[@id='submit_search']").click();

    await expect(page.getByText("Searched Products")).toBeVisible();

    await expect(page.getByText("Winter Top").first()).toBeVisible();

    await page.waitForTimeout(5000);
});
