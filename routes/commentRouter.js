const router = require('express').Router()
const commentCtrl = require('../controllers/commentCtrl')

router.route('/comments')
    .get(commentCtrl.getComments)

router.route('/posts/:id/comments')
    .post(commentCtrl.createComment)

module.exports = router