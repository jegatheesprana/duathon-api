const Pharmacy = require('../../models/Pharmacy')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendMail = require("../../utils/email");
const config = require('../../config/keys')
const { makeUid } = require('../../utils/utils')

exports.loginPharmacy = async (email, password, rememberMe) => {
    const pharmacy = await Pharmacy.findOne({ email })
    console.log(pharmacy)
    if (pharmacy && (await bcrypt.compare(password, pharmacy.password))) {
        const encryptedPharmacy = {
            pharmacy: {
                _id: pharmacy.id,
                email: pharmacy.email
            },
            type: 'authorization',
            role: 'pharmacy'
        }
        let pharmacyCopy = JSON.parse(JSON.stringify(pharmacy))
        delete pharmacyCopy.password
        return {
            _id: pharmacy.id,
            accessToken: generateAccessToken(encryptedPharmacy),
            refreshToken: generateRefreshToken(encryptedPharmacy, rememberMe),
            pharmacy: pharmacyCopy
        };
    } else {
        throw new Error("Invalid credientials")
    }
}

exports.tokenRefresh = (refreshToken) => {
    try {
        const decodedPharmacy = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        delete decodedPharmacy.exp
        delete decodedPharmacy.iat
        const accessToken = generateAccessToken(decodedPharmacy)
        return accessToken;
    } catch (error) {
        console.log(error)
        throw { success: false, error: error.message, statusCode: 401 }
    }
}

exports.forgotPassword = async (email) => {
    const pharmacy = await Pharmacy.findOne({ email })
    if (pharmacy) {
        const OTP = makeUid(6)

        const salt = await bcrypt.genSalt(10);
        const hashedOTP = await bcrypt.hash(OTP, salt);

        const expiration = 30
        const expirationTime = Date.now() + expiration * 60 * 1000
        pharmacy.accountRecovery = {
            OTP: hashedOTP,
            expirationTime
        }
        await pharmacy.save()

        const resetUrl = config.FROENTEND_DOMAIN + "/" + config.PASSWORD_RESET_PATH + "/" + email + "/" + OTP

        console.log(resetUrl)
        const params = {
            to: email,
            subject: "Pharmacy Password recovery",
            title: "Pharmacy Password Recovery",
            text:
                "Your password reset vertification code is " +
                OTP,
            html:
                `<h5>Your OTP is ${OTP}</h5>
                <div>Please reset your password using this link  ` +
                `<a href="${resetUrl}">${resetUrl}</a>` +
                `</div>`
        }

        return sendMail(
            params,
            (err, response) => {
                console.log(JSON.stringify({ err, response }, null, 2));
                if (err) throw new Error("Cannot send email")
                return `Reset email sent to ${response && response.accepted && response.accepted[0]}`
            }
        );

    } else {
        console.log("Email not found")
        throw new Error("Email not found")
    }
}

// exports.getTokenDetail = async ({ email, OTPVerified }) => {
//     return {
//         email,
//         OTPVerified
//     }
// }

exports.verifyOTP = async ({ email, OTP }) => {
    try {
        const pharmacy = await Pharmacy.findOne({ email })

        if (pharmacy && pharmacy.accountRecovery && await bcrypt.compare(OTP, pharmacy.accountRecovery.OTP)) {
            return "Valid OTP"

        } else {
            throw new Error("Not valid credientials")
        }
    } catch (error) {
        throw error
    }
}

exports.resetPassword = async ({ email, OTP, newPassword }) => {
    try {
        const pharmacy = await Pharmacy.findOne({ email })

        if (pharmacy && pharmacy.accountRecovery && await bcrypt.compare(OTP, pharmacy.accountRecovery.OTP)) {
            if (pharmacy.accountRecovery.expirationTime && (pharmacy.accountRecovery.expirationTime > Date.now())) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newPassword, salt);
                pharmacy.password = hashedPassword
                pharmacy.accountRecovery = { OTP: null, expirationTime: null }
                await pharmacy.save()
                // const result = await Pharmacy.updateOne({ _id: pharmacy._id }, {
                //     $set: { password: hashedPassword, accountRecovery: { OTP: null, expirationTime: null } }
                // })
                return "Password Changed"
            } else {
                console.log("Reset Token expired")
                throw new Error("Reset Token expired")
            }

        } else {
            console.log("Not valid credientials")
            throw new Error("Not valid credientials")
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

exports.logout = (pharmacyId) => {

}

const generateAccessToken = (object) => {
    return jwt.sign(object, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1h',

    })
}

const generateRefreshToken = (object, rememberMe) => {
    return jwt.sign(object, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: rememberMe ? '4w' : '5d',
    })
}