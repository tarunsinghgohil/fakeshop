describe('Basic shop flows', () => {
  it('loads home page', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Products');
  });

  it('opens product and adds to cart', () => {
    cy.visit('http://localhost:5173/');
    cy.get('a[aria-label]').first().click();
    cy.contains('Add to MyCart').click();
    cy.visit('http://localhost:5173/cart');
    cy.contains('My Cart');
  });
});
