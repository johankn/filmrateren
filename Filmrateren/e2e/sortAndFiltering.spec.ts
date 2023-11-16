import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Runs before each test.
  await page.goto('http://localhost:5173/project2');
  // await page.goto('http://it2810-05.idi.ntnu.no/project2/');

});

// Test for sorting and filtering
test('test sorting and filtering', async ({ page }) => {
  // Interaction with genre filters and sorting options
  await page.getByLabel('Sjanger').click();
  await page.getByRole('option', { name: 'Animasjon' }).getByRole('checkbox').check();
  await page.getByRole('option', { name: 'Drama' }).getByRole('checkbox').check();
  await page.locator('.MuiBackdrop-root').click();
  await page.getByLabel('Sortering').click();
  await page.getByRole('option', { name: 'Rating IMDB synkende' }).click();
  await page.getByRole('button', { name: 'Søk' }).click();

  // Validate visibility of specific movies
  await expect(page.getByRole('img', { name: 'Det lyse mørket' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Pikselhjerte' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Fyret' })).toBeVisible();
});

// Test for sorting and filtering with text input
test('test sorting and filtering with text input', async ({ page }) => {
  // Interaction with text input, genre filters, and search
  await page.getByLabel('Tittel...').click();
  await page.getByLabel('Tittel...').fill('kon');
  await page.getByLabel('Sjanger').click();
  await page.getByRole('option', { name: 'Dokumentar' }).getByRole('checkbox').check();
  await page.locator('.MuiBackdrop-root').click();
  await page.getByRole('button', { name: 'Søk' }).click();

  // Validate visibility of specific movies based on text input and filters
  await expect(page.getByRole('img', { name: 'Kon-Tiki' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Helt Super' })).toBeHidden();
});
