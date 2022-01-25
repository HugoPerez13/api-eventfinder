const Event = require('./events.model')
const { setError } = require('../../utils/error/controller');
const { deleteImgCloudinary } = require('../../middlewares/delete');

const getAllEvents = async (req, res, next) => {
    try {
        const allEvents = await Event.find().populate('city');
        res.status(200).json(allEvents)
    } catch (error) {
        return next(error)
    }
}

const getEvent = async (req, res, next) => {
    try {
        const { id } = req.params
        const event = await Event.findById(id).populate('city');
        if (!event) {
            return next(setError(404, 'Event not found'))
        }
        return res.status(200).json(event)

    } catch (error) {
        return next(error)
    }
}

const postNewEvent = async (req, res, next) => {
    try {
        const newEvent = new Event()
        newEvent.name = req.body.name
        newEvent.city = req.body.city
        newEvent.price = req.body.price
        newEvent.description = req.body.description
        newEvent.date = req.body.date
        newEvent.endDate = req.body.endDate
        if (req.file) {
            newEvent.img = req.file.path
        }
        const eventInBd = await newEvent.save()
        return res.status(201).json(eventInBd)
    } catch (error) {
        return next(error)
    }
}


const deleteEvent = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedEvent = await Event.findByIdAndDelete(id)
        if (!deletedEvent) return next(setError(404, 'Event not found'))
        if (deletedEvent.img) deleteImgCloudinary(deletedEvent.img)
        return res.status(200).json(deletedEvent)
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    getAllEvents,
    getEvent,
    postNewEvent,
    deleteEvent
}