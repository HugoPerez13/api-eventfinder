const User = require('./user.models');
const bcrypt = require('bcrypt');
const { setError } = require('../../utils/error/controller');
const JwtControl = require('../../utils/jsonwebtoken/controller');


const getUser = async (req, res, next) => {
    try {
        const { id } = req.params
        if (id != req.user.id) {
            return next(setError(403, 'Forbidden'))
        }
        const user = await User.findById(id)
        if (!user) {
            return next(setError(404, 'User not found'))
        }
        user.password = null
        user.repeatPassword = null
        return res.status(200).json(user)
    } catch (error) {
        return next(error)
    }
}


const postNewUser = async (req, res, next) => {
    try {
        const newUser = new User(req.body)
        const userExist = await User.findOne({ email: newUser.email })
        if (userExist) {
            return next(setError(404, 'This Email already exists'))
        }
        const userInBd = await newUser.save()
        userInBd.password = null
        userInBd.repeatPassword = null
        return res.status(201).json(userInBd)
    } catch (error) {
        return next(error)
    }
}

const loginUser = async (req, res, next) => {
    try {
        const userInBd = await User.findOne({ email: req.body.email })
        if (!userInBd) {
            return next(setError(404, 'User not found'))
        }
        if (bcrypt.compareSync(req.body.password, userInBd.password)) {
            userInBd.password = null
            const token = JwtControl.generate(userInBd._id, userInBd.email)
            return res.status(200).json(token)
        }
    } catch (error) {
        error.message = 'error to login'
        return next(error)
    }

}

const logoutUser = (req, res, next) => {
    try {
        const token = null
        return res.status(200).json(token)
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    getUser,
    postNewUser,
    loginUser,
    logoutUser
}