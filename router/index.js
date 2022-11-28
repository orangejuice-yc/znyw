const express = require('express')

const router = express.Router();

//用户相关路由
router.use(require('./user'))

//用户资料相关路由
router.use('/profiles',require('./profile'))
// router.get('/',(req,res)=>{
//     res.send('hello world')
// })

// router.post('/',(req,res) => {
//     console.log(req.body);
//     res.send('hello world')
// })

module.exports = router;