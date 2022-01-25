const UserRoutes = require('express').Router();
const { isAuth } = require('../../middlewares/auth');

const { getUser, postNewUser, loginUser, logoutUser } = require('./user.controller')

UserRoutes.get('/:id', [isAuth], getUser)
UserRoutes.post('/', postNewUser)
UserRoutes.post('/login', loginUser)
UserRoutes.post('/logout', [isAuth], logoutUser)

module.exports = UserRoutes