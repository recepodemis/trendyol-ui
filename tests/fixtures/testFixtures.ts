import { test as base } from '@playwright/test';
import { HomePage } from "../pages/HomePage";
import { ProductDetailsPage } from "../pages/ProductDetailsPage";
import { SearchPage } from "../pages/SearchPage";
import { CommonUtils } from '../utils/CommonUtils';

type TestFixtures = {
    homePage: HomePage;
    searchPage: SearchPage;
    productDeatilsPage: ProductDetailsPage;
    utils: CommonUtils;
};

export const test = base.extend<TestFixtures>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    searchPage: async ({ page }, use) => {
        const searchPage = new SearchPage(page);
        await use(searchPage);
    },
    productDeatilsPage: async ({ page }, use) => {
        const productDetailsPage = new ProductDetailsPage(page);
        await use(productDetailsPage);
    },
    utils: async ({ page }, use) => {
        const utils = new CommonUtils(page);
        await use(utils);
    }
});

export { expect } from '@playwright/test';
