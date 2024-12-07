const express = require('express');
const router = express.Router();
const checkInController = require('../controllers/checkInController')
const checkOutController = require('../controllers/checkOutController')
const { authUserMiddleware } = require('../middleware/authMiddleware');

router.post('/createCheckIn', authUserMiddleware, checkInController.createCheckIn)
router.post('/createCheckOut', authUserMiddleware, checkOutController.createCheckOut)
router.post('/getCheckInUser', authUserMiddleware, checkInController.getCheckInUser)
router.post('/getCheckOutUser', authUserMiddleware, checkOutController.getCheckOutUser)
module.exports = router;