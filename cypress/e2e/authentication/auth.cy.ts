describe("Sign In User Flow", () => {
  it("Clicking on menu component to select Sign In option", () => {
    cy.visit("/auth/signin");
    // Get an input, type into it
    cy.get("form").within(() => {
      cy.get('input[name="email"]').type("test@test.com");
      cy.get('input[name="password"]').type("test1234");
      cy.root().submit();
    });
    cy.url().should("equal", "http://localhost:3000/");
  });
});
describe("Sign Up and Sign In", () => {
  it("Clicking on menu component to select Sign In option", () => {
    cy.visit("/auth/signup");
    // Get an input, type into it
    cy.get("form").within(() => {
      cy.get('input[name="name"]').type("test cy");
      cy.get('input[name="email"]').type("testcy@test.com");
      cy.get('input[name="password"]').type("test1234");
      cy.root().submit();
    });
    cy.url().should("equal", "http://localhost:3000/auth/signin");
    cy.get("form").within(() => {
      cy.get('input[name="email"]').type("testcy@test.com");
      cy.get('input[name="password"]').type("test1234");
      cy.root().submit();
    });
    cy.url().should("equal", "http://localhost:3000/");
  });
});

// describe("Navigation to Products Page", () => {
//   it("Clicking 'View All' navigates to products page.", () => {
//     cy.visit("http://localhost:3000");
//     cy.contains("View All").click();
//     // Should be on a new URL which
//     // includes '/products'
//     cy.url().should("include", "/products");
//   });
// });
