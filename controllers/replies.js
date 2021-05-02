const Posts = require("../models/postModel");
const Comments = require("../models/commentModel");
const Users = require("../models/userModel")

module.exports = app => {
    // NEW REPLY
    // app.get("/posts/:postId/comments/:commentId/replies/new", (req, res) => {
    //     var currentUser = req.user;
    //     let post;
    //     Posts.findById(req.params.postId).lean()
    //         .then(p => {
    //             post = p;
    //             return Comments.findById(req.params.commentId).lean();
    //         })
    //         .then(comment => {
    //             res.render("replies-new", { post, comment, currentUser });
    //         })
    //         .catch(err => {
    //             console.log(err.message);
    //         });
    // });

    // CREATE REPLY
    app.post("/posts/:id/comments/:id/replies", (req, res) => {
        // TURN REPLY INTO A COMMENT OBJECT
        const reply = new Comment(req.body);
        reply.author = req.user._id
        // LOOKUP THE PARENT POST
        Posts.findById(req.params.id)
            .then(post => {
                // FIND THE CHILD COMMENT
                Promise.all([
                    reply.save(),
                    Comments.findById(req.params.id),
                ])
                    .then(([reply, comment]) => {
                        // ADD THE REPLY
                        comment.comments.unshift(reply._id);

                        return Promise.all([
                            comment.save(),
                        ]);
                    })
                    .then(() => {
                        res.json({msg: "Successful"});
                    })
                    .catch(console.error);
                // SAVE THE CHANGE TO THE PARENT DOCUMENT
                return post.save();
            })
    });
}