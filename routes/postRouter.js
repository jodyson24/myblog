const router = require('express').Router()
const postCtrl = require('../controllers/postCtrl')
const auth = require('../middlewares/auth')



router.route('/posts')
    .post(postCtrl.createPost)
    .get(postCtrl.getPosts)

router.route('/posts/:id')
    .put(auth, postCtrl.editPost)
    .delete(auth, postCtrl.deletePost)

router.route('/posts/:id/like-post')
    .put(postCtrl.likePost)

router.route('/posts/:id/hate-post')
    .put(postCtrl.hatePost)

router.route('/posts/:id/seen-counter')
    .put(postCtrl.seenCounter)


module.exports = router