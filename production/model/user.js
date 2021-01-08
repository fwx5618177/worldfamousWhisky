// 创建用户集合
// 引入mongoose第三方模块
const mongoose = require('mongoose');
// 导入bcryptjs
const bcrypt = require('bcryptjs');
// 引入Joi模块
const Joi = require('joi');
// 创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        // 保证邮箱地址在插入数据库时不重复
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // admin 超级管理员
    // normal 普通用户
    // root 根用户
    role: {
        type: String,
        required: true
    },
    // 0 启用状态
    // 1 禁用状态
    state: {
        type: Number,
        default: 0
    },

    // 管理员身份再判定
    // 0 root 用户
    // 1 普通admin用户
    root: {
        type: Number,
        default: 1
    }
});

// 创建集合
const User = mongoose.model('User', userSchema);

// 添加实例
// async function createUser() {
//     const salt = await bcrypt.genSalt(10);
//     const pass = await bcrypt.hash('123', salt);
//     const user = await User.create({
//         username: 'root',
//         email: 'root@qq.com',
//         password: pass,
//         role: 'root',
//         state: 0,
//         root: 0
//     });
// }

// createUser();

// 验证用户信息
const validateUser = user => {
    // 定义对象的验证规则
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不正确')),
        email: Joi.string().email().required().error(new Error('邮箱格式不正确')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码不正确')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值设定存在问题')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
        // root: Joi.number().valid(0, 1).error(new Error('不是根用户，没有权限'))
    };

    // 实施验证
    return  Joi.validate(user, schema);
}


// 将用户集合作为模块成员进行导出
module.exports = {
    User,
    validateUser
}