const CityRoutes = require('express').Router();
const {
    getAllCities,
    getCity,
    postNewCity } = require('./cities.controller');
const upload = require('../../middlewares/upload')

CityRoutes.get('/', getAllCities)
CityRoutes.get('/:id', getCity)
CityRoutes.post('/', upload.single('img'), postNewCity)

module.exports = CityRoutes;