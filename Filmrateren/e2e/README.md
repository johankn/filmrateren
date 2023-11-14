# end-2-end testing with Playwright 

This folder contains end-to-end tests for our project using Playwright. Playwright provides good TypeScript support, making it a suitable choice for this TypeScript project.


### Running the tests
Commands for running the tests are found in the table below, do them from the root folder of the project.

| <div style="width:190px">Command</div>| Action |
| :---------------------- | :----------------------------------------------------------------- |
| ` npm install` | Install the necessary dependencies. |
| ` npx playwright test` | Runs all the playwright tests.
| ` npx playwright show-report` | To open the HTML report of the last test. |
| ` npx playwright test --ui` | Run the tests in Playwright's UI-mode.


*These e2e-tests will be run on the deployed version of the project, which is found at http://it2810-05.idi.ntnu.no/project2. Make sure to be connected to NTNU network or VPN when running the e2e-tests.*



