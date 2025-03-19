import type {} from 'cypress'
import type {} from '../support/cypress';

describe('dragging and modals test', () => {

  beforeEach(() => {
    cy.setCookie('accessToken', 'test-accessToken');
    cy.setCookie('refreshToken', 'test-refreshToken');
  })

  it('test user path from clicking on an ingredient, draggin ingredients container to confirming the order', () => {
    cy.prepare()
    cy.get('[data-id="drag-element"]').first().as('bunElement')
    cy.get('[data-id="drag-element"]').last().as('mainElement')
    cy.get('[data-id="drop-container"]').as('dropContainer')
    cy.get('[data-id="drop-container"] button').as('orderButton')

    cy.get('@bunElement').click()
    cy.get('[data-id="modal"]').contains('Краторная булка N-200i')
    cy.get('[data-id="close-modal"]').click()

    const dataTransfer = new DataTransfer();

    cy.get('@bunElement')
      .trigger('dragstart', { dataTransfer });

    cy.get('@dropContainer')
      .trigger('drop', { dataTransfer })
      .trigger('dragend', { dataTransfer });

    cy.get('@dropContainer')
      .should('contain', 'Краторная булка N-200i');

    cy.get('@mainElement')
    .trigger('dragstart', { dataTransfer });

    cy.get('@dropContainer')
      .trigger('drop', { dataTransfer })
      .trigger('dragend', { dataTransfer });

    cy.get('@dropContainer')
      .should('contain', 'Биокотлета из марсианской Магнолии');

    cy.get('@orderButton').click()
    cy.get('[data-id="modal"]').contains('71620')
  })
})