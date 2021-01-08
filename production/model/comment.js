const { boolean } = require('joi');
const mongoose = require('mongoose');
const { Article } = require('./article');

const commentSchema = new mongoose.Schema({
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    name: {
        type: String  
    },
    ip: {
        type: String
    },
    time: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        default: null
    },
    status: {
        type: Boolean,
        default: false
    },
    mail: {
        type: String,
        default: null
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = {
    Comment
}