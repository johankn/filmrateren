# Project 2 - Filmrateren

### The documentation for the project can be found [here](/Filmrateren/README.md). This is written in Norwegian. 

## Link to the project hosted by our virtual machine (must be on NTNU network)


http://it2810-05.idi.ntnu.no/project2/


The backend server is run by our virtual machine, and is ready at http://it2810-05.idi.ntnu.no:4000/graphql.


## Run it all locally

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-5/prosjekt-2.git
```


Navigate to the project directory:

```bash
cd Filmrateren/
```


### 2. Navigate to the backend-repository and start the server by running the following commands:


```bash
cd backend
npm install
npm start
```

### 3. In a new terminal, navigate to the frontend-repository and start the client by running the following commands:

```bash
cd frontend
npm install
npm run dev
```

Then, open local host (as shown in terminal) with your browser to view the project.

### 4. Run the components tests we have so far:

```bash
cd frontend
npm install
npm run test
```

### 5. Run all the playwright tests (e2e). Make sure to do it from the root folder of the project:

```bash
npx playwright install
npx playwright test
```
*To run the tests in Playwright's UI-mode, use the following command:*
```bash
npx playwright install
npx playwright test --ui
```

**Read more about the e2e-tests [here](/Filmrateren/e2e/).**
