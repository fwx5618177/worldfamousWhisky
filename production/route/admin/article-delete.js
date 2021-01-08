const { Article } = require('../../model/article');
const path = require('path');
const fs = require('fs');

module.exports = async (req, res) => {
    const deleId = req.query.id;
    // return res.send(deleId);
    

    const article = await Article.findOne({_id: deleId});
    // console.log(article);
    // \uploads\default\default.jpg
    // return res.send(article.cover);
    const cover = article.cover;
    const QRfile = article.QRfile;
    const uploadDir = path.join(__dirname, '../../public');
    // D:\code data\node\production-blog\production\public
    // return res.send(uploadDir);
    let coverfix = cover.split('uploads')[1];
    let QRfilefix = QRfile.split('uploads')[1];
    // \default\default.jpg
    // return res.send(coverfix);
//win
    // let coverDefault = '\\default\\default.jpg';
    // let QRDefault = '\\default\\QR-default.jpg';
  //linux
    let coverDefault = '/default/default.jpg';
    let QRDefault = '/default/QR-default.jpg';

    if(cover && coverfix != coverDefault){
      fs.unlink(`${uploadDir}${cover}`,(err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('delete ok');
        }
      });
    }
    if(QRfile && QRfilefix != QRDefault){
      // console.log(QRfile)
      // return res.send(QRfile)
      fs.unlink(`${uploadDir}${QRfile}`,(err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('delete ok');
        }
      });
    }
//wiwn
    // let jonstr = '\\uploads\\content';
// linux
    let jonstr = '/uploads/content';
    if(article.contentImage) {
      let contentimg = JSON.parse(article.contentImage);

      contentimg.forEach((item) => {
        fs.unlink(`${uploadDir}${jonstr}${item}`,(err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('delete ok');
          }
        });
      })
    }

    



    // return res.send(contentFile);

    let result = await Article.findOneAndDelete({_id: deleId});
    console.log(result)

    return res.redirect('/admin/article');

}