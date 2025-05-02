describe('Criar Reserva', () => {
  it('Deve criar uma nova reserva', () => {
    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/booking',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
          "checkin": "2018-01-01",
          "checkout": "2019-01-01"
        },
        "additionalneeds": "Breakfast"
      }
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 201])

      expect(response.body).to.have.property('bookingid')
      expect(response.body).to.have.property('booking')

      expect(response.body.booking.firstname).to.equal('Jim')
      expect(response.body.booking.lastname).to.equal('Brown')
      expect(response.body.booking.totalprice).to.equal(111)
      expect(response.body.booking.depositpaid).to.equal(true)
      expect(response.body.booking.bookingdates.checkin).to.equal('2018-01-01')
      expect(response.body.booking.bookingdates.checkout).to.equal('2019-01-01')
      expect(response.body.booking.additionalneeds).to.equal('Breakfast')

    })
  })
})
