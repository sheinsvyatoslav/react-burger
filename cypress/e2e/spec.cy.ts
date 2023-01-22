/// <reference types="cypress" />
import "@4tw/cypress-drag-drop";
import * as selectors from "./selectors";
import { testUserEmail, testUserPassword, URL } from "./constants";

describe("test burger constructor", () => {
  before(() => {});

  it("create order", () => {
    cy.visit(`${URL}/login`);

    cy.get(selectors.loginEmailInput).type(testUserEmail);
    cy.get(selectors.loginPasswordInput).type(testUserPassword);
    cy.get(selectors.loginButton).click();

    cy.get(selectors.burgerSectionBuns)
      .find(selectors.ingredientCard)
      .first()
      .drag(selectors.burgerConstructorContainer);
    cy.get(selectors.burgerSectionSauces)
      .find(selectors.ingredientCard)
      .first()
      .drag(selectors.burgerConstructorContainer);
    cy.get(selectors.createOrderButton).click();
    cy.get(selectors.orderNumber, { timeout: 30000 }).should("be.visible");
  });

  it("check ingredient modals", () => {
    cy.visit(URL);

    cy.get(selectors.burgerSectionBuns)
      .find(selectors.ingredientCard)
      .first()
      .then((element) => {
        const name = element.find(selectors.ingredientCardName).text();
        element.trigger("click");
        cy.get(selectors.ingredientDetailsName).should("have.text", name);
        cy.get(selectors.closeModalButton).filter(":visible").click();
      });
  });
});
