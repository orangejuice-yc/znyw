const express = require('express')
const morgan = require('morgan')
const cors = require('cors');
const router = require('./router')
const errorHandler = require('./middleware/error-handler')
require('./model/index_redis')

const app = express();

app.use(morgan())
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 2333

//挂载路由
app.use('/api',router)

//挂载统一处理服务端错误中间件
app.use(errorHandler())
// app.get('/',(req,res) => {
//     res.send('hello world')
// })

// app.post('/',(req,res) => {
//     console.log(res.body);
//     res.send('hello world')
// })

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})