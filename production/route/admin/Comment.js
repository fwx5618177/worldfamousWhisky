// 将文章集合的构造函数导入到当前文件中
const { Comment } = require('../../model/comment');
// 导入mongoosee-sex-page
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
    req.app.locals.currentLink = 'Comment';
    
    console.log("Enter comment ....");
    
    let page = req.query.page || 1
    
    let pagesize = 10;
    let count = await Comment.countDocuments();
    let total = Math.ceil(count / pagesize);

    let comments = await pagination(Comment).find().sort({"time": 1}).page(page).size(pagesize).display(total).populate('aid').exec();
  
    // comments.content = unescape(comments.content);
    // console.log(unescape(comments.records[0].content));
    console.log("Item: ");
    comments.records.forEach(item => {
        item.content = unescape(item.content);
        
        console.log(item.content);
    });
    
    // console.log(comments.pages);
    console.log("comment content:");
    console.log(comments);
    // res.send(comments);
    return res.render('admin/Comment.art', {
        comments: comments
    });
    
}