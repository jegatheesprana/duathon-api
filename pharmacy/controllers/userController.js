const userService = require('../services/userService')
const pharmacyService = require('../services/pharmacyServices')

const getMe = (req, res, next) => {
    const user = req.user;
    if (user && user.pharmacy) {
        userService.getMe(user.pharmacy._id)
            .then(result => {
                res.json(result)
            })
            .catch(e => {
                console.log(e)
                res.status(500).send("An Error occured")
            })
    } else {
        res.status(404).send("Cannot find the useer")
    }

}

const updateInfo = (req, res, next) => {
    const { pharmacy } = req.user
    const { name, email, address, phone, licenseNumber, website, operationgHours, owner } = req.body
    if (!pharmacyId || !email | !name || !address || !phone || !licenseNumber) {
        return res.status(500).send("Bad Request")
    }
    pharmacyService.updatePharmacy({ pharmacyId: pharmacy._id, name, email, address, phone, licenseNumber, website, operationgHours, owner })
        .then((result) => {
            res.status(201).json({ status: true })
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
        .catch(error => next(error))
}

const changePassword = async (req, res, next) => {
    const { _id: id } = req.user
    // console.log(req.user)
    const { oldPassword, newPassword } = req.body
    if (!id || !oldPassword || !newPassword) {
        res.status(400)
        throw new Error("Please add missed fields")
    }

    const result = await userService.changePassword({ id, oldPassword, newPassword })
    res.status(201).json({ status: true, result })
}

module.exports = {
    getMe,
    updateInfo,
    changePassword,
}