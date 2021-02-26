const router = require('express').Router()
const pushSubscriptionCtrl = require('../controllers/subscribeCtrl')

router.post('/push-subscribe', pushSubscriptionCtrl.subscribeToPush)

module.exports = router