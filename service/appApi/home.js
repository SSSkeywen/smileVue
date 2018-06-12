const Router = require('koa-router')

let router = new Router()
router.get('/', async(ctx) => {
    ctx.body = '这是用户操作首页home'
})

module.exports = router