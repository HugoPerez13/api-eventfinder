const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { validationPassword, validationEmail } = require('../../utils/validation/controller');
const { setError } = require('../../utils/error/controller');
const adminPassword = process.env.ADMIN_PASSWORD;

let userSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: Number,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    repeatPassword: {
        type: String,
    }
}, {
    collection: 'users'
})

userSchema.pre("save", function (next) {
    if (!validationEmail(this.email)){
        return next(setError(400, "El email debe cumplir con el patrón, ejemplo@ejemplo.com"))
    }
    if (!validationPassword(this.password)) {
        return next(setError(400, 'Debe contener al menos 1 mayúscula, 1 minúscula, 1 numero y 1 caracter especial (min 8 caracteres)'))
    }
    if (adminPassword === this.password) {
        this.password = bcrypt.hashSync(this.password, 10);
        next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

module.exports = mongoose.model('User', userSchema);