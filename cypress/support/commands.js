// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import 'cypress-file-upload'
import 'cypress-layout-inspector/add-support'
import '@percy/cypress'

Cypress.Commands.add('cleanUpXHR', () => {
	if (Cypress.env('run_all_suite')) {
		cy.visit(`${Cypress.env('https://app.sellgo-dev.com/')}/404`, {
			failOnStatusCode: false,
		})
	}
})

/**
 * Login function which can be used all across the test cases to avoid code repetition
 */
Cypress.Commands.add('login', (username, password) => {
	cy.clearCookies()
	cy.clearLocalStorage()
	cy.get('input[placeholder="name@domain.com"]').click().type(username)
	cy.get('input[type="password"]').click().type(password)
	cy.contains('Log in').click()
})

Cypress.Commands.add('login_page', (username, password) => {
	cy.clearCookies()
	cy.clearLocalStorage()
	cy.get(':nth-child(1) > .ui > input').click().type(username)
	cy.get(':nth-child(2) > .ui > input').click().type(password)
	cy.contains('Log in').click()
})

Cypress.Commands.add('chance', (...args) => {
	return cy.task('chance', ...args)
})

Cypress.on('uncaught:exception', (err, runnable) => {
	// returning false here prevents Cypress from
	// failing the test
	return false
})

Cypress.Commands.add(
	'register',
	(username, first_name, last_name, password) => {
		cy.get('.form > :nth-child(1) > .ui > input').as('email')
		cy.get('@email').click().type(username)
		cy.get('.fields > :nth-child(1) > .ui > input').as('first_name')
		cy.get('@first_name').click().type(first_name)
		cy.get(':nth-child(2) > .ui > input').as('last_name')
		cy.get('@last_name').click().type(last_name)
		cy.get('#password').as('password')
		cy.get('@password').click().type(password)
		cy.get('.signup-container__form__signup > .ui').as('register')
		cy.get('@register').click()
	}
)

Cypress.Commands.add(
	'make_payment_registered_user',
	(
		MOCK_CC_NUMBER,
		MOCK_CC_EXP,
		MOCK_CC_CVC,
		name_on_card,
		address,
		city,
		state,
		zipcode
	) => {
		cy.get('.__PrivateStripeElement iframe' , { timeout: 60000 })
			.should('exist')
			.then($iframe => {
				cy.wrap($iframe.contents()[0].body)
					.find('input[name="cardnumber"]')
					.type(MOCK_CC_NUMBER)
				cy.wrap($iframe.contents()[1].body)
					.find('input[name=exp-date]')
					.type(MOCK_CC_EXP)
				cy.wrap($iframe.contents()[2].body)
					.find('input[name=cvc]')
					.type(MOCK_CC_CVC)
			})
		cy.get(
			'.payment-container__stripe-checkout-form__group-1__card-name > .ui > input'
		)
			.should('exist')
			.type(name_on_card)
		cy.get('.payment-container__stripe-checkout-form__address > .ui > input')
			.should('exist')
			.type(address)
		cy.get(
			'.payment-container__stripe-checkout-form__group-2__city > .ui > input'
		)
			.should('exist')
			.type(city)
		cy.get(
			'.payment-container__stripe-checkout-form__group-2__state > .ui > input'
		)
			.should('exist')
			.type(state)
		cy.get(
			'.payment-container__stripe-checkout-form__group-3__zipcode > .ui > input'
		)
			.should('exist')
			.type(zipcode)
		cy.get(
			'.payment-container__stripe-checkout-form__buttons > .field > .ui'
		).click({ force: true })
	}
)

Cypress.Commands.add(
	'make_payment_new_user',
	(
		MOCK_CC_NUMBER,
		MOCK_CC_EXP,
		MOCK_CC_CVC,
		name_on_card,
		address,
		city,
		state,
		zipcode
	) => {
		cy.get('.__PrivateStripeElement > iframe' , { timeout: 60000 })
			.should('exist')
			.then($element => {
				const $body = $element.contents().find('body')
				let stripe = cy.wrap($body)
				stripe
					.find('[name="cardnumber"]')
					.eq(0)
					.click({ force: true })
					.type(MOCK_CC_NUMBER)
				stripe = cy.wrap($body)
				stripe
					.find('[name="exp-date"]')
					.click({ force: true })
					.type(MOCK_CC_EXP)
				stripe = cy.wrap($body)
				stripe.find('[name="cvc"]').click({ force: true }).type(MOCK_CC_CVC)
			})
		cy.get(
			'.payment-container__stripe-checkout-form__group-1__card-name > .ui > input'
		).type(name_on_card)
		cy.get(
			'.payment-container__stripe-checkout-form__address > .ui > input'
		).type(address)
		cy.get(
			'.payment-container__stripe-checkout-form__group-2__city > .ui > input'
		).type(city)
		cy.get(
			'.payment-container__stripe-checkout-form__group-2__state > .ui > input'
		).type(state)
		cy.get(
			'.payment-container__stripe-checkout-form__group-3__zipcode > .ui > input'
		).type(zipcode)
		cy.get(
			'.payment-container__stripe-checkout-form__buttons > .field > .ui'
		).click({ force: true })
	}
)
Cypress.Commands.add('iframe', { prevSubject: 'element' }, $iframe => {
	return new Cypress.Promise(resolve => {
		$iframe.ready(function () {
			resolve($iframe.contents().find('body'))
		})
	})
})
