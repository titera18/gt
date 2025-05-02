describe('Atualizar Reserva', () => {
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
  
    it('Deve autenticar uma reserva', () => {
      const username = 'admin'
      const password = 'password123'
  
      authAPI(username, password).then((token) => {
        cy.request({
          method: 'PUT',
          url: `https://restful-booker.herokuapp.com/booking/2`,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': `token=${token}`
          },
          body: {
            firstname: 'Joseph',
            lastname: 'Jhonson',
            totalprice: 350,
            depositpaid: true,
            bookingdates: {
              checkin: '2025-04-12',
              checkout: '2025-04-20'
            },
            additionalneeds: 'Breakfast'
          }
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.firstname).to.eq('Joseph')
          expect(response.body.lastname).to.eq('Jhonson')
          expect(response.body.bookingdates.checkin).to.eq('2025-04-12')
          expect(response.body.bookingdates.checkout).to.eq('2025-04-20')
          expect(response.body.additionalneeds).to.eq('Breakfast')
        })
      })
    })
  })
  