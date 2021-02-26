const Notifications = require('../models/notificationModel')
const Posts = require('../models/postModel')
const Comments = require('../models/commentModel')

const notificationCtrl = {
    getNotificatons: async (req, res) => {
        try {
            const notifications = await Notifications.find()
            res.json(notifications)

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    readNotfication: async (req, res) => {
        try {
            await Notifications.findOneAndUpdate({_id: req.params.id}, {
                $set: {read:  true}
            })

            res.json({msg: 'Notification Read'})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteNotfication: async (req, res) => {
        try {
            await Notifications.findByIdAndDelete(req.params.id)
            res.json({msg: 'Notification Deleted'})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = notificationCtrl