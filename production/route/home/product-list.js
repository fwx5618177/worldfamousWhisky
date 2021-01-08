const { Article } = require('../../model/article');
const pagination = require('mongoose-sex-page');
const path = require('path');

module.exports = async (req, res, next) => {

    let page = req.query.page || 1;

    let sequence = parseInt( req.query.sequence ) || 0;

    let pagesize = req.query.pagesize || 10;
    let count = await Article.countDocuments();

    if(pagesize == 0)   pagesize = count;
    let total = Math.ceil(count / pagesize);

    let articles;

    switch (sequence) {
        case 0:
            articles = await pagination(Article).find().sort({"publishDate": 1, "author": -1, "sorts": 1, "title": 1 }).page(page).size(pagesize).display(total).populate('author').exec();
            break;
        case 1:
            // return res.send(sequence+typeof sequence);
            articles = await pagination(Article).find().sort({"title": 1}).page(page).size(pagesize).display(total).populate('author').exec();
            break;
        case 2:
            articles = await pagination(Article).find().sort({"favoriteNum": 1}).page(page).size(pagesize).display(total).populate('author').exec();
            break;
        case 3:
            articles = await pagination(Article).find().sort({"price": 1}).page(page).size(pagesize).display(total).populate('author').exec();
            break;
        case 4:
            articles = await pagination(Article).find().sort({"price": -1}).page(page).size(pagesize).display(total).populate('author').exec();
            break;
        case 5:
            articles = await pagination(Article).find().sort({"sorts": 1}).page(page).size(pagesize).display(total).populate('author').exec();
            break;
        case 6:
            articles = await pagination(Article).find().sort({"publishDate": 1}).page(page).size(pagesize).display(total).populate('author').exec();
            break;
        default:
            articles = await pagination(Article).find().sort({"publishDate": 1, "author": -1, "sorts": 1, "title": 1 }).page(page).size(pagesize).display(total).populate('author').exec();
    }

    articles.records.forEach((item) => {
        if( item.slip > 0){
            // slips.push(item.cover.split(path.sep).join('/'));
            item.cover = item.cover.split(path.sep).join('/');
            item.QRfile = item.QRfile.split(path.sep).join('/');
            console.log(item);
            // slips[item.title] = item.cover.split(path.sep).join('/');
            // if (item.content !== null) item.content = item.content.split(path.sep).join('/');
        }
    });

    // return res.send(articles);
    let sortsArr = await Article.find({});
    sortsArr.forEach((item) => {
        if( item.slip > 0){
            // slips.push(item.cover.split(path.sep).join('/'));
            item.cover = item.cover.split(path.sep).join('/');
            item.QRfile = item.QRfile.split(path.sep).join('/');
            console.log(item);
        }
    });

    let sortsValue = [];
    let sortsItem = [];
    sortsArr.forEach((item,index) => {
        console.log("sorts:"+item.sorts);
        //console.log("indexof:"+sortsArr.indexOf(item.sorts));
        if (sortsValue.indexOf(item.sorts) === -1){
            //console.log("item.sorts:"+item.sorts);
            sortsValue.push(item.sorts);
            sortsItem.push({
                id: item.id,
                sorts: item.sorts
            });
            //console.log("sortsValue:"+sortsItem[index].sorts);

            //console.log("indexof test:"+"fwxtest-1,fwxtest-2,fwx4,qwq1,fwxtest4,fwx4".indexOf("fwx4"));
        }
    });
    return res.render('home/product-list.art', {
        articles: articles,
        sequence: sequence,
        sortsArr: sortsArr,
        sortsItem: sortsItem
    });
}
