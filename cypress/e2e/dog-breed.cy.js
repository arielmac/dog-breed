import { debounce } from '../../src/app/assets/utils';

describe('The Dog Breed Homepage Test', () => {
  beforeEach(() => {
    // Visits The Dog Breed Search Homepage before each test
    cy.visit('http://localhost:3000');
    cy.wait(3000);
    
    // 'Type on the search input check the result'
    cy.get('.dogs__search-input').type('Bulldog');
    cy.intercept('GET', '**/*').as('networkRequests');
    cy.wait('@networkRequests');
    cy.wait(2000)
  })

  it('Should assert that names contain Bulldog', () => {
    cy.wait(2000)
    // Check the result
    cy.get('tbody tr').find('td[data-column="name"] span.dogs__name').then((nameCells) => {
      // Get all values of name and assert
      Array.from(nameCells).map((cell) => expect(cell.textContent.trim()).to.contain('Bulldog'));
    });
  });

  it('Should sort the Name column in descending order', () => {
    cy.wait(2000)
    // Click on the name column header to trigger the sorting
    cy.get('th[data-column="name"]').click();
    // Wait for all network calls to finish
    cy.intercept('GET', '**/*').as('networkRequests');
    cy.wait('@networkRequests');

    cy.wait(2000)
    // Get all the name values from the table rows
    cy.get('tbody tr').find('td[data-column="name"] span.dogs__name').then((nameCells) => {
      // Get all values of name and put in array
      const nameArray = Array.from(nameCells).map((cell) => cell.textContent.trim());
      const sortedValues = [...nameArray].sort((a, b) => b.localeCompare(a));
      expect(nameArray).to.deep.equal(sortedValues);
    });
  })

  it('Should sort the Life Span in ascending order', () => {
      cy.wait(2000)
      // Click on the lifespan column header to trigger the sorting
      cy.get('th[data-column="lifespan"]').click();
      // Wait for all network calls to finish
      cy.intercept('GET', '**/*').as('networkRequests');
      cy.wait('@networkRequests');
  
      cy.wait(2000)
      // Get all the lifespan values from the table rows
      cy.get('tbody tr').find('td[data-column="lifespan"]').then((lifespanCells) => {
        // Get all values of lifespan and put in array
        const lifespanArray = Array.from(lifespanCells).map((cell) => cell.textContent.trim());
        const sortedValues = [...lifespanArray].sort((a, b) => parseInt(a.match(/\d+/)) - parseInt(b.match(/\d+/)));
        expect(lifespanArray).to.deep.equal(sortedValues);
      });
  })

  it('Should sort the Height span column in ascending order', () => {
    // Click on the height column header to trigger the sorting
    cy.get('th[data-column="height"]').click();
    // Wait for all network calls to finish
    cy.intercept('GET', '**/*').as('networkRequests');
    cy.wait('@networkRequests');

    cy.wait(2000)
    // Get all the height values from the table rows
    cy.get('tbody tr').find('td[data-column="height"]').then((heightCells) => {
      // Get all values of height and put in array
      const heightArray = Array.from(heightCells).map((cell) => cell.textContent.trim());
      const sortedValues = [...heightArray].sort((a, b) => parseInt(a.match(/\d+/)) - parseInt(b.match(/\d+/)));
      expect(heightArray).to.deep.equal(sortedValues);
    });
  });

  it('Should debounce the input event after 1000; and not debounce if below 1000', () => {
    cy.clock();

    cy.window().then((win) => {
      const debouncedFn = cy.stub().as('debouncedFn');
      const input = win.document.querySelector('.dogs__search-input');

      // Attach the debounced function to the input event
      input.addEventListener('input', debounce(debouncedFn, 1000));

      // Type some input
      cy.get('.dogs__search-input').clear();
      cy.get('.dogs__search-input').type("Husky");

      cy.tick(500);
      // Verify that the debounced function was not called
      cy.get('@debouncedFn').should('not.have.been.called');

      // Fast-forward the clock to trigger the debounced function
      cy.tick(1000);

      // Verify that the debounced function was called
      cy.get('@debouncedFn').should('have.been.calledOnce');
    });
  });
})