const { Article } = require('../../model/article');

module.exports =async (req, res) => {

        // 标识当前访问的是文章管理页面
        req.app.locals.currentLink = 'QRedit';

        const { message, id } = req.query;
    
        if(req.app.locals.userInfo.state == 1) return res.render('admin/QRedit', {
            message: '您的账户已经被冻结'
        });

        if(id){
            let article = await Article.findOne({_id: id});

            // {"cover":"
                // \\uploads\\upload_8b3a43e4b5169db9dcca7730aa797a5c.jpg",
                // "QRfile":null,
                // "slip":-1,
                // "insgram":-1,
                // "_id":"5ef18ec00695ae7158dcf4ab",
                // "title":"fwxtest-1111112222",
                // "author":"5ee729319505db79f426d566",
                // "publishDate":"2020-06-23T05:10:24.587Z",
                // "content":"<p>fwxtest-1111112222</p>",
                // "sorts":"fwxtest-1111112222",
                // "__v":0,
                // "lastAuthor":"root",
                // "lastModifyDate":"2020-07-11T11:44:43.892Z",
                // "price":null}
            // return res.send(article);
            return res.render('admin/QRedit-edit.art', {
                
                message: message,
                article: article,
                link: `QRedit-edit?id=${id}`,
                button: '修改'

            });
        }else {
            return res.redirect('QRedit');
        }


}