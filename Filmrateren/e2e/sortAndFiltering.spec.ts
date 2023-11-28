import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Runs before each test.
  await page.goto('http://localhost:5173/project2');
  // await page.goto('http://it2810-05.idi.ntnu.no/project2/');

});

// Test for sorting and filtering
test('test sorting and filtering', async ({ page }) => {
  await page.locator('section').filter({ hasText: 'SjangerSjanger' }).click();
  await page.getByRole('option', { name: 'Dokumentar' }).getByRole('checkbox').check();
  await page.getByRole('option', { name: 'Familie' }).getByRole('checkbox').check();
  await page.getByRole('option', { name: 'Fantasy' }).getByRole('checkbox').check();
  await page.locator('.MuiBackdrop-root').click();

  await page.locator('section').filter({ hasText: 'StreamingStreaming' }).getByLabel('Sjanger').click();
  await page.getByRole('option', { name: 'HBO Max' }).getByRole('checkbox').check();
  await page.locator('.MuiBackdrop-root').click();
  await page.locator('section').filter({ hasText: 'Søk' }).click();
  // this movie should be visible
  await expect(page.getByRole('button', { name: 'Operasjon Mørkemann' })).toBeVisible();

  await page.getByRole('button', { name: '←' }).click();
  await page.locator('div').filter({ hasText: /^Ingen flere filmer$/ }).click();
  await page.getByText('HBO Max').click();
  await page.getByRole('option', { name: 'HBO Max' }).getByRole('checkbox').uncheck();
  await page.locator('.MuiBackdrop-root').click();
  await page.locator('section').filter({ hasText: 'Søk' }).click();

  //after unchecking HBO Max, this movie and others should be visible
  await expect(page.getByRole('button', { name: 'Helt Super' }).locator('a')).toBeVisible();
});

// Test for sorting and filtering with text input
test('test sorting and filtering with text input', async ({ page }) => {
  // Interaction with text input, genre filters, and search
  await page.getByLabel('Tittel...').click();
  await page.getByLabel('Tittel...').fill('kon');
  await page.getByLabel('SjangerSjanger').click();
  await page.getByRole('option', { name: 'Dokumentar' }).getByRole('checkbox').check();
  await page.locator('.MuiBackdrop-root').click();
  await page.getByRole('button', { name: 'Søk' }).click();

  // Validate visibility of specific movies based on text input and filters
  await expect(page.getByRole('img', { name: 'Kon-Tiki' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Helt Super' })).toBeHidden();
});

test('test remove movies without data toggle', async ({ page }) => {
  await page.getByLabel('Sortering').click();
  await page.getByRole('option', { name: 'Rating IMDB stigende' }).click();
  await page.locator('section').filter({ hasText: 'Søk' }).click();

  await expect(page.getByRole('button', { name: 'Håndtering av udøde' }).locator('a')).toBeVisible();

  await page.getByRole('checkbox').check();
  await page.locator('section').filter({ hasText: 'Søk' }).click();

  await expect(page.getByRole('button', { name: 'Dis - en historie om kjærlighet' }).locator('a')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Håndtering av udøde' }).locator('a')).toBeHidden();
  
  await page.getByRole('button', { name: 'Dis - en historie om kjærlighet' }).locator('a').click();

  await expect(page.getByText('IMDB-rating: 1.5 / 10 (3.2K)')).toBeVisible();
});
