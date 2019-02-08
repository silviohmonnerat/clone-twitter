const mogoose = require("mongoose")

const TweetSchema = mogoose.Schema({
    author: String,
    content: String,
    likes: {
        type: Number,
        default: 0,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
})

module.exports = mogoose.model("Tweet", TweetSchema)