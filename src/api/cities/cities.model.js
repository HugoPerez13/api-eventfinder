const mongoose = require('mongoose');

const citySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
    },
    {
        timestamps: true
    }
);

const City = mongoose.model('city', citySchema)
module.exports = City