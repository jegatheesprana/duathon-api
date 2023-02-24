const mongoose = require('mongoose')
const Medicine = require('../../models/Medicine')
const Building = null

exports.getAllMedicines = () => {
    return Medicine.find()
}

exports.getMedicine = (MedicineId) => {
    return Medicine.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(MedicineId)
            }
        },
        {
            $lookup: {
                from: 'inventories',
                localField: '_id',
                foreignField: 'medicineId',
                as: 'inventory'
            }
        },
        {
            $addFields: {
                floor: {
                    $arrayElemAt: [
                        {
                            $filter: {
                                input: '$building.floors',
                                as: 'floor',
                                cond: {
                                    $eq: ['$$floor._id', '$floorId']
                                }
                            }
                        },
                        0
                    ]
                }
            }
        },
        {
            $lookup: {
                from: 'facilitymemberships',
                localField: '_id',
                foreignField: 'MedicineId',
                as: 'facilityMemberships'
            }
        },
        {
            $lookup: {
                from: 'facilities',
                localField: 'facilityMemberships.facilityId',
                foreignField: '_id',
                as: 'facilities'
            }
        },
        {
            $addFields: {
                facilityMemberships: {
                    $map: {
                        input: '$facilityMemberships',
                        as: 'facilityMembership',
                        in: {
                            $mergeObjects: [
                                '$$facilityMembership',
                                {
                                    facility: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: '$facilities',
                                                    as: 'facility',
                                                    cond: [{
                                                        $eq: ['$$facility._id', '$$facilityMembership.facilityId']
                                                    }]
                                                }
                                            },
                                            0
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        {
            $project: {
                facilities: 0,
                'building.floors': 0,
                'owner.password': 0,
                'owner.accountRecovery': 0
            }
        }
    ]).then(data => data[0])
}

exports.createMedicine = ({ name, manufacture, supplier }) => {
    const medicine = new Medicine({
        name, manufacture, supplier
    })
    return medicine.save()
}

exports.updateMedicine = ({ medicineId, name, manufacture, supplier }) => {
    return Medicine.updateOne({ _id: medicineId }, {
        $set: {
            name, manufacture, supplier
        }
    })
}

exports.deleteMedicine = (medicineId) => {
    return Medicine.deleteOne({ _id: medicineId })
}

exports.changeStatus = ({ medicineId, status }) => {
    return Medicine.updateOne({ _id: medicineId }, {
        $set: {
            status
        }
    })
}