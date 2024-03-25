import { type Locator, type Page } from "@playwright/test";

export class HomePage {
    //dataMap
    private dataMap = new Map<string, string>();

    //vars
    readonly page: Page;
    readonly accountId: Locator;

    //constructor
    constructor(page: Page) {
        //locators
        this.page = page;
        this.accountId = page.locator("div[id='top-header-menu'] b");
    }

    //methods
    public getValue(key: string) {
        const value = this.dataMap.get(key);
        return value;
    }

    public setValue(key: string, value: string) {
        this.dataMap.set(key, value);
    }

    async getAccountId(){
        const accId = await this.accountId.textContent();
        this.setValue("accountId", accId!);
        // console.log('this is the account id: ' +this.dataMap.get("accountId"));
    }
}