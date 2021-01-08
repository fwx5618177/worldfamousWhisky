// 将评论集合构造函数进行导入
const { Comment } = require('../../model/comment');
const { Article } = require('../../model/article');

module.exports = async (req, res) => {
    // 接收客户端传递过来的请求参数
    
    let name = escape(req.body.name);
    let mail = escape(req.body.mail);
    let content = escape(req.body.content);
    
    let aid = escape(req.body.aid);

    if(!name || !mail || !content || !aid){
        return res.redirect(`/home/article?id=${aid}`);
    }
/*     console.log("remote_addr:  "+req.remote_addr);
    console.log(req.headers['X-Real-IP']);
    console.log(req.headers['X-Forwarded-For'])
    console.log(req.UserHostAddress);
    console.log(req.headers['client-ip']);
    console.log(req.addr);
    console.log(req.socket.);
    let ip1 = req.headers['x-real-ip']; 
    let ip2 = req.headers['x-forwarded-for'];
    // let ip2 = req.headers['remoteAddress'];
    let ip3 = req.socket.remoteAddress || 'null';
    let ip4 = req.ip;
    let ip5 = req.connection.remoteAddress || 'null';
    let ip6 = req.socket.remoteAddress || 'null';
    // let ip7 = req.connection.socket.remoteAddress || 'null';
    // if(ip.split(',').length>0){
    //     ip = ip.split(',')[0];
    // }

    let ip = `${ip1}, ${ip2}, ${ip3}, ${ip4}, ${ip5}, ${ip6}, ${ip6}`;
 */

    let ip = req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress;
    // let aid = "1231";
    // console.log(ip);
    // return res.send(ip);
    // let article = await Article.findOne({_id: aid});

/*     if(article != null){
        return res.send("error");
    } */
/* 
    let resultJson = `${name}, ${mail}, ${content}, ${aid}, ${article}`;
    return res.send(resultJson);     */

    
    
    // const { name, mail, content } = escape(req.body);

    const result = await Comment.create({
        aid: aid,
        name: name,
        ip: ip,
        time: new Date(),
        content: content,
        mail: mail
    });
    // res.send(aid);
    return res.redirect(`/home/article?id=${aid}`);
}