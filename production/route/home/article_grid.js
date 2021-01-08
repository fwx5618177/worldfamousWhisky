const { Article } = require('../../model/article');
const { Comment } = require('../../model/comment');


module.exports = async (req, res, next) => {

    // res.send('欢迎来到博客文章详情页面')
    const id = req.query.id;
    // req.session.id = id;
    if(!id) {
        return res.redirect('/home/');
    }

    let article = await Article.findOne({_id: id}).populate('author');

    // 查询当前文章所对应的评论信息
    let comments = await Comment.find({aid: id}).populate('uid');

    // let commentnousers = await CommentNoUser.find({aid: id});
    let commentsCount = await Article.countDocuments();
    // return res.send(commentnousers);
        // res.send(article);
	console.log(article.publishDate);
    let preArticle = await Article.findOne({"publishDate": {'$lt': article.publishDate }}).sort({"publishDate": -1}).limit(1)

    
    let postArticle = await Article.findOne({"publishDate": {'$gt': article.publishDate }}).sort({"publishDate": 1}).limit(1)


    return res.render('home/article_grid.art', {
        article,
        comments,
        commentsCount,
        preArticle,
        postArticle

    });
}
