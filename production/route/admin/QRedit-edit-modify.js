const { Article } = require('../../model/article');
const { User } = require('../../model/user.js');
// 引入第三方模块formidable
const formidable = require('formidable');
const { date } = require('joi');
const path = require('path');
const fs = require('fs');
const { userInfo } = require('os');

module.exports = async (req, res, next) => {
    const id = req.query.id;
    // console.log('id:'+id);

    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads', 'QRfile');
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
        const { title, sorts, price } = fields;
        
        
        let QRfile = files.QRcode.path.split('public')[1];
        let filedDir = path.join(__dirname, '../../public');
        let QRlocation = `${filedDir}${QRfile}`;
        let QRfix = files.QRcode.path.split('.')[1];

        let QRDefault = '\\uploads\\default\\QR-default.jpg';
        let article = await Article.findOne({_id: id});
        
        // console.log(article);
        // console.log(id);
        // return res.send(article);

        // return res.send(QRfile);
        if( !title || !sorts || !price ) {
            
            // return res.redirect('/admin/article')

              fs.unlink(`${QRlocation}`,(err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log('delete ok');
                }
              });
            let obj = {path: '/admin/article-edit', message: '内容未填写，不能进行用户信息的修改', id: id};
            return next(JSON.stringify(obj))
            
        }
        
        if(!QRfix || !QRfile){
            QRfile = QRDefault;
            fs.unlink(`${QRlocation}`,(err) => {
              if (err) {
                console.log(err);
              } else {
                console.log('delete ok');
              }
            });
          }

        if(article.QRfile !== QRDefault ){
            console.log('article.QRfile !== QRDefault');
            if(article.QRfile !== QRfile){
                console.log('article.QRfile !== QRfile');
                fs.unlink(`${filedDir}${article.QRfile}`,(err) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log('delete ok');
                    }
                  });
            }
            
        } 



        let lastAuthorId = req.app.locals.userInfo._id;
        let lastAuthorUsername = await User.findOne({_id: lastAuthorId});
        let lastModifyDate = new Date();

        await Article.updateOne({_id: id}, {
            title: title,
            lastAuthor: lastAuthorUsername.username,
            lastModifyDate: lastModifyDate,
            sorts: sorts,
            price: price,
            QRfile: QRfile,
        })

        return res.redirect('/admin/QRedit');
    });



}