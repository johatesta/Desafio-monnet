import { expect, Locator, Page } from "@playwright/test";

class WikipediaPage {
  readonly page: Page;
  readonly title: Locator;
  readonly author: Locator;
  readonly image: Locator;
  readonly downloadButton: Locator;
  readonly downloadButton2: Locator;

  constructor(page: Page) {
    this.page = page;

    this.title = page.locator('[class="mw-page-title-main"]');
    this.author = page.locator('[class="infobox-caption"]');
    this.image = page.locator(
      '[class="infobox ib-character"] img[class="mw-file-element"]'
    );
    this.downloadButton = page.getByTitle("Download this file", {
      exact: true,
    });

    this.downloadButton2 = page.getByRole("link", { name: "Download" });
  }

  async navigateToPokemon(pokemonName: string) {
    await this.page.goto(`https://en.wikipedia.org/wiki/${pokemonName}`);
  }

  async getTitle() {
    const titleContent = await this.title.textContent();
    if (!titleContent) {
      throw new Error('Title content is not available');
    }
    return titleContent;
  }

  async getAuthor() {
    return await this.author.textContent();
  }

  // Validación de extensión de la imagen
  private isValidImageExtension(filename: string): boolean {
    const validExtensions = ["jpg", "jpeg", "png", "svg"];
    const extension = filename.toLowerCase().split(".").pop();
    return validExtensions.includes(extension ?? "");
  }

  async downloadImage(folder: string) {
    if (!(await this.image.isVisible())) {
      throw new Error("Image element is not visible on the page.");
    }
    await this.image.click();

    // Esperar hasta que el botón de descarga esté visible
    await this.downloadButton.waitFor({ state: 'visible' });

    if (!(await this.downloadButton.isVisible())) {
      throw new Error("Download button is not visible on the page.");
    }

    const downloadedfile = this.page.waitForEvent("download");
    await this.downloadButton.click();

    // Esperar hasta que el segundo botón de descarga esté visible
    await this.downloadButton2.waitFor({ state: 'visible' });

    if (!(await this.downloadButton2.isVisible())) {
      throw new Error("Confirm download button is not visible.");
    }

    await this.downloadButton2.click();

    const download = await downloadedfile;
    await download.saveAs(folder + download.suggestedFilename());

    const imageExtension = download
      .suggestedFilename()
      .toLowerCase()
      .split(".")[1];

    
    if (this.isValidImageExtension(download.suggestedFilename())) {
      console.log(`Valid image format: ${imageExtension}`);
      expect(imageExtension).toBeTruthy();
    } else {
      console.error("Invalid image format extension.");
    }
  }
}

export default WikipediaPage;