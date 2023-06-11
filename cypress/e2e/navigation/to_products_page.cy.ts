describe("Navigation to Products Page from 'Find Products' Button", () => {
  it("Clicking on menu component to select Sign In option", () => {
    cy.visit("/");
    cy.contains("Find Products").click();
    cy.url().should("equal", "http://localhost:3000/products");
  });
});
describe("Navigation to Products Page from Product List", () => {
  it("Clicking on menu component to select Sign In option", () => {
    cy.visit("/");
    cy.contains("View All").click();
    cy.url().should("equal", "http://localhost:3000/products");
  });
});
