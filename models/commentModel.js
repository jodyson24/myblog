const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const Populate = require("../utils/autopopulate");

const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


// commentSchema
//     .pre('findOne', Populate('author'))
//     .pre('find', Populate('author'))
//     .pre('findOne', Populate('comments'))
//     .pre('find', Populate('comments'))

module.exports = mongoose.model("Comments", commentSchema)