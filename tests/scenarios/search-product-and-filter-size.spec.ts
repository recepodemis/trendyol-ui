import { TestConfig } from "../config/test.config";
import { expect, test } from "../fixtures/testFixtures";
import { ProductDetailsPage } from "../pages/ProductDetailsPage";
import { CommonUtils } from "../utils/CommonUtils";

test.describe('Search for a product and filter by size', () => {

    test('Search product and filter with size and check size on product details page', async ({ page, homePage, searchPage, productDeatilsPage, utils }) => {

        test.setTimeout(TestConfig.timeouts.testTimeout);

        await utils.goto(TestConfig.baseUrl);
        await utils.waitForNetworkIdle();
        await utils.handleCookieBanner();

        await utils.waitForPageLoad();

        await utils.handleGenderModal();

        await homePage.searchProduct(TestConfig.searchTerms.trendyol);
        await utils.waitForPageLoad();

        await searchPage.filterBySize('M');
        await utils.waitForPageLoad();

        await page.waitForURL('**size|group-m**', { waitUntil: 'load' });

        const { newPage, productTitle } = await searchPage.clickRandomProductAndReturnProductPageWithTitle();

        const productPage = new ProductDetailsPage(newPage);
        const newPageUtils = new CommonUtils(newPage);
        await productPage.commonUtils.waitForPageLoad();

        await newPageUtils.handleOverlay();

        await productPage.isSizeOptionVisible(TestConfig.sizes.medium);
        await productPage.isSizeOptionEnabled(TestConfig.sizes.medium);

    });
});
