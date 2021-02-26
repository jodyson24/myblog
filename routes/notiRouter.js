const router = require('express').Router()
const notiCtrl = require('../controllers/notiCtrl')
const auth = require('../middlewares/auth')

router.route('/notifications')
    .get(notiCtrl.getNotificatons)

router.route('/notifications/:id/mark-as-read')
    .put(auth, notiCtrl.readNotfication)

router.route('/notifications/:id/delete')
    .delete(auth, notiCtrl.deleteNotfication)

module.exports = router