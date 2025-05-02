describe('Criar uma nova conta de usuário no site https://www.demoblaze.com/index.html', () => {
  it('Criar conta com sucesso', () => {
    let username = 'teste32388';
    let password = 'abc123!@';

    cy.visit('https://www.demoblaze.com/index.html');
    cy.get('#signin2').click();

    cy.get('#sign-username').then(($input) => {
      for (let letra of username) {
        cy.wrap($input).type(letra, { delay: 5 });
      }
    });
    cy.get('#sign-username').should('have.value', username);

    cy.get('#sign-password').then(($input) => {
      for (let letra of password) {
        cy.wrap($input).type(letra, { delay: 5 });
      }
    });
    cy.get('#sign-username').should('have.value', username);

    cy.get('#sign-password').then(($input) => {
      for (let letra of password) {
        cy.wrap($input).type(letra, { delay: 5 });
      }
    });

    cy.intercept('POST', 'https://api.demoblaze.com/signup').as('signup');
    cy.wait('@signup').then((intercept) => {
      expect(intercept.response.statusCode).to.eq(200);
    });

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('Sign up successful');
    });
  });
});
