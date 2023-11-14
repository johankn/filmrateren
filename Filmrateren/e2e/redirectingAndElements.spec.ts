import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  // await page.goto('http://it2810-05.idi.ntnu.no/project2/');
  await page.goto('http://localhost:5173/project2');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Film rateren");
});

test('autocomplete and redirect', async ({ page }) => {
  await page.goto('http://localhost:5173/project2');
  await page.getByPlaceholder('Tittel...').click();
  await page.getByPlaceholder('Tittel...').fill('Kongens nei');
  await page.waitForTimeout(1600); // Wait for the autocomplete to show up
  await page.getByPlaceholder('Tittel...').click(); // Click the autocomplete again
  await page.getByRole('option', { name: 'Kongens nei' }).click();

  const url = await page.url();
  expect(url).toContain('http://localhost:5173/project2/moviePage/318'); 
});

test('scroll down and click on the movie: Helt Super', async ({ page }) => {
  await page.goto('http://localhost:5173/project2');
  await page.getByRole('link', { name: 'Helt Super Helt Super' }).click();

  await expect(page.getByRole('heading', { name: 'Helt Super' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Helt Super' })).toBeVisible();

});

