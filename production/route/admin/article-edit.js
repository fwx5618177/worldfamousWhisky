const { Article } = require('../../model/article');

module.exports = async (req, res) => {   
    // 标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';

    const { message, id } = req.query;

    if(req.app.locals.userInfo.state == 1) return res.render('admin/article', {
        message: '您的账户已经被冻结'
    });

    let list = await Article.find();
    // return res.send(list);
    // console.log(list);
    let strSlip = '';
    let strInsgram = '';
    let arrSlip = [];
    let arrInsgram = [];
    let maxNum = 4;

    list.forEach((item) => {
        if(item.slip != -1) {
            strSlip = strSlip + item.slip + ',';            
        }

        if(item.insgram != -1) {
            strInsgram = strInsgram + item.insgram + ',';
        }
    })
    
    // return res.send(strInsgram);
    if (strSlip.length > maxNum * 2 - 1 || 
        strSlip.length < 0 ||
        strInsgram.length > maxNum * 2 - 1 ||
        strInsgram.length < 0) {
	
	console.log("Out of Range.");
}else{

    for(i = 1; i <= maxNum; i++){
        let flagSlip = strSlip.indexOf(i);
        console.log(i+":"+flagSlip);
        let flagInsgram = strInsgram.indexOf(i);
        // console.log(i+":"+flagInsgram);
        // console.log(typeof flagSlip);
        // console.log(flagSlip < 0);
        // console.log("result:"+ parseInt(flagSlip) === -1);
        if(flagSlip < 0) {
            arrSlip.push(i);
        }

        if(flagInsgram < 0) {
            arrInsgram.push(i);
        }
    }
    // 2
    // return res.send(arrInsgram);
}
    if(id) {
        let article = await Article.findOne({_id: id});
        // res.send(article);
        
        // 渲染文章编辑页面（修改）
        return res.render('admin/article-edit', {
            message: message,
            article: article,
            link: `/admin/article-modify?id=${id}`,
            button: '修改',
            arrSlip: arrSlip,
            arrInsgram: arrInsgram

        })
    }else {
        return res.render('admin/article-edit', {
            message: message,
            link: '/admin/article-add',
            button: '添加',
            arrSlip: arrSlip,
            arrInsgram: arrInsgram
        })
    }
    
}
