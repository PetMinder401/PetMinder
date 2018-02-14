// Need to create meds mock

// 'use strict';

// const faker = require('faker');
// const mocks = require('../lib/mocks');
// const superagent = require('superagent');
// const server = require('../../lib/server');
// require('jest');

// let port = process.env.PORT;
// let api = `:${port}/api/v1/pet`;



// describe('POST /api/v1/pets', function() {
//   beforeAll(() => server.start());
//   afterAll(() => server.stop());
//   afterAll(() => mocks.userModel.removeAll());
//   afterAll(() => mocks.pet.removeAll());

//   describe('Valid Request and Response', () => {
//     beforeAll(() => {
//       return mocks.pet.createOne()
//         .then(mock => {
//           this.mockData = mock;
//         });
//     });

//     it('Should return a status code of 201', () => {
//       console.log('scott was here', this.mockData.user);

//       return superagent.post(`${api}`)
//         .set('Authorization', `Bearer ${this.mockData.user.token}`)
//         .send({
//           name: faker.name.firstName(),
//           species: faker.random.words(1),
//           age: faker.random.number({min:1, max:15}),
//           weight: faker.random.number({min:5, max:100}), 
//           userId: this.mockData.user.user._id,
//         })
//         .then(res => {
//           expect(res.status).toEqual(201);
//         });
//     });
//   });
// });