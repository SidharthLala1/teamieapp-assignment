/// <reference types="Cypress" />

/**
 *  Test case to test the Login functionality is working as desired or not.
 */

describe('Testing blocked user login functionality on teamieapp.com', () => {
	beforeEach(() => {
		cy.visit(Cypress.config().baseUrl, { timeout: 80000 })
	})

	const blocked_username = Cypress.env('blocked_username')
	const blocked_password = Cypress.env('blocked_password')

    it('User should not be able to login to the teamieapp.com with the blocked username and password ', () => {
        cy.get('.site-slogan', { timeout: 50000 })
			.should('exist')
			.should('have.text', 'The Collaborative Learning Network')
		cy.get('.site-sub-slogan')
			.should('exist')
			.should('have.text', 'Do or do not. There is no try.')
		cy.get('.pull-left').should('be.visible').should('have.text', 'Register')
		cy.get('.offsetfull2 > .pull-right')
			.should('be.visible')
			.should(
				'have.text',
				'Parents, click this link if you forgot your password'
			)
		cy.get('#edit-t-o365-sso-client-submit')
			.should('be.visible')
			.should('have.value', 'Login with Office365 account')
		cy.get('[href="/t-gsso/oauth2/connect?destination=/"]')
			.should('be.visible')
			.should('have.text', 'Login with your Google account')
		cy.get('[href="/t-azure-b2c/oauth2/connect"]')
			.should('be.visible')
			.should('have.text', 'Login with Azure AD B2C')
		cy.get('input[placeholder="Username or Email"]', { timeout: 50000 })
			.should('exist')
			.click()
			.type(blocked_username)
		cy.get('input[placeholder="Password"]')
			.should('exist')
			.click()
			.type(blocked_password)
	cy.get('#edit-submit').should('exist').click()
	cy.get('.messages').should('be.visible')
	.should('have.text' , '\nError message\nSorry, unrecognized username or password. Have you forgotten your password?×')
	cy.screenshot()			
    })


})