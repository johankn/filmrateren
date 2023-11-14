import { test, expect } from '@playwright/test';

test('test sorting and filtering', async ({ page }) => {
  await page.goto('http://localhost:5173/project2');
  await page.getByLabel('Sjanger').click();
  await page.getByRole('option', { name: 'Animasjon' }).getByRole('checkbox').check();
  await page.getByRole('option', { name: 'Drama' }).getByRole('checkbox').check();
  await page.locator('.MuiBackdrop-root').click();
  await page.getByLabel('Sortering').click();
  await page.getByRole('option', { name: 'Rating IMDB synkende' }).click();
  await page.getByRole('button', { name: 'Søk' }).click();

  await expect(page.getByRole('link', { name: 'Det lyse mørket Det lyse mørket' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Pikselhjerte Pikselhjerte' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Fyret Fyret' })).toBeVisible();
});

test('test sorting and filtering with text input', async ({ page }) => {
  await page.goto('http://localhost:5173/project2');
  await page.getByLabel('Tittel...').click();
  await page.getByLabel('Tittel...').fill('kon');
  await page.getByLabel('Sjanger').click();
  await page.getByRole('option', { name: 'Dokumentar' }).getByRole('checkbox').check();
  await page.locator('.MuiBackdrop-root').click();
  await page.getByRole('button', { name: 'Søk' }).click();

  await expect(page.getByRole('link', { name: 'Kon-Tiki Kon-Tiki' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Helt Super Helt Super' })).toBeHidden();
});