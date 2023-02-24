const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MedicineSchema = new Schema({
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

MedicineSchema.index({ name: 'text', NDC: 'text' });
const Medicine = mongoose.model('medicine', MedicineSchema);
module.exports = Medicine

