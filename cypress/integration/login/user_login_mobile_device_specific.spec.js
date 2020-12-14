const sizes = [
	'iphone-6',
	'ipad-2',
	'iphone-5',
	'iphone-xr',
	'iphone-6',
	'ipad-mini',
	'samsung-note9',
	'samsung-s10',
	'iphone-x',
]

describe('Testing login feature for active and blocked user on teamieapp for diffrent sizes', () => {
	const username = Cypress.env('username')
	const password = Cypress.env('password')
	const blocked_username = Cypress.env('blocked_username')
	const blocked_password = Cypress.env('blocked_password')
	sizes.forEach(size => {
		it(`Should display login screen perfectly for active user diffrent ${size} screen`, () => {
			if (Cypress._.isArray(size)) {
				cy.viewport(size[0], size[1])
			} else {
				cy.viewport(size)
			}

			cy.visit(Cypress.config().baseUrl)
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
			cy.screenshot({ timeout: 50000 })
		})

		it('Should not allow blocked user to login', () => {
			if (Cypress._.isArray(size)) {
				cy.viewport(size[0], size[1])
			} else {
				cy.viewport(size)
			}
			cy.visit(Cypress.config().baseUrl)
			cy.get('input[placeholder="Username or Email"]', { timeout: 50000 })
				.should('exist')
				.click()
				.type(blocked_username)
			cy.get('input[placeholder="Password"]')
				.should('exist')
				.click()
				.type(blocked_password)
			cy.get('#edit-submit').should('exist').click()
			cy.get('.messages')
				.should('be.visible')
				.should(
					'have.text',
					'\nError message\nSorry, unrecognized username or password. Have you forgotten your password?×'
				)
				cy.screenshot({ timeout: 50000 })
		})
	})
})
