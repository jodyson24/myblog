const router = require('express').Router()
const categoryCtrl = require('../controllers/categoryCtrl')
const auth = require('../middlewares/auth')


router.route('/category')
    .get(categoryCtrl.getCategory)
    .post(categoryCtrl.createCategory)

router.route('/category/:id')
    .delete(auth, categoryCtrl.deleteCategory)
    .put(auth, categoryCtrl.updateCategory)

module.exports = router