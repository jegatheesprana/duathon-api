const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PharmacySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    NDC: {
        type: String,
        unique: true,
        required: true
    },
    manufacture: {
        type: String,
        required: true
    },
    supplier: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });


const Pharmacy = mongoose.model('medicine', PharmacySchema);
module.exports = Pharmacy

