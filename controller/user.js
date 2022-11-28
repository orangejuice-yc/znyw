const {User} = require('../model')

//封装user router中的处理请求
//用户登录
exports.login = async (req,res,next) => {
    try {
        //处理请求
        res.send('post login')
    } catch(err) {
        next(err)
    }
}

//用户注册
exports.register = async (req,res,next) => {
    try {
        //1.获取请求数据
        console.log(req.body)
        //2.数据验证
        //2.1基本数据验证
        //2.2业务数据验证
        
        //3.验证通过，将数据保存到数据库
        const User = new User(req.body.user)
        await User.save()

        //4.发送成功相应
        res.status(201).json({
            User
        })

        //处理请求
        res.send('post register')
    } catch(err) {
        next(err)
    }
}
//用户详情
exports.getCurrentUser = async (req,res,next) => {
    try {
        //处理请求
        res.send('getCurrentUser')
    } catch(err) {
        next(err)
    }
}

//更新用户详情
exports.updateCurrentUser = async (req,res,next) => {
    try {
        //处理请求
        res.send('updateCurrentUser')
    } catch(err) {
        next(err)
    }
}
