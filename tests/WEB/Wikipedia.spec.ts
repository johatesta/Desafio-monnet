import { test, expect } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";
import WikipediaPage from '../pages/WikipediaPage';
import { read_data } from '../utils/read_data';

let webPage: WikipediaPage;
const downloadpath = path.resolve(__dirname, "../downloads");
const excelData = read_data("Datos-pruebas.xlsx");

test.beforeAll(async ({}) => {
    if (!fs.existsSync(downloadpath)) {
      console.log("Folder has been created succesfully");
  
      fs.mkdirSync(downloadpath, { recursive: true });
    } else {
      console.log("Overwriting folder");
    }
  });
  


for (const data of excelData) {
  test(`Validate downloading for pokemon: ${data.name} - @webpokemon`, async ({ page }) => {
    webPage = new WikipediaPage(page);

    await test.step("Navigate to Pokémon Wikipedia page", async () => {
      await webPage.navigateToPokemon(data.name);
    });

    await test.step("Validate the page title", async () => {
      const title = await webPage.getTitle();
      expect(title).toBeTruthy();
      const titleLower = title.toLowerCase();
      const pokemonNameLower = data.name.toLowerCase();
      expect(titleLower).toContain(pokemonNameLower);
    });

    await test.step("Log the author of the image", async () => {
      const author = await webPage.getAuthor();
      console.log(`Author: ${author}`);
    });

    await test.step("Validate downloading", async () => {
      await webPage.downloadImage(`${downloadpath}/downloads`);

      const folderPath = downloadpath;
      const getFiles = fs.readdirSync(folderPath);

      for (const file of getFiles) {
        const filePath = path.join(folderPath, file);
        const imageSizeValue = fs.readFileSync(filePath).length;
        expect(imageSizeValue).toBeLessThan(500000);
      }
    });
  });
}