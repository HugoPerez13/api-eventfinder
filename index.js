/*hola primos*/
const express = require('express');
const cors = require('cors');
const UserRoutes = require('./src/api/user/user.routes');
const EventRoutes = require('./src/api/events/events.routes')
const CitiesRoutes = require ('./src/api/cities/cities.routes')
const { isAuth } = require('./src/middlewares/auth');

const { connect } = require('./src/db/connect');
const cloudinary = require('cloudinary').v2

const PORT = process.env.PORT || 8000;
const app = express();

connect();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:4200'],
    credentials: true,
}));

app.use(express.json({
    limit: '5mb'
}))

app.use(express.urlencoded({ limit: '5mb', extended: true }))

app.use('/api/user', UserRoutes);
app.use('/api/events', EventRoutes);
app.use('/api/cities', CitiesRoutes);
app.use(isAuth)//// <--- POR QUE ESTA AQUI???? QUIEN TE CREES?
app.use('/', (req, res, next) => {
    return res.json('Home Page')
})

app.use('*', (req, res, next) => {
    const error = new Error()
    error.status = 404
    error.message = 'Route not found'
    return next(error)
})

app.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || 'Unexpected error');
})

app.disable('x-powered-by')

app.listen(PORT, () => {
    console.log('Server is running in http://localhost:' + PORT)
})