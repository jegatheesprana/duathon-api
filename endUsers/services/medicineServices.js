const mongoose = require('mongoose')
const Medicine = require('../../models/Medicine')
const Building = null

exports.getAllMedicines = (keyword) => {
    return Medicine.aggregate(
        [
            { $match: { $text: { $search: keyword } } },
            //   { $sort: { score: { $meta: "textScore" } } },
            //   { $project: { title: 1, _id: 0 } }
            // {
            //     $lookup: {
            //         from: "users",
            //         as: 'author',
            //         localField: 'author',
            //         foreignField: '_id'
            //     }
            // },
            // {
            //     $addFields: {
            //         author: { $arrayElemAt: ['$author', 0] },
            //     }
            // },
        ]
    )
}