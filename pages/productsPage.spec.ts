import { type Locator, type Page } from "@playwright/test";

export class ProductsPage {
    //vars
    readonly page: Page;
    readonly products: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;

    constructor(page: Page){
        //locators
        this.page = page;
        this.emailField = page.locator("#userEmail");
        this.passwordField = page.locator("#userPassword");
        this.loginButton = page.locator("#login");

    }

    //methods
    async searchProductAddCart(productName){
       const product= await this.page.getByText(productName);
       await product.waitFor({state:'visible'});
       const addCartButton = await product.locator("button", {hasText:" Add To Cart"});
       const visibleBtn = await addCartButton.isVisible();
       if(visibleBtn){
        await addCartButton.click();
       } 
    }

    async loginWithValidUser(username, password){
        await this.emailField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
}