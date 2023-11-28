import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Runs before each test.
  await page.goto("http://localhost:5173/project2");
  // await page.goto('http://it2810-05.idi.ntnu.no/project2/');
});

// Test to check if the title contains "Film rateren"
test("has title", async ({ page }) => {
  await expect(page).toHaveTitle("Film rateren");
});

// Test for autocomplete, redirect, and URL validation
test("autocomplete and redirect", async ({ page }) => {
  // Interact with the autocomplete input
  await page.getByPlaceholder("Tittel...").click();
  await page.getByPlaceholder("Tittel...").fill("Kongens nei");
  await page.waitForTimeout(1600); // Wait for the autocomplete to show up
  await page.getByPlaceholder("Tittel...").click(); // Click the autocomplete again
  await page.getByRole("option", { name: "Kongens nei" }).click();
  // Validate the redirected URL
  const url = await page.url();
  expect(url).toContain("http://localhost:5173/project2/moviePage/1058");
  // expect(url).toContain('http://it2810-05.idi.ntnu.no/project2/moviePage/1058');
});

// Test for scrolling down, clicking on a movie, and validating visibility of elements
test("scroll down and click on the movie: Helt Super", async ({ page }) => {
  await page.getByRole("img", { name: "Helt Super" }).click();
  // Validate visibility of elements on the new page
  await expect(page.getByRole("heading", { name: "Helt Super" })).toBeVisible();
  await expect(page.getByRole("img", { name: "Helt Super" })).toBeVisible();
  await expect(page.getByText("Regi: Rasmus A. Sivertsen")).toBeVisible();
});

// Test for redirecting, filtering, and rating a movie
test("redirecting and rate movie test", async ({ page }) => {
  // Interaction with filters and search
  await page.getByLabel('Tittel...').click();
  await page.getByLabel('Tittel...').fill('hei');
  await page.locator('section').filter({ hasText: 'SjangerSjanger' }).getByLabel('​').click();
  await page.getByRole('option', { name: 'Dokumentar' }).getByRole('checkbox').check();
  await page.getByRole('option', { name: 'Drama' }).getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Søk', exact: true }).click();

  // expect that the label "no more movies" is visible
  await expect(page.locator('div').filter({ hasText: /^Ingen flere filmer$/ })).toBeVisible();

  await page.getByRole('button', { name: 'Kompani Orheim' }).locator('a').click();
  await page.getByRole('button', { name: 'Rate filmen' }).click();
  await page.getByPlaceholder('Eks: Ola Nordmann').click();
  await page.getByPlaceholder('Eks: Ola Nordmann').fill('Ola Nordmann');
  await page.getByRole('button', { name: '★' }).nth(2).click();
  await page.getByPlaceholder('Eks: En skummel, men spennende film!').click();
  await page.getByPlaceholder('Eks: En skummel, men spennende film!').fill('Dette er for å teste denne funksjonen (e2e). 6847abcdefghijklmnop.');
  await page.getByRole('button', { name: 'Send inn' }).click();
  
  // Validate the presence of the rated movie
  await expect(page.getByText('Ola Nordmann★★★★★Dette er for å teste denne funksjonen (e2e). 6847abcdefghijklmn')).toBeVisible();
  
  // Method for deleting the userrating, and then expect it to be gone
  const deletionResult = await page.evaluate(async () => {
    return fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation {
            deleteReview(movieId: 1188, comment: "Dette er for å teste denne funksjonen (e2e). 6847abcdefghijklmnop.")
          }
        `,
      }),
    })
      .then((response) => response.json())
      .then((data) => data.data.deleteReview);
  });

  // Assert that the review was successfully deleted
  await expect(deletionResult).toBe(true);
  await page.waitForTimeout(1000);
  await page.reload();
  // expect now that the review is gone
  await expect(page.getByText('Ola Nordmann★★★★★Dette er for å teste denne funksjonen (e2e). 6847abcdefghijklmn')).toBeHidden();
});

// Test for checking the return button functionality
test("test return button", async ({ page }) => {
  // Interaction with movies and return button
  await page
    .getByRole("img", { name: "There's Something in the Barn" })
    .click();
  await page.getByRole("button", { name: "←" }).click();
  await page.getByRole("img", { name: "Verdens verste menneske" }).click();
  await expect(page.getByText("Regi: Joachim Trier")).toBeVisible();
  await expect(
    page.getByRole("img", { name: "Verdens verste menneske" })
  ).toBeVisible();
  await page.getByRole("button", { name: "←" }).click();
  await page.getByRole("button", { name: "Last flere filmer" }).click();
  await page.getByRole("img", { name: "Børning 2" }).click();
  await expect(page.getByRole("img", { name: "Børning 2" })).toBeVisible();
  await page.getByRole("button", { name: "←" }).click();
  await expect(page.getByRole("img", { name: "Børning 2" })).toBeVisible();
});
