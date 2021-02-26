const mongoose = require('mongoose')

const pushSubscriptionSchema = new mongoose.Schema({
    subscription: {
        type: Object
    }
},{
    timestamps: true
})

module.exports = mongoose.model("PushSubscription", pushSubscriptionSchema)