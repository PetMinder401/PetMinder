'use strict';

module.exports = {};

const Medication = require('../../model/medication');
const Reminder = require('../../model/reminder');
const UserModel = require('../../model/userModel');
const Pet = require('../../model/pet');
const faker = require('faker');

const mocks = module.exports = {};
mocks.auth = {};

mocks.auth.createOne = function() {
  let result = {};

  let user = new UserModel({
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phoneNumber: faker.phone.phoneNumber(),
  });

  return user.generatePasswordHash(user.password)

    .then(user => result.user = user)
    .then(user => user.generateToken())
    .then(token => result.token = token)
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
      return result;
    });
};

// mocks.medication = {};
// mocks.medication.createOne = function(){
//   let result = {};


//   return mocks.auth.createOne()
//     .then(user => result.user = user)
//     .then(user => {
//       return new Medication({
//         name: faker.internet.userName(),
//         dosage: faker.random.number({min:1, max:3}),
//         userId: user.user._id,
//       }).save();
//     })
//     .then(medication => {
//       result.medication = medication;
//       return result;
//     });
// };


mocks.reminder = {};
mocks.reminder.createOne = () => {
  let result = {};

  let med = new Medication({
    name: faker.internet.userName(),
    dosage: faker.random.number({min: 1, max: 3}),
  });
  console.log('medication', med);
  return mocks.pet.createOne()
    .then(data => result = data)
    .then(data => {
      console.log('data', data);
      let reminder = new Reminder({
        userId: result.pet.userId,
        petId: result.pet._id,
        medication : med._id,
        frequency : 1,
        times: faker.random.number({min:1, max:3}),
        counter : faker.random.number({min:1, max:3}),
      });
      console.log('reminder', reminder);
      return reminder.generateReminderTimes(reminder.times)
        .then(reminder => result.reminder = reminder)
        .then(reminder => reminder.createEndDate())
        .then(enddate => result.reminder.enddate = enddate)
        .then(() => {
          return result;
        });
    });
};

mocks.auth.removeAll = () => Promise.all([UserModel.remove()]);
mocks.pet.removeAll = () => Promise.all([Pet.remove()]);
// mocks.medication.removeAll = () => Promise.all([Medication.remove()]);
mocks.reminder.removeAll = () => Promise.all([Reminder.remove()]);