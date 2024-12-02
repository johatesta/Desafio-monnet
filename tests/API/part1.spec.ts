import { read_data } from "../utils/read_data";
import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";


test.describe("Testing in the API for the Pokemons", () => {
  const testData = read_data("Datos-pruebas.xlsx");

  for (const data of testData) {
    test(`Validate Pokemon ID: ${data.id}, Nombre: ${data.name}`, async ({ request, page, context }) => {
      const startTime = Date.now();
      const pokemon_name = data.name;
      const pokemon_id = data.id;
      const pokemon_abilities = data.abilities.split(",");

      console.log(`Starting test for Pokemon ID: ${pokemon_id}, Name: ${pokemon_name}`);

      try {
        const response = await request.get(`https://pokeapi.co/api/v2/pokemon/${pokemon_id}`);
        //status de la respuesta
        console.log(`Response status for ID ${pokemon_id}: ${response.status()}`);

        expect(response.status(), `Error in request for ID ${pokemon_id}`).toBe(200);

        const pokemon_response = await response.json();

        expect(pokemon_response.id).toBe(pokemon_id);
        expect(pokemon_response.name).toBe(pokemon_name);
        expect(Array.isArray(pokemon_response.abilities)).toBeTruthy();
        expect(pokemon_response.abilities.length).toBeGreaterThan(0);

        const duration = (Date.now() - startTime) / 1000;
        console.log(`Time spent in the request for ${pokemon_id}: ${duration} seconds`);
        expect(duration).toBeLessThan(10);

      } catch (error) {
        console.error(`Error during test for Pokemon ID: ${pokemon_id}, Name: ${pokemon_name}:`, error);
        
        //captura por si el test falla
        await page.screenshot({ path: `./screenshots/fail-${pokemon_id}.png` });

        throw error;
      }

      console.log(`Test finished for Pokemon ID: ${pokemon_id} at: ${new Date().toLocaleString()}`);
    });
  }
});