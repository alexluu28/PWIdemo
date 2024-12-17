import {test, expect} from '@playwright/test';
import exp from 'constants';

test('verifySubTest', async({page})=>{

    await page.goto("http://automationexercise.com");

    await expect(page.locator("//a[normalize-space()='Home']")).toHaveAttribute("style","color: orange;");

    await page.locator("//h2[normalize-space()='Subscription']").scrollIntoViewIfNeeded();

    await expect(page.locator("//h2[normalize-space()='Subscription']")).toBeVisible();

    await expect(page.getByText("Subscription")).toBeVisible();

    await page.locator("//input[@id='susbscribe_email']").fill("example@gmail.com");

    await page.locator("//button[@id='subscribe']").click();

    await expect(page.getByText("You have been successfully subscribed!")).toBeVisible();

});