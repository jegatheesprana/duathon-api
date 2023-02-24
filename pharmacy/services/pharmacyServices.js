const mongoose = require('mongoose')
const Pharmacy = require('../../models/Pharmacy')
const Building = require('../../models/Building')

exports.getAllPharmacys = () => {
    return Pharmacy.find()
}

exports.getPharmacy = (pharmacyId) => {
    return Pharmacy.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(pharmacyId)
            }
        },
        {
            $lookup: {
                from: 'buildings',
                localField: 'floorId',
                foreignField: 'floors._id',
                as: 'building'
            }
        },
        {
            $lookup: {
                from: 'customers',
                localField: 'ownerId',
                foreignField: '_id',
                as: 'owner'
            }
        },
        {
            $addFields: {
                building: {
                    $arrayElemAt: ['$building', 0]
                },
                owner: {
                    $arrayElemAt: ['$owner', 0]
                }
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
                foreignField: 'pharmacyId',
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

exports.createPharmacy = ({  name, email, address, phone, licenseNumber, website, operationgHours, password, owner }) => {
    const pharmacy = new Pharmacy({
        name, email, address, phone, licenseNumber, website, operationgHours, password, owner
    })
    return pharmacy.save()
}

exports.updatePharmacy = ({ pharmacyId, code, name, details, floorId, ownerId, buildingId, status }) => {
    return Pharmacy.updateOne({ _id: pharmacyId }, {
        $set: {
            code, name, details, floorId, buildingId, ownerId, status
        }
    })
}

exports.deletePharmacy = (pharmacyId) => {
    return Pharmacy.deleteOne({ _id: pharmacyId })
}

exports.changeStatus = ({ pharmacyId, status }) => {
    return Pharmacy.updateOne({ _id: pharmacyId }, {
        $set: {
            status
        }
    })
}

exports.getPharmacyByFloor = (floorId) => {
    return Pharmacy.aggregate([
        {
            $match: {
                floorId: mongoose.Types.ObjectId(floorId)
            }
        }
    ])
}

exports.getPharmacyByBuilding = async (buildingId) => {
    return Pharmacy.aggregate([
        {
            $match: {
                buildingId: mongoose.Types.ObjectId(buildingId)
            }
        }
    ])
}

exports.updatePharmacyOwner = ({ pharmacyId }, { ownerId }) => {
    return Pharmacy.updateOne({ _id: pharmacyId }, {
        $set: {
            ownerId: ownerId || null
        }
    })
}