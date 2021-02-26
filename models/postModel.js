const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
//const Populate = require("../utils/autopopulate");

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    // author: {
    //     type: ObjectId, 
    //     ref: "Users", 
    //     required: true
    // },
    author:{
        type: String,
        required: true
    },
    blogPost:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    comments:[{ 
        type: ObjectId, 
        ref: 'Comments' 
    }],
    seen:{
        type: Number,
        default: 0
    },
    likes:{
        type: Number,
        default: 0
    },
    hates:{
        type: Number,
        default: 0
    },
},{
    timestamps: true
})

// postSchema
//     .pre('findOne', Populate('author'))
//     .pre('find', Populate('author'))

module.exports = mongoose.model("Posts", postSchema)