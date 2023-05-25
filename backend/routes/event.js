const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Create a new event
router.post('/', eventController.createEvent);

// Get all events
router.get('/', eventController.getAllEvents);

// Get an event by ID
router.get('/:id', eventController.getEventById);

// Update an event by ID
router.put('/:id', eventController.updateEventById);

// Delete an event by ID
router.delete('/:id', eventController.deleteEventById);

module.exports = router;
