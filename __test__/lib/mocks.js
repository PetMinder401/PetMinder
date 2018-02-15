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

  return new Medication({
    name: faker.internet.userName(),
    dosage: faker.random.number({min: 1, max: 3}),
  }).save()
    .then(medication => result.med = medication)
    .then(() => mocks.pet.createOne())
    .then(data => result.pet = data)      
    .then(() => {
      // console.log('data', result);
      return new Reminder({
        userId: result.pet.pet.userId,
        petId: result.pet.pet._id,
        medication : result.med._id,
        frequency : 1,
        times: faker.random.number({min:1, max:3}),
        counter : faker.random.number({min:1, max:3}),
      }).save();
    })
    .then(reminder => reminder.generateReminderTimes(reminder.times))
    .then(reminder => result.reminder = reminder)
    .then(reminder => reminder.createEndDate())
    .then(enddate => result.reminder.enddate = enddate)
    .then(() => result);

 
};

// data { med: { _id: 5a85d0647aa26c7b1739907d,
//   name: 'Daisy.Auer51',
//   dosage: 2,
//   createdAt: 2018-02-15T18:24:36.454Z,
//   updatedAt: 2018-02-15T18:24:36.454Z,
//   __v: 0 },
// pet:
// { user:
//    { user: [Object],
//      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjFlYTU2OWYzYWViNTdkYzgzMmEzODUyNmM1NWM5ZTMxYTg0YWJmZGQ5NjM3ZDBmMDliYjdlZjRiN2M1MDIwNGViN2MwYWM2NDllN2U3ZTM2ZjM4MjE1ODBhMDk2NGJiNDU5NTY4OWI0MTVhNGFjY2RkZjFiY2IzNDJiMzg3OTFiIiwiaWF0IjoxNTE4NzE5MDc2fQ.2zFfzY05T3m8o5NZ3_aS8Ze1J_UoSNpGyPE3PhP0cYY' },
//   pet: { _id: 5a85d0647aa26c7b1739907f,
//      name: 'Flo',
//      species: 'maroon',
//      age: 9,
//      weight: 58,
//      userId: 5a85d0647aa26c7b1739907e,
//      createdAt: 2018-02-15T18:24:36.544Z,
//      updatedAt: 2018-02-15T18:24:36.544Z,
//      __v: 0 } } }

mocks.auth.removeAll = () => Promise.all([UserModel.remove()]);
mocks.pet.removeAll = () => Promise.all([Pet.remove()]);
// mocks.medication.removeAll = () => Promise.all([Medication.remove()]);
mocks.reminder.removeAll = () => Promise.all([Reminder.remove()]);