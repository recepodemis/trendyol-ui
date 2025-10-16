import { Page , test} from "@playwright/test";
import { CommonUtils } from "../utils/CommonUtils";

export class BasePage {
    readonly page: Page;
    readonly commonUtils: CommonUtils;

    constructor(page: Page) {
        this.page = page;
        this.commonUtils = new CommonUtils(page);
    }
}