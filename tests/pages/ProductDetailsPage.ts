import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductDetailsPage extends BasePage {
    private readonly productTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.productTitle = page.locator('data-testid=product-title');
    }

    private getProductSizeOptionLocator(size: string): Locator {
        return this.page.getByTestId('size-box').getByText(size, { exact: true });
    }

    async clickSizeOption(size: string): Promise<void> {
        const sizeOption = this.getProductSizeOptionLocator(size);
        await sizeOption.click();
    }
    
    async getProductTitle(): Promise<string | null> {
        return await this.productTitle.textContent();
    }

    async isSizeOptionVisible(size: string): Promise<boolean> {
        const sizeOption = this.getProductSizeOptionLocator(size);
        return await sizeOption.isVisible();
    }

    async isSizeOptionEnabled(size: string): Promise<boolean> {
        const sizeOption = this.getProductSizeOptionLocator(size);
        return await sizeOption.isEnabled();
    }
}