describe('Excluir Reserva', () => {
    function authAPI(username, password) {
      return cy.request({
        method: 'POST',
        url: 'https://restful-booker.herokuapp.com/auth',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          username,
          password
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body.token
      })
    }
  
    it('Deve excluir uma reserva', () => {
      const username = 'admin'
      const password = 'password123'
  
      authAPI(username, password).then((token) => {
        cy.request({
          method: 'DELETE',
          url: 'https://restful-booker.herokuapp.com/booking/3',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${token}`
          }
        }).then((response) => {
          expect(response.status).to.eq(201)
        })
      })
    })
  })
  