const { Article } = require('../../model/article');
const pagination = require('mongoose-sex-page');
const path = require('path');

module.exports = async (req, res) => {

    
    const { searchItem, type } = req.body;
    console.log(req.body);


    let page = req.query.page || 1;

    let pagesize = req.query.pagesize || 10;
    let count = await Article.countDocuments();

    if(pagesize == 0)   pagesize = count;
    let total = Math.ceil(count / pagesize);

    let articles;


    switch (type) {
        case "title":
            articles = await pagination(Article).find({"title": searchItem }).sort({ "title": 1 }).page(page).size(pagesize).display(total).populate('author').exec();
            break;
        case "sorts":
            // return res.send(sequence+typeof sequence);
            articles = await pagination(Article).find({"sorts": searchItem }).sort({"sorts": 1}).page(page).size(pagesize).display(total).populate('author').exec();
            break;
        case "price":
            articles = await pagination(Article).find({"price": searchItem }).sort({"price": 1}).page(page).size(pagesize).display(total).populate('author').exec();
            break;
        case "date":
            articles = await pagination(Article).find({"publishDate": searchItem }).sort({"publishDate": 1}).page(page).size(pagesize).display(total).populate('author').exec();
            break;
        default:
            articles = await pagination(Article).find({"title": searchItem }).sort({"publishDate": 1, "author": -1, "sorts": 1, "title": 1 }).page(page).size(pagesize).display(total).populate('author').exec();
    }


    articles.records.forEach((item) => {
        if( item.slip > 0){
            // slips.push(item.cover.split(path.sep).join('/'));
            item.cover = item.cover.split(path.sep).join('/');
            item.QRfile = item.QRfile.split(path.sep).join('/');
            // console.log(item);
            // slips[item.title] = item.cover.split(path.sep).join('/');
            // if (item.content !== null) item.content = item.content.split(path.sep).join('/');
        }
    });

    // return res.send(articles);
    let sortsArr = await Article.find({type: searchItem });
    sortsArr.forEach((item) => {
        if( item.slip > 0){
            // slips.push(item.cover.split(path.sep).join('/'));
            item.cover = item.cover.split(path.sep).join('/');
            item.QRfile = item.QRfile.split(path.sep).join('/');
            console.log(item);
        }
    });

    return res.render('home/product-list.art', {
        articles: articles,
        sortsArr: sortsArr
    });
    
};