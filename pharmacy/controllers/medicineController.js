const medicineService = require('../services/medicineServices')

const getAllMedicines = (req, res, next) => {
    medicineService.getAllMedicines()
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
}

const getMedicine = (req, res) => {
    const { medicineId } = req.params
    if (!medicineId) {
        return res.status(500).send("Bad Request")
    }
    medicineService.getMedicine(medicineId)
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
}

const createMedicine = (req, res) => {
    const { name, manufacture, supplier } = req.body
    // if (!code | !name || !floorId) {
    //     return res.status(500).send("Bad Request")
    // }
    medicineService.createMedicine({ name, manufacture, supplier })
        .then((medicine) => {
            res.status(201).json(medicine)
        })
        .catch((err) => {
            console.log(err)
            return res.status(400).send("Internal Server Error")
        })
        .catch(error => next(error))
}

const updateMedicine = (req, res) => {
    const { medicineId } = req.params
    const { name, manufacture, supplier } = req.body
    if (!medicineId || !name | !manufacture || !supplier) {
        return res.status(500).send("Bad Request")
    }
    medicineService.updateMedicine({ medicineId, name, manufacture, supplier })
        .then(() => {
            res.status(201).json({ status: true })
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
        .catch(error => next(error))
}

const deleteMedicine = (req, res) => {
    const { medicineId } = req.params
    if (!medicineId) {
        return res.status(500).send("Bad Request")
    }
    medicineService.deleteMedicine(medicineId)
        .then(() => {
            res.status(201).json({ status: true })
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
        .catch(error => next(error))
}

const changeStatus = (req, res) => {
    const { medicineId } = req.params
    const { status } = req.body
    if (!medicineId || status === undefined) {
        return res.status(500).send("Bad Request")
    }
    medicineService.changeStatus({ medicineId, status })
        .then(() => {
            res.status(201).json({ status: true })
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
        .catch(error => next(error))
}

module.exports = {
    getAllMedicines,
    getMedicine,
    createMedicine,
    updateMedicine,
    deleteMedicine,
    changeStatus
}