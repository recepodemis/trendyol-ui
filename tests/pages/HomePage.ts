import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {

    private readonly countrySelectContainer: Locator;
    private readonly countrySelect: Locator;
    private readonly countrySelectBtn: Locator;
    private readonly selectedCountryCode: Locator;
    private readonly dropdownCountryList: Locator;
    private readonly submitBtn: Locator;
    private readonly searchInput: Locator;
    private readonly searchIcon: Locator;

    constructor(page: Page) {
        super(page);
        this.countrySelectContainer = page.getByTestId('country-select-container');
        this.countrySelect = page.getByTestId('country-select');
        this.countrySelectBtn = page.getByTestId('country-select-btn');
        this.selectedCountryCode = page.getByTestId('selected-country-code');
        this.dropdownCountryList = page.getByTestId('dropdown-country-list');
        this.submitBtn = page.locator('button.submit-btn');
        this.searchInput = page.getByTestId('suggestion');
        this.searchIcon = page.getByTestId('search-icon');
    }

    async selectCountry(country: string): Promise<void> {
        await this.countrySelectContainer.waitFor({ state: 'visible', timeout: 5000 });
        await this.countrySelect.selectOption({ value: country });
        await this.countrySelectBtn.click();
    }

    async openLanguageDropdown(): Promise<void> {
        await this.selectedCountryCode.hover();
        await this.dropdownCountryList.waitFor({ state: 'visible', timeout: 5000 });
    }

    async selectLanguage(languageCode: string): Promise<void> {
        await this.openLanguageDropdown();
        await this.page.locator(`input#${languageCode}`).check();
        await this.submitBtn.click();
    }

    async searchProduct(productName: string): Promise<void> {
        await this.searchInput.fill(productName);
        await this.searchIcon.click();
    }
}   
