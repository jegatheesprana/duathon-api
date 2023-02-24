const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please add an Email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add Password"]
    },
    accountRecovery: {
        OTP: {
            type: String,
            default: null
        },
        expirationTime: {
            type: mongoose.Schema.Types.Date,
            detault: null
        }
    }
}, { timestamps: true })

module.exports = mongoose.model("admin", adminSchema);





