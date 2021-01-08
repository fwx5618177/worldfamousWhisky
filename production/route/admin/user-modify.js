const { User } = require('../../model/user');
const bcrypt = require('bcryptjs');

module.exports = async (req, res, next) => {
    const { username, email, role, state, password } = req.body;
    const id = req.query.id;

    // 查询用户id
    let user = await User.findOne({_id: id});

    // 根据邮箱地址查询用户是否存在
    let mail = await User.findOne({email: req.body.email});
    if (user.email != email){
        if (mail) {
            return next(JSON.stringify({path:'/admin/user-edit', message: '邮箱地址已经被占用', id: id}));
        }
    }

    //判定当前用户的身份
    // root用户时
    let root = req.app.locals.userInfo.root;
    let roleR = req.app.locals.userInfo.role;
    let stateR = req.app.locals.userInfo.state;
    // {"state":0,"root":0,"_id":"5ef1a9f47a275c8298842f54","username":"root","email":"root@qq.com","password":"$2a$10$ttUtF9DZ.4u4XUU/2HHVyeemcQ0WVrmXXow4kZn5EKiaG3ruyS2p.","role":"root","__v":0}
    // return res.send(req.app.locals.userInfo)
    if(root == 0 && roleR == 'root' && stateR == 0) {
        await User.updateOne({_id: id}, {
            username: username,
            email: email,
            role: role,
            state: state 
         });
 
         return res.redirect('/admin/user');
    }

    //非root用户
    // 比较密码
    const isValid = await bcrypt.compare(password, user.password);

    if(isValid) {

        await User.updateOne({_id: id}, {
           username: username,
           email: email,
           role: role,
           state: state 
        });

        return res.redirect('/admin/user');
        
    }else {
        let obj = {path: '/admin/user-edit', message: '密码对比失败，不能进行用户信息的修改', id: id}
        return next(JSON.stringify(obj));
    }

}