const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    employeeCode: {
        type: String,
        unique: true,
        required: [true, "Please add Employee Code"]
    },
    firstname: {
        type: String,
        required: [true, "Please add First name"]
    },
    lastname: {
        type: String,
        required: [true, "Please add Last name"]
    },
    email: {
        type: String,
        required: [true, "Please add an Email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add Password"]
    },
    phone: {
        type: String,
        required: [true, "Please add Phone"]
    },
    address: {
        type: String,
    },
    departmentId: {
        type: mongoose.Types.ObjectId,
        ref: "Department"
    },
    jobRoleId: {
        type: mongoose.Types.ObjectId,
        ref: "Role"
    },
    reportToId: {
        type: mongoose.Types.ObjectId,
        ref: "Employee"
    },
    status: {
        type: String,
        enum: ["active", "leave", "absent", "terminated"],
        required: [true],
        default: "active"
    },
    loginEnabled: {
        type: Boolean,
        default: false
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

module.exports = mongoose.model("employee", employeeSchema);





