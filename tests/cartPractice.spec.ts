import {test, expect} from '@playwright/test';
import { testData } from './testData';
import { ProductsPage } from '../pages/productsPage.spec';

test('addProductsToCartTest', async({page})=>{
    const productsPage = new ProductsPage(page);
    await page.goto(testData.cartWeb);
})