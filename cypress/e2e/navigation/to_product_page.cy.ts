describe("Navigation to Products Page from 'Find Products' Button", () => {
  it("Clicking on menu component to select Sign In option", () => {
    cy.visit("/");
    cy.get("[href='/products/mp7_-_bloodsportn-wc3_uhchdo5i6yo__xj']")
    .click();
    cy.url().should("include", "http://localhost:3000/products/");
  });
});
