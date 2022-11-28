const mongoose = require('mongoose')
const dbUri = require('../config/config.default')
//链接MongoDB数据库
mongoose.connect(dbUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db = mongoose.connection

//当链接失败的时候
db.on('error',err => {
    console.log('MondoDB 数据库链接失败', err)
})

//当链接成功的时候
db.once('open',function() {
    console.log('MondoDB 数据库链接成功')
})

//组织导出模型类
module.exports = {
    User:mongoose.model('User',require('./user'))
}
// const Cat = mongoose.model('Cat',{ name : String })

// const Kitty = new Cat({ name : 'mimi' })

// Kitty.save().then(() => console.log('mewo'))