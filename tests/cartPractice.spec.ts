import {test, expect} from '@playwright/test';
import { testData } from './testData';
import { ProductsPage } from '../pages/productsPage.spec';
import { clear } from 'console';

test('addProductsToCartTest', async({page})=>{
    const productsPage = new ProductsPage(page);
    await page.goto(testData.cartWeb);

    await productsPage.loginWithValidUser(testData.cartUser,testData.cartPassword);

    await productsPage.searchProductAddCart("ZARA COAT 3");

    await page.waitForTimeout(5000);
});