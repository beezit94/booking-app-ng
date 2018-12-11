var express = require('express');
var router = express.Router();
var Rental = require('../models/rentals.model');
var HttpStatus = require('http-status-codes');
var UserCtrl = require('../controller/user');
const { normalizeErrors } = require('../helpers/mpngoose');
var User = require('../models/user.model');

router.get('', function(req, res) {
  const city = req.query.city;
  const query = city ? { city: city.toLowerCase() } : {};

  Rental.find(query)
    .select('-bookings')
    .exec(function(err, foundRentals) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      if (city && foundRentals.length === 0) {
        return res.status(422).send({
          errors: [
            {
              title: 'No Rentals Found!',
              detail: `There are no rentals for city ${city}`
            }
          ]
        });
      }

      return res.json(foundRentals);
    });
});

router.get('/manage', UserCtrl.checkAuth, function(req, res) {
  const user = res.locals.user;

  Rental.where({ user })
    .populate('bookings')
    .exec(function(err, foundRentals) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      return res.json(foundRentals);
    });
});

router.get('/:id', (req, res) => {
  const rentalId = req.params.id;

  Rental.findById(rentalId)
    .populate('user', 'username -_id')
    .populate('bookings', 'startAt endAt -_id')
    .exec(function(err, foundRental) {
      if (err || !foundRental) {
        return res.status(422).send({
          errors: [{ title: 'Rental Error!', detail: 'Could not find Rental!' }]
        });
      }

      return res.json(foundRental);
    });
  // Rental.findById(rentalId)
  //   .then(rental => {
  //     res.status(HttpStatus.OK).json(rental);
  //   })
  //   .catch(error => {
  //     res.status(HttpStatus.NOT_FOUND).json({
  //       message: 'Rental not found',
  //       error
  //     });
  //   });
});

router.delete('/:id', UserCtrl.checkAuth, function(req, res) {
  const user = res.locals.user;

  Rental.findById(req.params.id)
    .populate('user', '_id')
    .populate({
      path: 'bookings',
      select: 'startAt',
      match: { startAt: { $gt: new Date() } }
    })
    .exec(function(err, foundRental) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      if (user.id !== foundRental.user.id) {
        return res.status(422).send({
          errors: [
            { title: 'Invalid User!', detail: 'You are not rental owner!' }
          ]
        });
      }

      if (foundRental.bookings.length > 0) {
        return res.status(422).send({
          errors: [
            {
              title: 'Active Bookings!',
              detail: 'Cannot delete rental with active bookings!'
            }
          ]
        });
      }

      foundRental.remove(function(err) {
        if (err) {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        return res.json({ status: 'deleted' });
      });
    });
});

router.post('', UserCtrl.checkAuth, function(req, res) {
  const {
    title,
    city,
    street,
    category,
    image,
    shared,
    bedrooms,
    description,
    dailyRate
  } = req.body;
  const user = res.locals.user;

  const rental = new Rental({
    title,
    city,
    street,
    category,
    image,
    shared,
    bedrooms,
    description,
    dailyRate
  });
  rental.user = user;

  Rental.create(rental, function(err, newRental) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }

    User.update(
      { _id: user.id },
      { $push: { rentals: newRental } },
      function() {}
    );

    return res.json(newRental);
  });
});

module.exports = router;
