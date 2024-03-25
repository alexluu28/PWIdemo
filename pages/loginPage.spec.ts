//xpath=//a[@class='btn btn-primary btn-xs-2 btn-shadow btn-rect btn-icon btn-icon-left']

//take screenshot method


import { type Locator, type Page } from "@playwright/test";
import { testData } from "../tests/testData";

export class LoginPage {
    //vars
    readonly page: Page;
    readonly loginLink: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;

    //constructor
    constructor(page: Page) {
        //locators
        this.page = page;
        this.loginLink = page.locator("xpath=//a[@class='btn btn-primary btn-xs-2 btn-shadow btn-rect btn-icon btn-icon-left']");
        this.emailField = page.locator("input[placeholder='Email']");
        this.passwordField = page.locator("input[placeholder='Password']");
        this.loginButton = page.locator("xpath=//div[@class='ui fluid large blue submit button']");
    }

    //methods
    async goToLoginPage() {
        await this.page.goto(testData.qa);
        await this.page.waitForLoadState("domcontentloaded");
    }

    async clickOnLoginLink() {
        await this.loginLink.click();
    }

    async rightClickOnLoginLink() {
        await this.loginLink.click({ button: 'right' });
    }

    async loginWithValidUser(username, password){
        await this.emailField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
}