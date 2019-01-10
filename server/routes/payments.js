const express = require('express');
const router = express.Router();

const UserCtrl = require('../controller/user');
const PaymentCtrl = require('../controller/payment');

router.get('', UserCtrl.checkAuth, PaymentCtrl.getPendingPayments);

router.post('/accept', UserCtrl.checkAuth, PaymentCtrl.confirmPayment);
router.post('/decline', UserCtrl.checkAuth, PaymentCtrl.declinePayment);

module.exports = router;
