describe('Opening the carrousel', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/')
    })
    it('Should open city image', () => {
        cy.get('[data-test=logo]')
            .should('exist')
            .and('be.visible');

        cy.url().should('include', '/City')

        cy.get('[data-test=controls]')
            .should('exist');

        cy.get('[data-test=right-button]', { timeout: 5000 })
            .should('exist')
            .and('be.visible');

        cy.get('[data-test=description]')
            .should('exist')
            .and('be.visible');
    })

    it('Should open next image on next click', () => {
        cy.get('[data-test=right-button]', { timeout: 5000 })
            .should('exist')
            .and('be.visible')
            .click();

        cy.url().should('include', '/Hills')
    })

})
