// 1.引入mongoose模块
const mongoose = require('mongoose');
const { User } = require('./user');
const { string } = require('joi');

// 2.创建文章集合规则
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: [100, '超出字符限制，请写入100以下的标题'],
        minlength: 1,
        required: [true, '请填写文章标题']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, '请传递作者']
    },
    createAuthor: {
        type: String
    },
    lastAuthor: {
        type: String,
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    lastModifyDate: {
        type: Date
    },
    cover: {
        type: String,
        default: null
    },
    QRfile: {
        type: String,
        default: null
    },
    content: {
        type: String
    },
    sorts: {
        type: String,
        required: [true, '请填写文章标题']
    },
    price: {
        type: String,
        required: [true, '请填写价格']
    },
    contentImage: {
        type: String
    },
    slip: {
        type: Number,
        default: -1
    },
    insgram: {
        type: Number,
        default: -1
    },
    favoriteNum: {
        type: Number,
        default: 0
    }
});

// 3.根据规则创建集合
const Article = mongoose.model('Article', articleSchema);

// console.log('success');
// 4.将集合规则作为模块成员导出
module.exports = {
    Article
}
