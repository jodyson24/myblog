const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const notificationSchema = new mongoose.Schema({
    read: {
        type: Boolean,
        default: false
    },
    title: {
        type: String
    },
    message: {
        type: String,
        // required: true
    },
    postRef: {
        type: ObjectId,
        ref: 'Posts'
    },
    // action: {
    //     type: String
    // }
}, {
    timestamps: true
})

module.exports = mongoose.model("Notifications", notificationSchema)