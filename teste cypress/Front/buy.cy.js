describe('Efetuar Compra de Produto', () => {

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


  function validarUsuarioLogado(username) {
    cy.get('#nameofuser', { timeout: 5000 }).should('contain', username);
    cy.get('#logout2').should('be.visible');
  }
  

  it('Deve efetuar a compra de um produto com sucesso', () => {
    const username = 'teste3238';
    const password = 'abc123!@';

    fazerLogin(username, password);
    validarUsuarioLogado(username)

    cy.contains('.card-title', 'Nexus 6').click();
    cy.get('.btn-success').click();
    cy.on('window:alert', (str) => {
      expect(str).to.contain('Product added');
    });
    cy.get('#cartur').click();

    cy.contains('td', 'Nexus 6').should('exist');

    cy.contains('button', 'Place Order').click();

    cy.get('#name').type('Testeiro Teste');
    cy.get('#country').type('Brasil');
    cy.get('#city').type('Curitiba');
    cy.get('#card').type('12345678');
    cy.get('#month').type('01');
    cy.get('#year').type('2025');

    cy.contains('button', 'Purchase').click();

    cy.get('.sweet-alert').should('be.visible');
    cy.get('.sweet-alert').should('contain', 'Thank you for your purchase!');
  });
});