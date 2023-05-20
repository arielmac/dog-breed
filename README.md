# Dog Breed Search App for Dog Enthusiasts! 
We built this application to help you search for a dog breed that suits your liking!  
It showcase 15 dogs per page.

## Features
1. Search Dogs
2. Sort by Name, Life Span, or Height
3. Pagination
4. Image dynamic loading
5. Debounce for 1000ms while typing on search bar or sorting
6. Unit tests

## Getting Started

First, run the development server:
```bash
npm run build
npm run dev
```
In your browser, visit [http://localhost:3000](http://localhost:3000) <br/><br/>


## Unit Tests using Cypress

First, build the files:
```bash
npm run build
```
Run the development server:
```bash
npm run build
```
Run the test script in the `new terminal`
```bash
npm run test
```

This will open a new browser window and run Cypress the specs in the `/cypress/e2e/dog-breed.cy.js`  

In the browser:

> 1. Click on `E2E Testing`
> 2. Click on `Start E2E Testing in Chrome` button
> 3. Click on `dog-breed.cy.js` link

<br>

### Test Specs
1. Should assert that names contain `Bulldog` after typing `Bulldog` in the search bar.
2. Should sort the **Name** column in descending order after clicking on the **Name** column header.
3. Should sort the **Life Span** in descending order after clicking on the **Life Span** column header.
4. Should sort the **Height** span column in descending order after clicking on the **Height** column header.
5. Should debounce the input event **after 1000ms**; and not debounce if **below 1000ms**.