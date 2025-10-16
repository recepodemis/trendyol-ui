import { Page, Locator } from '@playwright/test';

export class CommonUtils {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async handleCookieBanner(): Promise<void> {
        const acceptBtn = this.page.locator('#onetrust-accept-btn-handler');
        await this.page.waitForLoadState('networkidle');

        if (await acceptBtn.isVisible()) {
            await acceptBtn.click();
            await this.page.locator('#onetrust-banner-sdk')
                .waitFor({ state: 'hidden', timeout: 5000 });
        }
    }

    async closeDialogIfVisible(): Promise<void> {
        const dialog = this.page.getByRole('dialog').locator('.close-icon');
        if (await dialog.isVisible()) {
            await dialog.click();
        }
    }


    async handleOverlay(): Promise<void> {
        const overlay = this.page.getByTestId('overlay');

        await overlay.waitFor({ state: 'visible', timeout: 10000 });

        if (await overlay.isVisible()) {
            await this.page.locator('body').click();
        }

        await overlay.waitFor({ state: 'hidden', timeout: 5000 });
    }

    async handleGenderModal(gender: 'Erkek' | 'Kadın' = 'Erkek'): Promise<void> {
        const genderModal = this.page.locator('.gender-modal-section');
        if (await genderModal.isVisible()) {
            await this.page.locator(`.modal-action-button:has-text("${gender}")`).click();
        }
    }


    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('load');
    }


    async waitForNetworkIdle(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    async getHtmlLangAttribute(): Promise<string | null> {
        return await this.page.getAttribute('html', 'lang');
    }

    async goto(url: string): Promise<void> {
        await this.page.goto(url);
    }
}