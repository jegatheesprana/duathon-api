const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PharmacySchema = new Schema({
    medicineId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'medicines',
        required: true
    },
    pharmacyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pharmacys',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    expDate: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });


const Pharmacy = mongoose.model('inventory', PharmacySchema);
module.exports = Pharmacy

