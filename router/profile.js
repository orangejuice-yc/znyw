const express = require('express')

const router = express.Router();


//获取用户详情
router.post('/:username',async (req,res,next)=>{
    try {
        res.send('post /profiles/:username')
    } catch (err) {
        next(err)
    }
})



module.exports = router;