//xpath=//a[@class='btn btn-primary btn-xs-2 btn-shadow btn-rect btn-icon btn-icon-left']

//take screenshot method


import { type Locator, type Page } from "@playwright/test";
import { testData } from "../tests/testData";
const fs = require('fs');
const {write} = require('fast-csv');

export class LoginPage {
    //vars
    readonly page: Page;
    readonly loginLink: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly atcButton: Locator;

    //constructor
    constructor(page: Page) {
        //locators
        this.page = page;
        this.loginLink = page.locator("xpath=//a[@class='btn btn-primary btn-xs-2 btn-shadow btn-rect btn-icon btn-icon-left']");
        this.emailField = page.locator("input[placeholder='Email']");
        this.passwordField = page.locator("input[placeholder='Password']");
        this.loginButton = page.locator("xpath=//div[@class='ui fluid large blue submit button']");
        this.atcButton = page.locator("(//div[@class='fulfillment-add-to-cart-button']//div//div//button[@type='button'][normalize-space()='Add to Cart'])[1]");
    }

    //methods
    async goToLoginPage() {
        await this.page.goto(testData.qa);
        await this.page.waitForLoadState("domcontentloaded");
    }

    async getLinksAndWriteToCsv() {

        //create array obj
        let urls = new Array();

        //get the 10 links and add urls to array
        for (let i = 1; i <= 10; i++) {

            let link = await this.page.locator("(//span[@class='titleline'])[" + i + "]").getByRole('link').first().getAttribute('href');

            urls.push(link);
        }
        
        const csvData = [urls];

        const writableStream = fs.createWriteStream('hyperlinks.csv');
        
        //write array to csv file
        write(csvData)
            .pipe(writableStream)
            .on('finish',()=> console.log('urls written to hyperlinks.csv'));
    }

    // Function to append data to CSV
    async appendToCSV(title) {
      const filePath ='hyperlinks.csv';
    
      const newData = [title];
      
      // Read existing CSV content
      let csvData;
      try {
        csvData = fs.readFileSync(filePath, 'utf-8').toString();
      } catch (err) {
        // Handle file not found error (create empty data if needed)
        csvData = '';
      }
    
      // Parse CSV content into array of rows (assuming comma delimiter)
      const rows = csvData.split('\n').map(row => row.split(','));
    
      // Append new data row
      rows.push(newData);
    
      // Convert modified data back to CSV string
      const updatedCsv = rows.map(row => row.join(',')).join('\n');
    
      // Append the updated CSV content to the file
      fs.appendFileSync(filePath, updatedCsv);

  }

    async addProductsMinimumToCart() {
        let cartsubtotal = 0;
        let cartmini = 50;

        while (cartsubtotal < cartmini) {
            await this.atcButton.scrollIntoViewIfNeeded();
            await this.atcButton.click();

            //get cartsubtotal
            let cartsidetotalRaw = await this.page.locator("//div[@class='sub-total v-fw-medium']").innerText();
            let cartsidetotalString = cartsidetotalRaw.replace(/\$/g, "");

            let cartsidetotalNum = parseFloat(cartsidetotalString);
            console.log('cart cartsidetotal: ' + cartsidetotalNum);
            cartsubtotal = cartsubtotal + cartsidetotalNum;

            //close the side cart
            await this.page.locator("//button[normalize-space()='Continue shopping']").click();
        }
    }

    async clickOnLoginLink() {
        await this.loginLink.click();
    }

    async rightClickOnLoginLink() {
        await this.loginLink.click({ button: 'right' });
    }

    async loginWithValidUser(username, password) {
        await this.emailField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
}