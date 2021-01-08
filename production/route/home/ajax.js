const { Article } = require('../../model/article');

const pagination = require('mongoose-sex-page');
const path = require('path');

module.exports = async (req, res) => {
    // console.log(req);
    // console.log('req.body:'+req.body);
    // console.log('string:'+JSON.parse(req.body));
    let postData = '';
    req.on('data', chunk => {
        postData += chunk.toString();
    })

    req.on('end', async () => {
        // console.log('postData:'+postData);
        // console.log(typeof postData);

         
        let dataString = JSON.parse(postData);
        let name = dataString.name;
        let data = parseInt(dataString.data);
        let id = dataString.id;
        // console.log(typeof data);
        // console.log(name+','+data)
        let count;
        if(name == 'favorite'){
            if(data == 1){
                count = data;
            }else{
                count = -1;
            }
        }
        
        let articles = await Article.findOne({_id: id});
        
        await Article.updateOne({_id: id}, {
            favoriteNum: articles.favoriteNum + count
        });

  

        return;
    })



}