const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PharmacySchema = new Schema({
    name: {
        type: String,
        required: [true, "Pharmacy name is required!"]
    },
    email: {
        type: String,
        required: [true, "Pharmacy email is required!"],
        unique: [true, "Email already exists in database!"],
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: '{VALUE} is not a valid email!'
        }
    },
    address: {
        lane : {
            type: String,
            required: [true, "Pharmacy lane is required!"],
        },
        town : {
            type: String,
            required: [true, "Pharmacy town is required!"],
        },
        district : {
            type: String,
            required: [true, "Pharmacy district is required!"],
            enum : ["Jaffna", "Kilinochchi", "Mannar", "Mullaitivu", "Vavuniya", "Puttalam", "Kurunegala", "Gampaha", "Colombo", "Kalutara", "Anuradhapura", "Polonnaruwa", "Matale", "Kandy", "Nuwara", "Eliya", "Kegalle", "Ratnapura", "Trincomalee", "Batticaloa", "Ampara", "Badulla", "Monaragala", "Hambantota", "Matara", "Galle"]
        }
    },
    phone: {
        type: String,
        required: [true, "Pharmacy phone no is required!"],
        trim: true,
        validate: {
            validator: function (v) {
                return /^[0-9]{9,10}/.test(v);
            },
            message: '{VALUE} is not a valid 10 digit number!'
        }
    },
    licenseNumber: {
        type: String,
        unique: [true, "Pharmacy license number already exists in database!"],
        required: [true, "Pharmacy license number is required!"],
    },
    website: {
        type: String,
    },
    operationgHours: {
        from: {
            hour: {
                type: Number,
                default: 0,
                validate: {
                    validator: function (v) {
                        const value = parseInt(v)
                        return (value <= 23 && value >= 0);
                    },
                    message: '{VALUE} is not a valid hour!'
                }
            },
            minute: {
                type: Number,
                default: 0,
                validate: {
                    validator: function (v) {
                        const value = parseInt(v)
                        return (value <= 59 && value >= 0);
                    },
                    message: '{VALUE} is not a valid minute!'
                }
            }
        },
        to: {
            hour: {
                type: Number,
                default: 0,
                validate: {
                    validator: function (v) {
                        const value = parseInt(v)
                        return (value <= 23 && value >= 0);
                    },
                    message: '{VALUE} is not a valid hour!'
                }
            },
            minute: {
                type: Number,
                default: 0,
                validate: {
                    validator: function (v) {
                        const value = parseInt(v)
                        return (value <= 59 && value >= 0);
                    },
                    message: '{VALUE} is not a valid minute!'
                }
            }
        }
    },
    password: {
        type: String,
        required: [true, "Pharmacy password is required!"],
    },
    owner: {
        name: {
            type: String,
        },
        email: {
            type: String,
            validate: {
                validator: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: '{VALUE} is not a valid email!'
            }
        },
        address: {
            type: String,
        },
        phone: {
            type: String,
            trim: true,
            validate: {
                validator: function (v) {
                    return /^[0-9]{9,10}/.test(v);
                },
                message: '{VALUE} is not a valid 10 digit number!'
            }
        },
        nic: {
            type: String,
            trim: true,
            validate: {
                validator: function (v) {
                    return /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/.test(v);
                },
                message: '{VALUE} is not a valid NIC number!'
            }
        }
    },
    enabled: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const PharmacyModel = mongoose.model('pharmacy', PharmacySchema);

module.exports = PharmacyModel;