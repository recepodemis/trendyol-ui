import { TestConfig } from "../config/test.config";
import { expect, test } from "../fixtures/testFixtures";

test.describe('Change language and verify page update', () => {

    test('Change language to Bulgarian and verify', async ({ page, homePage, utils }) => {


        await utils.goto(TestConfig.baseUrlEn);
        await utils.waitForNetworkIdle();
        await utils.handleCookieBanner();

        await homePage.selectCountry(TestConfig.countries.bulgaria);
        await expect(page).toHaveURL(TestConfig.baseUrlBg);
        await utils.waitForPageLoad();

        await utils.closeDialogIfVisible();

        await homePage.selectLanguage(TestConfig.languageCodes.english);
        await expect(await utils.getHtmlLangAttribute()).toBe(TestConfig.languages.english);

        await utils.waitForPageLoad();
        await homePage.selectLanguage(TestConfig.languageCodes.bulgarian);
        await expect(await utils.getHtmlLangAttribute()).toBe(TestConfig.languages.bulgarian);
    }
    )
});