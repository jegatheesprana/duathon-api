const Employee = require('../../models/Employee');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendMail = require("../../utils/email");
const config = require('../../config/keys')
const { makeUid } = require('../../utils/utils')

exports.loginEmployee = async (email, password, rememberMe) => {
    const employee = await Employee.findOne({ email })

    if (employee && (await bcrypt.compare(password, employee.password))) {
        const encryptedEmployee = {
            employee: {
                _id: employee.id,
                email: employee.email
            },
            type: 'authorization',
            role: 'employee'
        }
        return {
            _id: employee.id,
            accessToken: generateAccessToken(encryptedEmployee),
            refreshToken: generateRefreshToken(encryptedEmployee, rememberMe),
            employee: {
                firstname: employee.firstname,
                lastname: employee.lastname,
                email: employee.email,
            }
        };
    } else {
        throw new Error("Invalid credientials")
    }
}

exports.tokenRefresh = (refreshToken) => {
    try {
        const decodedEmployee = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        delete decodedEmployee.exp
        delete decodedEmployee.iat
        const accessToken = generateAccessToken(decodedEmployee)
        return accessToken;
    } catch (error) {
        console.log(error)
        throw { success: false, error: error.message, statusCode: 401 }
    }
}

exports.forgotPassword = async (email) => {
    const employee = await Employee.findOne({ email })
    if (employee) {
        const OTP = makeUid(6)
        const expiration = 30
        const expirationTime = Date.now() + expiration * 60 * 1000
        // const accountRecovery = {
        //     token: OTP,
        //     expirationTime
        // }
        // const result = await Employee.updateOne({ _id: employee._id }, {
        //     $set: { accountRecovery }
        // })
        employee.accountRecovery = {
            OTP: OTP,
            expirationTime
        }
        await employee.save()

        const resetUrl = config.FROENTEND_DOMAIN + "/" + config.PASSWORD_RESET_PATH + "/" + email + "/" + OTP

        console.log(resetUrl)
        const params = {
            to: email,
            subject: "Password recovery",
            title: "ElectroLeaf Password Recovery",
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
        const employee = await Employee.findOne({ email })

        if (employee.accountRecovery && employee.accountRecovery.OTP === OTP) {

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
        const employee = await Employee.findOne({ email })

        if (employee.accountRecovery && employee.accountRecovery.OTP === OTP) {
            if (employee.accountRecovery.expirationTime && (employee.accountRecovery.expirationTime > Date.now())) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newPassword, salt);
                employee.password = hashedPassword
                employee.accountRecovery = { OTP: null, expirationTime: null }
                await employee.save()
                // const result = await Employee.updateOne({ _id: employee._id }, {
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

exports.logout = (employeeId) => {

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