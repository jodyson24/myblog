const router = require('express').Router()
const userCtrl  =  require('../controllers/userCtrl')
const auth = require('../middlewares/auth')


router.post('/register', userCtrl.register)

router.post('/login', userCtrl.login)

router.post('/logout', userCtrl.logout)

router.get('/refresh_token', userCtrl.refreshToken)

router.get('/infor', auth, userCtrl.getUserInfor)

router.get('/all_infor', auth, userCtrl.getAllUsersInfor)

router.put('/update', auth, userCtrl.updateUser)



module.exports = router