const mongoose = require('mongoose')
const Inventory = require('../../models/Inventory')

exports.getAllInventories = () => {
    return Inventory.aggregate([
        {
            $lookup: {
                from: 'medicines',
                localField: 'medicineId',
                foreignField: '_id',
                as: 'medicine'
            }
        },
        {
            $addFields: {
                medicine: {
                    $arrayElemAt: [
                        '$medicine',
                        0
                    ]
                }
            }
        }
    ])
}

exports.getInventory = (pharmacyId) => {
    return Inventory.aggregate([
        {
            $match: {
                pharmacyId: mongoose.Types.ObjectId(pharmacyId)
            }
        }
    ])
}

exports.addInventory = ({ medicineId, pharmacyId, quantity, expDate, price }) => {
    const inventory = new Inventory({
        medicineId, pharmacyId, quantity, expDate, price
    })
    return inventory.save()
}

exports.updateInventory = ({ inventoryId, quantity, expDate, price, status }) => {
    return Inventory.updateOne({ _id: inventoryId },
        {
            $set: {
                quantity, expDate, price, status
            }
        })
}

exports.deleteInventory = (inventoryId) => {
    return Inventory.deleteOne({
        _id: inventoryId
    })
}

exports.changeStatus = ({ inventoryId, status }) => {
    return Inventory.updateOne({ _id: inventoryId },
        {
            $set: {
                status
            }
        })
}