describe('Cenário 2: Testar Login - Caminho Positivo e Negativo', () => {
  const validUsername = 'teste3238';
  const validPassword = 'abc123!@';
  const invalidUsername = 'usuarioIncorreto';
  const invalidPassword = 'senhaErrada';

  it('Caminho Negativo', () => {

    cy.visit('https://www.demoblaze.com/index.html');
    cy.get('#login2').click();
    cy.intercept('POST', 'https://api.demoblaze.com/login').as('login');
  
    cy.get('#loginusername').then(($input) => {
      for (let letra of invalidUsername) {
        cy.wrap($input).type(letra, { delay: 50 });
      }
    });

    cy.get('#loginpassword').then(($input) => {
      for (let letra of invalidPassword) {
        cy.wrap($input).type(letra, { delay: 50 });
      }
    });

    cy.get('button[onclick="logIn()"]').click();

    cy.wait('@login').then((intercept) => {
      const response = intercept.response.body;

      expect(response.errorMessage).to.be.oneOf([
        'Wrong password.',
        'User does not exist.'
      ]);
    });
  });

  it('Caminho Positivo', () => {

    cy.visit('https://www.demoblaze.com/index.html');
    cy.get('#login2').click();
    cy.intercept('POST', 'https://api.demoblaze.com/login').as('login');
  

    cy.get('#loginusername').then(($input) => {
      for (let letra of validUsername) {
        cy.wrap($input).type(letra, { delay: 5 });
      }
    });

    cy.get('#loginpassword').then(($input) => {
      for (let letra of validPassword) {
        cy.wrap($input).type(letra, { delay: 5 });
      }
    });

    cy.get('button[onclick="logIn()"]').click();

    cy.get('#nameofuser', { timeout: 5000 }).should('contain', validUsername);
    cy.get('#logout2').should('exist');
  });
});
