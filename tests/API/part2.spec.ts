import { expect, request } from "@playwright/test";
import { test } from "../fixtures/fixtures";

test.describe("Validate POST and GET requests", () => {
  
  // Validación de la solicitud POST
  test("Validate POST request - @apiparte2post", async ({ request, page }) => {
    console.log("Starting POST request test");

    try {
      const response = await request.post("https://jsonplaceholder.typicode.com/posts", {
        data: {
          userId: 10,
          id: 100,
          title: "at nam consequatur ea labore ea harum",
          body: "cupiditate quo est a modi nesciunt soluta\nipsa voluptas error itaque dicta in\nautem qui minus magnam et distinctio eum\naccusamus ratione error aut"
        }
      });

      console.log(`POST response status: ${response.status()}`);
      expect(response.status(), `Error trying to POST data`).toBe(201);

      const postResponse = await response.json();
      console.log("POST response body:", postResponse);

    } catch (error) {
      console.error("Error during POST request:", error);
      await page.screenshot({ path: './screenshots/fail-post.png' });
      throw error;
    }

    console.log("POST request test finished");
  });



  // Validación de la solicitud GET después del POST
  test("Validate GET the response - @apiparte2post", async ({ request, page }) => {
    console.log("Starting GET request test");

    try {
      const response = await request.get("https://jsonplaceholder.typicode.com/posts/100");

      const jsonResponse = await response.json();
      console.log("GET response body:", jsonResponse);

      // Validación de que los datos sean los esperados
      expect(jsonResponse).toMatchObject({
        userId: 10,
        id: 100
      });

    } catch (error) {
      console.error("Error during GET request:", error);
      await page.screenshot({ path: './screenshots/fail-get.png' });
      throw error;
    }

    console.log("GET request test finished");
  });

});