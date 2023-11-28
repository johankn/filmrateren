# end-2-end testing with Playwright 

This folder contains end-to-end tests for our project using Playwright. Playwright uses TypeScript as its default language, making it a suitable choice for our TypeScript project. The tests will be executed with max 3 retries each, in case of flakiness.


### Running the tests
Commands for running the tests are found in the table below, do them from the root folder of the project (cd Filmrateren).

| <div style="width:190px">Command</div>| Action |
| :---------------------- | :----------------------------------------------------------------- |
| ` npx playwright install` | Install the necessary dependencies. |
| ` npx playwright test` | Runs all the playwright tests.
| ` npx playwright show-report` | To open the HTML report of the last test. |
| ` npx playwright test --ui` | Run the tests in Playwright's UI-mode.


*These e2e-tests will be run on the deployed version of the project, which is found at http://it2810-05.idi.ntnu.no/project2. Make sure to be connected to NTNU network or VPN when running the e2e-tests.*

## Read about some of the challenges we faced when writing the tests [here](../README.md?ref_type=heads#4-utvikling-og-testing).


