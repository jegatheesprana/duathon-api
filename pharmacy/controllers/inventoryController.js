const inventoryService = require('../services/inventoryService')

const getAllInventories = (req, res, next)=>{
    inventoryService.getAllInventories()
        .then(data =>{
            res.json(data)
        })
        .catch( err =>{
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
}

const getInventory = (req, res,next) => {
    const { pharmacyId } = req.params
    if (!pharmacyId) {
        return res.status(500).send("Bad Request")
    }
    inventoryService.getInventory(pharmacyId)
        .then(data => {
            res.json(data)
        })
        .catch( err =>{
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
}

const addInventory = (req, res, next) => {

    const {medicineId, pharmacyId, quantity, expDate, price} = req.body
    inventoryService.addInventory({medicineId, pharmacyId, quantity, expDate, price})
        .then((inventory) => {
            res.status(201).json(inventory)
        })
        .catch((err) => {
            console.log(err)
            return res.status(400).send("Internal Server Error")
        })
        .catch(error => next(error))
}

const updateInventory = (req, res) => {
    const { inventoryId } = req.params
    const { quantity, expDate, price, status } = req.body
    if ( !inventoryId ) {
        return res.status(500).send("Bad Request")
    }
    inventoryService.updateInventory({ inventoryId, quantity, expDate, price, status})
        .then(() => {
            res.status(201).json({ status: true })
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
        .catch(error => next(error))
}

const deleteInventory = (req, res) => {
    const { inventoryId} = req.params
    if (!inventoryId) {
        return res.status(500).send("Bad Request")
    }
    inventoryService.deleteInventory(inventoryId)
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
    const { inventoryId } = req.params
    const { status } = req.body
    if (!inventoryId) {
        return res.status(500).send("Bad Request")
    }
    inventoryService.changeStatus({ inventoryId, status })
        .then(() => {
            res.status(201).json({ status: true })
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
        .catch(error => next(error))
}
module.exports =  {
    getAllInventories,
    getInventory,
    addInventory,
    updateInventory,
    deleteInventory,
    changeStatus
}