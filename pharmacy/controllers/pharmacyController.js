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
    const { code, name, details, buildingId, floorId, ownerId, status } = req.body
    if (!code | !name || !floorId) {
        return res.status(500).send("Bad Request")
    }
    pharmacyService.createPharmacy({ code, name, details, floorId, buildingId, ownerId, status })
        .then((pharmacy) => {
            res.status(201).json(pharmacy)
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
        .catch(error => next(error))
}

const updatePharmacy = (req, res) => {
    const { pharmacyId } = req.params
    const { code, name, details, floorId, buildingId, ownerId, status } = req.body
    if (!pharmacyId || !code | !name || !floorId) {
        return res.status(500).send("Bad Request")
    }
    pharmacyService.updatePharmacy({ pharmacyId, code, name, details, floorId, buildingId, ownerId, status })
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