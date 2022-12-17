const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    mobile: {
        type: String, required: true, minlength: 11, maxlength: 11,
    }, password: {
        type: String, trim: true, minlength: 6, maxlength: 60,
    }, name: {
        type: String, required: true,
    }, division: {
        type: String,
    }, district: {
        type: String,
    }, upazila: {
        type: String,
    }, village: {
        type: String,
    }, daily_production: {
        type: String,
    }, demand: {
        type: String,
    }, quantity: {
        type: Number,
    }, present_store: {
        type: String,
    }, role: {
        type: String, required: true,
    },
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);
