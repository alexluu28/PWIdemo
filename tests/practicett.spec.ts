import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.spec';
import { testData } from './testData';
import { HomePage } from '../pages/homePage.spec';
//#1 Free CRM Power Up your Entire Business Free Forever
    //go to page

    //check title
    
    //login link to be visible

    //click on loginlink

    test('freecrmlogintest', async({page})=>{
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);

        await loginPage.goToLoginPage();

        await expect(page).toHaveTitle("#1 Free CRM Power Up your Entire Business Free Forever");

        await expect(loginPage.loginLink).toBeVisible();

        await loginPage.clickOnLoginLink();

        await loginPage.emailField.waitFor({state:'visible',timeout:8000})        
        
        await loginPage.loginWithValidUser(testData.username,testData.password);

        // await homePage.getAccountId();

        // const text = homePage.getValue("accountId");
        // await expect(homePage.accountId).toHaveText(text);

        // const dataObj = {};
        // const firstPageText = await homePage.accountId.innerText();
        // console.log(firstPageText);

        //contacts
        await page.locator(".users.icon").click();

        await page.getByText("Create").click();

        await page.locator("input[name='first_name']").fill("Hello");
        await page.locator("input[name='last_name']").fill("Kitty "+ Math.random());
        await page.getByText("Save").click();

        await expect(page.locator(".selectable")).not.toContainText("Create New Contact");
        
        //stores locator text
        const orgText = await page.locator(".selectable").innerText();
        console.log(orgText);

        //go to contacts
        await page.goto("https://ui.cogmento.com/contacts");

        //mousehover
        await homePage.accountId.first().hover();
        
        //searches by locator text
        await page.getByText(orgText).click();

        await expect(page.getByText(orgText)).toBeVisible();

    })













