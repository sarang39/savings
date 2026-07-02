const express = require('express');
const router = express.Router();
const tripController = require('../controllers/trip-controller');
const { userMiddleware, adminpriority } = require('../Middleware/UserMiddleWare');

// Create a new trip
router.post('/createtrip', userMiddleware, tripController.createtrip);
// Get all trips for the logged-in user
router.get('/gettrips', userMiddleware, tripController.gettrips);
// Get trip details by ID
router.get('/tripusers/:tripId', userMiddleware, tripController.getTripusers);
// Join a trip using invite code
router.post('/join/:tripId', userMiddleware, tripController.joinTripByInvite);

module.exports = router;
