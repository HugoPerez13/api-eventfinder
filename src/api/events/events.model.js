const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        img: { type: String, required: true, trim: true },
        city: { type: Schema.Types.ObjectId, ref: "city", required: true },
        price: { type: Number, required: true, trim: true },
        description: { type: String, trim: true },
        date: { type: String, required: true, trim: true }
    },
    {
        timestamps: true
    }
);

const Event = mongoose.model('events', eventSchema)
module.exports = Event