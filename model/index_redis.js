const ioredis = require('ioredis')
// const dbUri = require('../config/config.default')
// 1. 建立连接
const redis = new ioredis({
  port: 6379,
  host: '127.0.0.1',
  showFriendlyErrorStack: true
})

async function main () {
  try {
    await redis.set('foo', 'bar', (err, ret) => {
      if (err) {
           return console.log('写入失败', err)
         }
      
         console.log('写入成功', ret)
       })
    // console.log('OK')
  } catch (err) {
    console.log('操作失败', err)
  }
}

main()

//组织导出模型类
// module.exports = {
//   User:ioredis.model('User',require('./user'))
// }
//事务操作
// async function main () {
//   try {
//     const ret = await redis
//       .multi()
//       .set('Jack', 100)
//       .set('Rose', 200)
//       .exec()
//     console.log(ret)
//   } catch (err) {
//     console.log('操作失败', err)
//   }
// }

// main()

// async function main () {
//   try {
//     const pipeline = redis.pipeline()
//     for (let i = 0; i < 100; i++) {
//       pipeline.set(`${i}-foo`, i)
//     }
//     const ret = await pipeline.exec()
//     console.log(ret)
//   } catch (err) {
//     console.log('操作失败', err)
//   }
// }

// main()

// async function main () {
//   try {
//     const ret = await redis.get('foo')
//     console.log(ret)
//   } catch (err) {
//     console.log('操作失败', err)
//   }
// }

// main()

// redis.get('foo')
//   .then(ret => {
//     console.log(ret)
//   })
//   .catch(err => {
//     console.log('获取失败', err)
//   })

// 2. 操作 Redis 数据库
// redis.set('foo', 'bar', (err, ret) => {
//   if (err) {
//     return console.log('写入失败', err)
//   }

//   console.log('写入成功', ret)
// })

// redis.get('foo', (err, ret) => {
//   if (err) {
//     return console.log('获取失败', err)
//   }
//   console.log(ret)
// })
