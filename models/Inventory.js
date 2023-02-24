const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
    medicineId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'medicines',
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


const Inventory = mongoose.model('inventory', InventorySchema);
module.exports = Inventory

