describe('Parcours utilisateur - Créer un compte et naviguer', () => {
  beforeEach(() => {
    // Mock de l’API des FAQs
    cy.intercept('POST', '**/auth/register').as('register');
    cy.intercept('POST', '**/auth/login').as('login');
    cy.intercept('GET', '**/faqs').as('getFaqs');
    cy.intercept('GET', '**/chiens').as('getChiens');
  });

  it('devrait créer un compte, visiter FAQ puis page Chiens', () => {
    // 1️⃣ Aller à la page d’inscription
    cy.visit('/signup');

    // 2️⃣ Remplir le formulaire
    const email = `test${Date.now()}@test.com`;
    cy.get('#email').type(email);
    cy.get('#password').type('Test1234!');
    cy.get('#confirmPassword').type('Test1234!');

    // 3️⃣ Cliquer sur le bouton "S'enregistrer"
    cy.contains("S'enregistrer").click();

    // 4️⃣ Vérifier qu’on est redirigé vers la page d’accueil
    cy.wait('@register');
    cy.wait('@login');

    cy.window().then(win => {
      expect(win.localStorage.getItem('token')).to.exist;
    });

    // 5️⃣ Cliquer sur le bouton FAQ dans la navbar
    cy.get('i.pi-question').parent().click();
    cy.url().then(url => {
      console.log('URL après clic sur FAQ :', url);
    });

    // 6️⃣ Attendre l'appel d'API et afficher la page FAQ
    cy.wait('@getFaqs');
    cy.url().should('include', '/faq');

    cy.contains('En quoi abandonné son chien en foret est mal ?', { timeout: 10000 }).should('exist');

    // 8️⃣ Aller à la page chiens
    cy.visit('/chiens');
    cy.url().should('include', '/chiens');

    // 9️⃣ Vérifier un contenu de la page chiens
    cy.get('app-chien-card').first().click();
  });
});