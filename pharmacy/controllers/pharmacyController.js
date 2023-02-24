const pharmacyService = require('../services/pharmacyServices')

const getAllPharmacys = (req, res, next) => {
    pharmacyService.getAllPharmacys()
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
    pharmacyService.updatePharmacy({ name, email, address, phone, licenseNumber, website, operationgHours, owner })
        .then(() => {
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
    const { status } = req.body
    if (!pharmacyId || status === undefined) {
        return res.status(500).send("Bad Request")
    }
    pharmacyService.changeStatus({ pharmacyId, status })
        .then(() => {
            res.status(201).json({ status: true })
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
        .catch(error => next(error))
}

const getPharmacyByFloor = (req, res) => {
    const { floorId } = req.params
    if (!floorId) {
        return res.status(500).send("Bad Request")
    }
    pharmacyService.getPharmacyByFloor(floorId)
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
}

const getPharmacyByBuilding = (req, res) => {
    const { buildingId } = req.params
    if (!buildingId) {
        return res.status(500).send("Bad Request")
    }
    pharmacyService.getPharmacyByBuilding(buildingId)
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
        .catch(error => next(error))
}

const updatePharmacyOwner = (req, res, next) => {
    pharmacyService.updatePharmacyOwner(req.params, req.body)
        .then(() => {
            res.json({ success: true })
        })
        .catch(error => next(error))
}

module.exports = {
    getAllPharmacys,
    getPharmacy,
    createPharmacy,
    updatePharmacy,
    deletePharmacy,
    changeStatus,
    getPharmacyByFloor,
    getPharmacyByBuilding,
    updatePharmacyOwner
}