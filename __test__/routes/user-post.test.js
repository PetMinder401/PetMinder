'use strict'

const superagent = require('superagent')
const faker = require('faker')
const userModel = require('../../model/userModel')
const server = require('../../lib/server')

require('jest')


  describe('POST /signup', function() {
  beforeAll(() => this.mockUser = {"username": faker.internet.userName(),"email": faker.internet.email(), "password": faker.internet.email()})
  beforeAll(() => server.start())
  afterAll(() => server.stop())

  describe('valid requests', () => {
    beforeAll(() => {
      return superagent.post(`:${process.env.PORT}/api/v1/signup`)
      .send(this.mockUser)
      .then(res => this.response = res)
    })

    it('should return a status code of 201 CREATED', () => {
      expect(this.response.status).toBe(201)
    })

  })


  describe('valid requests', () => {
    beforeAll(() => {
      return superagent.post(`:${process.env.PORT}/api/v1/signup`)
      .send()
      .then(res => this.response = res)
      .catch(function(err) {
          // err.message, err.response
          // expect(this.response.status).toBe(401)
       })

    })

    it('should return a status code of 401 CREATED', () => {
      expect(this.response.status).toBe(401)
    })

  })








});