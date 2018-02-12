'use strict';

const UserModel = require('../../model/userModel');
const faker = require('faker');
const Pet = require('../../model/pet');

const mocks = module.exports = {};
mocks.userModel = {};

mocks.userModel.createOne = () => {
  let result = {};
  result.password = faker.internet.password();

  return new UserModel({
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  })
    .generatePasswordHash(result.password)
    .then(user => result.user = user)
    .then(user => user.generateToken())
    .then(token => result.token = token)
    .then(() => {
      return result;
    });
};

mocks.pet = {};
mocks.pet.createOne = () => {
  let resultMock = null;

  return mocks.userModel.createOne()
    .then(createdUserMock => resultMock = createdUserMock)
    .then(createdUserMock => {
      return new Pet({
        name: faker.name.firstName(),
        species: faker.random.words(1),
        age: faker.random.number({min:1, max:15}), //age 1yr-15yrs -liza
        weight: faker.random.number({min:5, max:100}), //weight 5-100lbs -liza
        userId: createdUserMock.user._id,
      }).save();
    })
    .then(pet => {
      resultMock.pet = pet;
      //console.log(resultMock);
      return resultMock;
    });
};

//TODO: add mocks for reminder

mocks.userModel.removeAll = () => Promise.all([UserModel.remove()]);