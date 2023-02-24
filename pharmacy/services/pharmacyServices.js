const mongoose = require('mongoose')
const Pharmacy = require('../../models/Pharmacy')
const bcrypt = require('bcryptjs');

exports.getAllPharmacies = () => {
    return Pharmacy.find({},'-password')
}

exports.getPharmacy = (pharmacyId) => {
    return Pharmacy.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(pharmacyId)
            }
        },
        {
            $project: {
                password: 0,
            }
        }
    ]).then(data => data[0])
}

exports.createPharmacy = async ({  name, email, address, phone, licenseNumber, website, operationgHours, password, owner }) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const pharmacy = new Pharmacy({
        name, email, address, phone, licenseNumber, website, operationgHours, password: hashedPassword, owner
    })
    return pharmacy.save()
}

exports.updatePharmacy = ({ pharmacyId, name, email, address, phone, licenseNumber, website, operationgHours, owner }) => {
    return Pharmacy.updateOne({ _id: pharmacyId }, {
        $set: {
            name, email, address, phone, licenseNumber, website, operationgHours, owner
        }
    })
}

exports.deletePharmacy = (pharmacyId) => {
    return Pharmacy.deleteOne({ _id: pharmacyId })
}

exports.changeStatus = ({ pharmacyId, enabled }) => {
    return Pharmacy.updateOne({ _id: pharmacyId }, {
        $set: {
            enabled
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