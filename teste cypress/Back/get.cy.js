describe('Consultar Reserva', () => {
  it('Deve consultar uma reserva com sucesso', () => {
    cy.request({
      method: 'GET',
      url: 'https://restful-booker.herokuapp.com/booking/2',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})