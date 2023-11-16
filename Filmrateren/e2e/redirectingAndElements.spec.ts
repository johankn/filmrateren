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
  await page.getByRole('img', { name: 'Helt Super' }).click();

  await expect(page.getByRole('heading', { name: 'Helt Super' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Helt Super' })).toBeVisible();
  await expect(page.getByText('Regi: Rasmus A. Sivertsen')).toBeVisible();

});

test('redirecting and rate movie test', async ({ page }) => {
  await page.goto('http://localhost:5173/project2');
  await page.getByLabel('Sortering').click();
  await page.locator('#menu- div').first().click();
  await page.getByLabel('Sjanger').click();
  await page.getByRole('option', { name: 'Fantasy' }).getByRole('checkbox').check();
  await page.getByRole('option', { name: 'Krig' }).getByRole('checkbox').check();
  await page.getByRole('option', { name: 'Krim' }).getByRole('checkbox').check();
  await page.locator('.MuiBackdrop-root').click();
  await page.getByLabel('Tittel...').click();
  await page.getByLabel('Tittel...').fill('hei');
  await page.getByRole('button', { name: 'Søk' }).click();
  await page.getByRole('button', { name: 'Last flere filmer' }).click();

  await expect(page.getByText('Ingen flere filmer funnet.')).toBeVisible();

  await page.getByRole('img', { name: 'Det grodde fram: Trondheim 1940-1945' }).click();
  await page.getByRole('button', { name: 'Rate filmen' }).click();
  await page.getByPlaceholder('Eks: Ola Nordmann').click();
  await page.getByPlaceholder('Eks: Ola Nordmann').fill('Ola Nordmann');
  await page.getByRole('button', { name: '★' }).nth(2).click();
  await page.getByPlaceholder('Eks: En skummel, men spennende film!').click();
  await page.getByPlaceholder('Eks: En skummel, men spennende film!').fill('Dette er for å teste denne funksjonen (e2e).');
  await page.getByRole('button', { name: 'Send inn' }).click();

  await expect(page.getByText('Ola Nordmann★★★★★Dette er for å teste denne funksjonen (e2e).')).toBeVisible();

});

test('test return button', async ({ page }) => {
  await page.goto('http://localhost:5173/project2');
  await page.getByRole('img', { name: 'There\'s Something in the Barn' }).click();
  await page.getByRole('button', { name: '←' }).click();
  await page.getByRole('img', { name: 'Verdens verste menneske' }).click();
  await expect(page.getByText('Regi: Joachim Trier')).toBeVisible();
  await expect(page.getByRole('img', { name: 'Verdens verste menneske' })).toBeVisible();
  await page.getByRole('button', { name: '←' }).click();
  await page.getByRole('button', { name: 'Last flere filmer' }).click();
  await page.getByRole('img', { name: 'Børning 2' }).click();
  await expect(page.getByRole('img', { name: 'Børning 2' })).toBeVisible();
  await page.getByRole('button', { name: '←' }).click();
  await expect(page.getByRole('img', { name: 'Børning 2' })).toBeVisible();
});
