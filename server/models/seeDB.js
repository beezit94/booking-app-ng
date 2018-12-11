var mongoose = require('mongoose');
var Rental = require('./rentals.model');
var User = require('../models/user.model');
var fakeData = require('./data.json');
var Booking = require('../models/booking.model');

rentals = fakeData.rentals;
users = fakeData.users;

async function cleanDB() {
  await User.remove({});
  await Rental.remove({});
  await Booking.remove({});
}

async function seedDB() {
  await cleanDB();

  const user = new User(users[0]);
  const user2 = new User(users[1]);
  rentals.forEach(element => {
    const rental = new Rental(element);
    rental.user = user;
    user.rentals.push(rental);
    rental.save();
  });
  user.save();
  user2.save();
}

module.exports = { seedDB };
