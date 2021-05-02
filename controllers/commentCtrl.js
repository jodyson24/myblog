const Posts = require('../models/postModel')
const Comments = require('../models/commentModel')
const Notifications = require('../models/notificationModel')


const commentCtrl = {
  getComments: async (req, res) => {
    try {
      const comments = await Comments.find()
      res.json(comments)
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  createComment: async (req, res) => {
    try {
      const { name, comment } = req.body;

      const newComment = new Comments({ name, comment })

      await newComment.save()

      await Posts.findOneAndUpdate({ _id: req.params.id }, {
        $push: { comments: newComment }
      }, { safe: true, upsert: true })

      const newNotify = new Notifications({
        title: "New Comment created",
        message: "a new comment has been added to a post",
        //postRef: posts._id,
      })

      await newNotify.save()

      const dataToSend = JSON.stringify(req.body);

      res.json({ msg: "Comment Added!" })

    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  deleteComment: async (req, res) => {
    try {
      await Comments.findByIdAndDelete(req.params.id)

      await Posts.findOneAndUpdate({ _id: req.params.id }, {
        $pull: { comments: Comments._id }
      }, { safe: true, upsert: true })

      res.json({ msg: "Comment deleted" })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  updateComment: async (req, res) => {
    try {
      const { name, comment } = req.body;

      await Comments.findOneAndUpdate({ _id: req.params.id }, {
        name, comment
      })

      res.json({ msg: "comment edited" })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

module.exports = commentCtrl