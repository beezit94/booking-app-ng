var express = require('express');
var router = express.Router();
var Bookingcontroler = require('../controller/booking');
var UserCtrl = require('../controller/user');

router.get('/manage', UserCtrl.checkAuth, Bookingcontroler.getUserBookings);
router.post('', UserCtrl.checkAuth, Bookingcontroler.createBooking);

module.exports = router;
