describe('Validar Usuário Logado', () => {
  function fazerLogin(username, password) {
    cy.visit('https://www.demoblaze.com');
    cy.get('#login2').click();
  
    cy.get('#loginusername').then(($input) => {
      for (let letra of username) {
        cy.wrap($input).type(letra, { delay: 50 });
      }
    });
  
    cy.get('#loginpassword').then(($input) => {
      for (let letra of password) {
        cy.wrap($input).type(letra, { delay: 50 });
      }
    });
  
    cy.get('button[onclick="logIn()"]').click();
  }

  it('validar login sucedido', () => {
    const username = 'teste3238';
    const password = 'abc123!@';
  
    fazerLogin(username, password);
  
    cy.get('#nameofuser', { timeout: 5000 }).should('contain', username);
    cy.get('#logout2').should('be.visible');  });
});
