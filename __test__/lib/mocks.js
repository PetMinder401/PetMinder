'use strict';

module.exports = {};

const UserModel = require('../../model/userModel');
const faker = require('faker');
const Pet = require('../../model/pet');

const mocks = module.exports = {};
mocks.auth = {};

mocks.auth.createOne = function() {
  let result = {};
  // result.password = faker.internet.password();
  
  // console.log('result password mock', result.password);

  let user = new UserModel({
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phoneNumber: faker.phone.phoneNumber(),
  });

  // console.log('user mock', user);

  return user.generatePasswordHash(user.password)

    .then(user => result.user = user)   
    .then(user => user.generateToken())
    .then(token => result.token = token)
    // .then(console.log('!!!',result))  
    .then(() => {
      return result;
    });
};

mocks.pet = {};
mocks.pet.createOne = () => {
  let result = {};

  return mocks.auth.createOne()
    .then(user => result.user = user)
    .then(user => {
      // console.log(user);
      // console.log('user', Object.keys(user));
      return new Pet({
        name: faker.name.firstName(),
        species: faker.random.words(1),
        age: faker.random.number({min:1, max:15}), //age 1yr-15yrs -liza
        weight: faker.random.number({min:5, max:100}), //weight 5-100lbs -liza
        userId: user.user._id,
      }).save();
    })
    .then(pet => {
      result.pet = pet;
      console.log(result);
      return result;
    });
};

//TODO: add mocks for reminder

mocks.auth.removeAll = () => Promise.all([UserModel.remove()]);
mocks.pet.removeAll = () => Promise.all([Pet.remove()]);