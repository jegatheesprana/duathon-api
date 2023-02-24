const pharmacyService = require('../services/pharmacyServices')

const getAllPharmacies = (req, res, next) => {
    pharmacyService.getAllPharmacies()
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
}

const getPharmacy = (req, res) => {
    const { pharmacyId } = req.params
    if (!pharmacyId) {
        return res.status(500).send("Bad Request")
    }
    pharmacyService.getPharmacy(pharmacyId)
        .then((data) => {
            if (!data){
                throw Error("Pharmacy not found!")
            }
            res.json(data)
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
}

const createPharmacy = (req, res) => {
    const { name, email, address, phone, licenseNumber, website, operationgHours, password, owner } = req.body
    if (!email | !name || !address || !phone || !licenseNumber || !password) {
        return res.status(500).send("Bad Request")
    }
    pharmacyService.createPharmacy({ name, email, address, phone, licenseNumber, website, operationgHours, password, owner })
        .then((pharmacy) => {
            res.status(201).json(pharmacy)
        })
        .catch((err) => {
            console.log(err)
            return res.status(400).send("Internal Server Error")
        })
        .catch(error => next(error))
}

const updatePharmacy = (req, res) => {
    const { pharmacyId } = req.params
    const { name, email, address, phone, licenseNumber, website, operationgHours, owner } = req.body
    if (!pharmacyId || !email | !name || !address || !phone || !licenseNumber) {
        return res.status(500).send("Bad Request")
    }
    pharmacyService.updatePharmacy({pharmacyId, name, email, address, phone, licenseNumber, website, operationgHours, owner })
        .then((result) => {
            res.status(201).json({ status: true })
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
        .catch(error => next(error))
}

const deletePharmacy = (req, res) => {
    const { pharmacyId } = req.params
    if (!pharmacyId) {
        return res.status(500).send("Bad Request")
    }
    pharmacyService.deletePharmacy(pharmacyId)
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
    const { pharmacyId } = req.params
    const { enabled } = req.body
    if (!pharmacyId || enabled === undefined) {
        return res.status(500).send("Bad Request")
    }
    pharmacyService.changeStatus({ pharmacyId, enabled })
        .then(() => {
            res.status(201).json({ status: true })
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
        .catch(error => next(error))
}

const getPharmacyByDistrict = (req, res) => {
    const { district } = req.params
    if (!district) {
        return res.status(500).send("Bad Request")
    }
    pharmacyService.getPharmacyByDistrict(district)
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
        .catch(error => next(error))
}


module.exports = {
    getAllPharmacies,
    getPharmacy,
    createPharmacy,
    updatePharmacy,
    deletePharmacy,
    changeStatus,
    getPharmacyByDistrict,
}