const Posts = require('../models/postModel')
const Comments = require('../models/commentModel')
const showdown = require('showdown')
const Notifications = require('../models/notificationModel')
//const sendNotice = require('../libraries/sendNotice')
const webPush = require('web-push')
const PushSubscription = require('../models/subscribeModel')
const Users = require('../models/userModel')

converter  = new showdown.Converter();

class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering() {
        const queryObj = { ...this.queryString } //queryString = req.query

        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete (queryObj[el]))

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

        //    gte = greater than or equal
        //    lte = lesser than or equal
        //    lt = lesser than
        //    gt = greater than
        this.query.find(JSON.parse(queryStr))

        return this;
    }

    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 12
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const postCtrl = {
    getPosts: async (req, res) => {
        try {
            const features = new APIfeatures(Posts.find().populate('comments'), req.query)
                .filtering().sorting().paginating()

            const posts = await features.query

            res.json({
                status: 'success',
                result: posts.length,
                posts: posts
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createPost: async (req, res) => {
        try {
            const { title, author, blogPost, category, image } = req.body

            if (!image) return res.status(400).json({ msg: "No image upload" })

            // const post = await Posts.findOne({post_id})
            // if(post)
            //     return res.status(400).json({msg: "This post already exists."})

            const newPost = new Posts({
                title: title.toLowerCase(), author, 
                blogPost: blog_post = converter.makeHtml(blogPost), 
                category, image
            })

            await newPost.save()
            res.json({ msg: "Posted" })

            await Users.findOneAndUpdate({ _id: req.params.id }, {
                $push: { notifications: newComment }
              }, { safe: true, upsert: true })

            const newNotify = new Notifications({
                title: "New post created",
                message: "A new post has been created",
            })

            await newNotify.save()

            const payload = "New post created"

            // for (let i = 0; i < PushSubscription.length; i++) {
            //     const subscription = subscriptions[i];
            //     promiseChain = promiseChain.then(() => {
            //       return triggerPushMsg(subscription, dataToSend);
            //     });
            //   }
            
            //sendNotice(payload)

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    editPost: async (req, res) => {
        try {
            const { title, author, blogPost, category, image } = req.body;
            if (!image) return res.status(400).json({ msg: "No image upload" })

            await Posts.findOneAndUpdate({ _id: req.params.id }, {
                title: title.toLowerCase(), author, blogPost, category, image
            })

            res.json({ msg: "Post Updated" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deletePost: async (req, res) => {
        try {
            await Posts.findByIdAndDelete(req.params.id)
            res.json({ msg: "Post deleted" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    likePost: async (req, res) => {
        try {
            await Posts.findOneAndUpdate({ _id: req.params.id }, {
                $inc: { likes: +1 }
            })

            const newNotify = new Notifications({
                title: "Post liked",
                message: "A user just liked a post",
            })

            await newNotify.save()

            return res.json({ msg: "Post liked" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    hatePost: async (req, res) => {
        try {
            await Posts.findOneAndUpdate({ _id: req.params.id }, {
                $inc: { hates: +1 }
            })

            const newNotify = new Notifications({
                title: "Post hated",
                message: "A user just hated a post",
            })

            await newNotify.save()

            return res.json({ msg: "Post Hated" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    seenCounter: async (req, res) => {
        try {
            await Posts.findOneAndUpdate({ _id: req.params.id }, {
                $inc: { seen: +1 }
            })

            return res.json({ msg: "Post seen" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}


module.exports = postCtrl