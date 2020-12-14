/// <reference types="Cypress" />

/**
 *  Test case to test the Login functionality is working as desired or not.
 */

describe('Testing login functionality on teamie-next.teamieapp.com', () => {
	beforeEach(() => {
		cy.visit(Cypress.config().baseUrl, { timeout: 80000 })
	})

	const username = Cypress.env('username')
	const password = Cypress.env('password')

	it('User should successfully able to login to teamie site using the correct login credentials', () => {
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
			.type(username)
		cy.get('input[placeholder="Password"]')
			.should('exist')
			.click()
			.type(password)
		cy.get('#edit-submit').should('exist').click()
		cy.get('.no-classrooms-error > :nth-child(1)', { timeout: 50000 })
			.should('exist')
			.should('have.text', 'You are not part of any group.')
		cy.get('.no-classrooms-error > :nth-child(2) > div')
			.should('exist')
			.should(
				'have.text',
				'To start learning, enrol into groups from the Classroom Catalogue'
			)
		cy.get('.no-classrooms-error > :nth-child(2) > .btn')
			.should('exist')
			.should(
				'have.text',
				'\n            View Classroom Catalogue\n            '
			)
		cy.get('.newsfeed-text > strong')
			.should('exist')
			.should('have.text', 'Newsfeed')
		cy.get('.btn.btn-sm.btn-default').eq(1).should('exist')
                cy.get('.btn.btn-sm.btn-default').should('exist')
                cy.url().should('deep.equal', `${Cypress.config().baseUrl}dash/#/`)
                cy.screenshot()
	})
})
