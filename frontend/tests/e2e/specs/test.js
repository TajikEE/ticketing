// https://docs.cypress.io/api/introduction/api.html

describe("Test input edit component ", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });

  it("Visits the home page", () => {
    cy.contains("button", "Create ticket");
  });
});
