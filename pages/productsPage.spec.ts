import { type Locator, type Page } from "@playwright/test";

export class ProductsPage {
    //vars
    readonly page: Page;

    constructor(page: Page){
        //locators
        this.page = page;
    }

    //methods
}