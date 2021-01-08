// 将文章集合的构造函数导入到当前文件中
const { Article } = require('../../model/article');
// 导入mongoosee-sex-page
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
    req.app.locals.currentLink = 'QRedit';

    let page = req.query.page || 1

    let sequence = parseInt( req.query.sequence ) || 0;
    let pagesize = 10;
    let count = await Article.countDocuments();
    let total = Math.ceil(count / pagesize);

    let articles;

    
    
    switch (sequence) {
        case 0:
            articles = await pagination(Article).find().sort({"publishDate": 1, "author": -1, "sorts": 1, "title": 1 }).page(page).size(pagesize).display(total).populate('author').exec();
            break;
        case 1:
            // return res.send(sequence+typeof sequence);
            articles = await pagination(Article).find().sort({"slip": 1}).page(page).size(pagesize).display(total).populate('author').exec();
            break;
        case 2:
            articles = await pagination(Article).find().sort({"lastModifyDate": 1}).page(page).size(pagesize).display(total).populate('author').exec();
            break;
        case 3:
            articles = await pagination(Article).find().sort({"sorts": 1}).page(page).size(pagesize).display(total).populate('author').exec();
            break;
        case 4:
            articles = await pagination(Article).find().sort({"publishDate": 1}).page(page).size(pagesize).display(total).populate('author').exec();
            break;
        case 5:
            articles = await pagination(Article).find().sort({"author": -1}).page(page).size(pagesize).display(total).populate('author').exec();
            break;
        case 6:
            articles = await pagination(Article).find().sort({"title": 1}).page(page).size(pagesize).display(total).populate('author').exec();
            break;
        default:
            articles = await pagination(Article).find().sort({"publishDate": 1, "author": -1, "sorts": 1, "title": 1 }).page(page).size(pagesize).display(total).populate('author').exec();
    }

    
    // console.log(articles.pages);
    // res.send(articles);
    return res.render('admin/QRedit.art', {
        articles: articles
    });
    
}