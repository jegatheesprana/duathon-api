const Admin = require('../../models/Admin')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendMail = require("../../utils/email");
const config = require('../../config/keys')
const { makeUid } = require('../../utils/utils')

exports.loginAdmin = async (email, password, rememberMe) => {
    const admin = await Admin.findOne({ email })
    console.log(admin)
    if (admin && (await bcrypt.compare(password, admin.password))) {
        const encryptedAdmin = {
            admin: {
                _id: admin.id,
                email: admin.email
            },
            type: 'authorization',
            role: 'admin'
        }
        let adminCopy = JSON.parse(JSON.stringify(admin))
        delete adminCopy.password
        return {
            _id: admin.id,
            accessToken: generateAccessToken(encryptedAdmin),
            refreshToken: generateRefreshToken(encryptedAdmin, rememberMe),
            admin: adminCopy
        };
    } else {
        throw new Error("Invalid credientials")
    }
}

exports.tokenRefresh = (refreshToken) => {
    try {
        const decodedAdmin = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        delete decodedAdmin.exp
        delete decodedAdmin.iat
        const accessToken = generateAccessToken(decodedAdmin)
        return accessToken;
    } catch (error) {
        console.log(error)
        throw { success: false, error: error.message, statusCode: 401 }
    }
}

exports.forgotPassword = async (email) => {
    const admin = await Admin.findOne({ email })
    if (admin) {
        const OTP = makeUid(6)

        const salt = await bcrypt.genSalt(10);
        const hashedOTP = await bcrypt.hash(OTP, salt);

        const expiration = 30
        const expirationTime = Date.now() + expiration * 60 * 1000
        admin.accountRecovery = {
            OTP: hashedOTP,
            expirationTime
        }
        await admin.save()

        const resetUrl = config.FROENTEND_DOMAIN + "/" + config.ADMIN_PASSWORD_RESET_PATH + "/" + email + "/" + OTP

        console.log(resetUrl)
        const params = {
            to: email,
            subject: "Admin Password recovery",
            title: "Admin Password Recovery",
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
        const admin = await Admin.findOne({ email })

        if (admin && admin.accountRecovery && await bcrypt.compare(OTP, admin.accountRecovery.OTP)) {
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
        const admin = await Admin.findOne({ email })

        if (admin && admin.accountRecovery && await bcrypt.compare(OTP, admin.accountRecovery.OTP)) {
            if (admin.accountRecovery.expirationTime && (admin.accountRecovery.expirationTime > Date.now())) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newPassword, salt);
                admin.password = hashedPassword
                admin.accountRecovery = { OTP: null, expirationTime: null }
                await admin.save()
                // const result = await Admin.updateOne({ _id: admin._id }, {
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

exports.logout = (adminId) => {

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