const EventRoutes = require('express').Router();
const {
    getAllEvents,
    getEvent,
    postNewEvent,
    deleteEvent } = require('./events.controller');
const upload = require('../../middlewares/upload');

EventRoutes.get('/', getAllEvents)
EventRoutes.get('/:id', getEvent)
EventRoutes.post('/', upload.single('img'), postNewEvent)
EventRoutes.delete('/:id', deleteEvent)

module.exports = EventRoutes