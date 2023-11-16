import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Runs before each test.
  await page.goto('http://localhost:5173/project2');
  // await page.goto('http://it2810-05.idi.ntnu.no/project2/');

});

// Test to check if the title contains "Film rateren"
test('has title', async ({ page }) => {
  await expect(page).toHaveTitle("Film rateren");
});

// Test for autocomplete, redirect, and URL validation
test('autocomplete and redirect', async ({ page }) => {
  // Interact with the autocomplete input
  await page.getByPlaceholder('Tittel...').click();
  await page.getByPlaceholder('Tittel...').fill('Kongens nei');
  await page.waitForTimeout(1600); // Wait for the autocomplete to show up
  await page.getByPlaceholder('Tittel...').click(); // Click the autocomplete again
  await page.getByRole('option', { name: 'Kongens nei' }).click();
  // Validate the redirected URL
  const url = await page.url();
  expect(url).toContain('http://localhost:5173/project2/moviePage/318'); 
  // expect(url).toContain('http://it2810-05.idi.ntnu.no/project2/moviePage/318');
});

// Test for scrolling down, clicking on a movie, and validating visibility of elements
test('scroll down and click on the movie: Helt Super', async ({ page }) => {
  await page.getByRole('img', { name: 'Helt Super' }).click();
  // Validate visibility of elements on the new page
  await expect(page.getByRole('heading', { name: 'Helt Super' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Helt Super' })).toBeVisible();
  await expect(page.getByText('Regi: Rasmus A. Sivertsen')).toBeVisible();
});

// Test for redirecting, filtering, and rating a movie
test('redirecting and rate movie test', async ({ page }) => {
  // Interaction with filters and search
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

  // Validate that no more movies are found
  await expect(page.getByText('Ingen flere filmer funnet.')).toBeVisible();

  // Interaction with a specific movie and rating
  await page.getByRole('img', { name: 'Det grodde fram: Trondheim 1940-1945' }).click();
  await page.getByRole('button', { name: 'Rate filmen' }).click();
  await page.getByPlaceholder('Eks: Ola Nordmann').click();
  await page.getByPlaceholder('Eks: Ola Nordmann').fill('Ola Nordmann');
  await page.getByRole('button', { name: '★' }).nth(2).click();
  await page.getByPlaceholder('Eks: En skummel, men spennende film!').click();
  await page.getByPlaceholder('Eks: En skummel, men spennende film!').fill('Dette er for å teste denne funksjonen (e2e).');
  await page.getByRole('button', { name: 'Send inn' }).click();

  // Validate the presence of the rated movie
  await expect(page.getByText('Ola Nordmann★★★★★Dette er for å teste denne funksjonen (e2e).')).toBeVisible();
});

// Test for checking the return button functionality
test('test return button', async ({ page }) => {
  // Interaction with movies and return button
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
