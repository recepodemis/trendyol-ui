import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchPage extends BasePage {
    private readonly productCards: Locator;

    constructor(page: Page) {
        super(page);
        this.productCards = page.locator('.p-card-wrppr');
    }

    private getProductSizeFilterLocator(size: string): Locator {
        return this.page.locator(`a.fltr-item-wrppr:has(.fltr-item-text:text-is("${size}"))`);
    };

    private getProductTitleLocator(index: number): Locator {
        return this.productCards.nth(index).locator('.prdct-desc-cntnr-name');
    }

    async filterBySize(size: string): Promise<void> {
        const sizeFilter = this.getProductSizeFilterLocator(size);
        await sizeFilter.click();
        await this.page.waitForURL('**size|group-' + size.toLowerCase() + '**', { waitUntil: 'load' });
    }

    async getProductCount(): Promise<number> {
        return await this.productCards.count();
    }

    async getProductTitleByIndex(index: number): Promise<string | null> {
        const titleLocator = this.getProductTitleLocator(index);
        return await titleLocator.textContent();
    }

    async clickProductByIndexAndReturnProductPage(index: number): Promise<Page> {
        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.productCards.nth(index).click()
        ]);

        return newPage;
    }

    async clickRandomProductAndReturnProductPageWithTitle(): Promise<{ newPage: Page, productTitle: string | null }> {
        const count = await this.getProductCount();
        const randomIndex = Math.floor(Math.random() * count);
        const productTitle = await this.getProductTitleByIndex(randomIndex);
        const newPage = await this.clickProductByIndexAndReturnProductPage(randomIndex);

        return { newPage, productTitle };
    }


    async clickFirstProductAndReturnProductPageWithTitle(): Promise<{ newPage: Page, productTitle: string | null }> {
        const productTitle = await this.getProductTitleByIndex(0);
        const newPage = await this.clickProductByIndexAndReturnProductPage(0);

        return { newPage, productTitle };
    }
}

