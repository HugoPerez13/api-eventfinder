const City = require('./cities.model')
const { setError } = require('../../utils/error/controller');


const getAllCities = async (req, res, next) => {
    try {
        const allCities = await City.find()
        res.status(200).json(allCities)
    } catch (error) {
        return next(error)
    }
}

const getCity = async (req, res, next) => {
    try {
        const { id } = req.params
        const city = await City.findById(id)
        if (!city) {
            return next(setError(404, 'City not found'))
        }
        return res.status(200).json(city)

    } catch (error) {
        return next(error)
    }
}

const postNewCity = async (req, res, next) => {
    try {
        const newCity = new City()
        newCity.name = req.body.name
        if (req.file) {
            newCity.img = req.file.path
        }
        const cityInBd = await newCity.save()
        return res.status(201).json(cityInBd)
    } catch (error) {
        return next(error)
    }
}


module.exports = {
    getAllCities,
    getCity,
    postNewCity,
}