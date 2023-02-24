const userService = require('../services/userService')

const getMe = (req, res, next) => {
    const user = req.user;
    userService.getMe(user.employee._id)
        .then(result => {
            res.json(result)
        })
        .catch(e => {
            console.log(e)
            res.status(500).send("An Error occured")
        })
}

const updateInfo = (req, res, next) => {
    const { _id: id } = req.user
    const { firstname, lastname, phone, address } = req.body;
    userService.updateInfo(id, { firstname, lastname, phone, address })
        .then(result => {
            res.status(201).json({ status: true })
        })
        .catch(e => {
            console.log(e)
            res.status(500).send("An Error occured")
        })
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