describe('Parcours utilisateur - Créer un compte et naviguer', () => {
  beforeEach(() => {
    // Mock de l’API des FAQs
    cy.intercept('POST', '**/auth/register').as('register');
    cy.intercept('POST', '**/auth/login').as('login');
    cy.intercept('GET', '**/faqs').as('getFaqs');
    cy.intercept('GET', '**/chiens').as('getChiens');
  });

  it('devrait créer un compte, visiter FAQ puis page Chiens', () => {
    cy.visit('/signup');

    const email = `test${Date.now()}@test.com`;
    cy.get('#email').type(email);
    cy.get('#password').type('Test1234!');
    cy.get('#confirmPassword').type('Test1234!');

    cy.contains("S'enregistrer").click();

    cy.wait('@register');
    cy.wait('@login');

    cy.window().then(win => {
      expect(win.localStorage.getItem('token')).to.exist;
    });

    cy.get('i.pi-question').parent().click();

    cy.wait('@getFaqs');
    cy.url().should('include', '/faq');

    cy.contains('En quoi abandonné son chien en foret est mal ?', { timeout: 10000 }).should('exist');

    cy.visit('/chiens');
    cy.url().should('include', '/chiens');

    cy.get('app-chien-card').first().click();
  });
});