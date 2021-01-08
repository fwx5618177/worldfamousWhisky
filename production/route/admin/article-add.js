// 引入第三方模块formidable
const formidable = require('formidable');
const path = require('path');
const { Article } = require('../../model/article');
const fs = require('fs');
const { User } = require('../../model/user');

module.exports =  (req, res, next) => {
    //  res.send('ok');
    // 1.创建表单解析对象
    const form = new formidable.IncomingForm();
    // 2.配置上传文件的存放位置
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads')
    // console.log(form.uploadDir);
    // 3.保留上传文件的后缀
    form.keepExtensions = true;
    // 4.解析表单
    form.parse(req, async (err, fields, files) => {
        // res.send(files);
        // return res.send(files.cover.path.split('public')[1]);
        let coverFile = files.cover.path.split('public')[1];
        // return res.send(coverFile);
        let QRfile = files.QRcode.path.split('public')[1]; 
        // return res.send(QRfile);
        // return res.send(coverFile, QRfile);
        let filedDir = path.join(__dirname, '../../public');

        let location = `${filedDir}${coverFile}`;
        let QRlocation = `${filedDir}${QRfile}`;

        let fix = files.cover.path.split('.')[1];
        let QRfix = files.QRcode.path.split('.')[1];

        console.log(fix)

// coverFile:/uploads/upload_91ec68479b798f9d210e95b7797b8ac2
// QRfile:/uploads/upload_28f8ae9d9ece60ba6809e8012a4a4084
// fix:0/production/public/uploads/upload_91ec68479b798f9d210e95b7797b8ac2
// QRfix:0/production/public/uploads/upload_28f8ae9d9ece60ba6809e8012a4a4084



        if(!fields.title || !fields.author || !fields.sorts || !fields.price) {
            // return res.send(location);
                fs.unlink(`${location}`,(err) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log('delete ok');
                  }
                });

                fs.unlink(`${QRlocation}`,(err) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log('delete ok');
                  }
                });


            return next(JSON.stringify({path: '/admin/article-edit', message: '标题,分类,价格未填写'}))
        }
        // fwxtest-
        if(!fields.publishDate)  fields.publishDate = new Date();
        if(!coverFile || !fix || !QRfix || !QRfile){
          // win
          // coverFile = '\\uploads\\default\\default.jpg';
          // QRfile = '\\uploads\\default\\QR-default.jpg';
          // linux
          coverFile = '/uploads/default/default.jpg';
          QRfile = '/uploads/default/QR-default.jpg';

          fs.unlink(`${location}`,(err) => {
            if (err) {
              console.log(err);
            } else {
              console.log('delete ok');
            }
          });


          fs.unlink(`${QRlocation}`,(err) => {
            if (err) {
              console.log(err);
            } else {
              console.log('delete ok');
            }
          });
        }
        // return res.send(fields.author.username);
        const authorId = await User.findOne({_id: fields.author});
        const formData = await Article.create({
            title: fields.title,
            author: fields.author,
            createAuthor: authorId.username,
            lastAuthor: authorId.username,
            publishDate: fields.publishDate,
            cover: coverFile,
            QRfile: QRfile,
            content: fields.content,
            sorts: fields.sorts,
            contentImage: JSON.stringify(global.imgarr),
            price: fields.price,
            slip: fields.slip,
            insgram: fields.insgram
        })

        global.imgarr = [];
        console.log('增加后的global:', global.imgarr);

        // console.log(formData);
        return res.redirect('/admin/article');
    })
}