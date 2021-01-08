// 引入express框架
const express = require('express');
// 创建博客展示页面路由
const home = express.Router();

home.get('/', require('./home/index'));

// 博客前台文章详情展示页面
home.get('/article', require('./home/article_grid'));
home.get('/article_grid', require('./home/article_grid'));
home.get('/article_list', require('./home/article_list'));


// 创建评论功能路由
home.post('/comment', require('./home/comment'));
home.post('/commentNoUser', require('./home/commentNoUser'));

// home.get('/list', require('./home/listmenu'));

//产品排列 
home.get('/product', require('./home/product-grid'));
home.get('/product-grid', require('./home/product-grid'));
home.get('/product-list', require('./home/product-list'));
home.post('/search', require('./home/search'));
home.get('/search', require('./home/search-sorts'));
home.post('/ajax', require('./home/ajax'));

module.exports = home;