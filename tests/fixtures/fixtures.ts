import { test as base } from "@playwright/test";
import crypto from 'crypto';

export const test = base.extend<{ forEachTest: void }>({
  forEachTest: [
    async ({ page }, use) => {
    
      const secretKey = process.env.SECRET_KEY;

      if (secretKey) {
        const hash = crypto.createHash('sha256').update(secretKey).digest('hex');
        console.log(`Encrypted Secret Key (SHA-256): ${hash}`);
      } else {
        console.log('Secret key is not defined.');
      }

      await use();

      await page.close();
    },
    { auto: true },
  ],
});