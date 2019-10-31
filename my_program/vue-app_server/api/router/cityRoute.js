// const Koa = require('koa')
const KoaRouter = require('koa-router')
let router = new KoaRouter();
router.get('/',async(ctx)=>{
        ctx.body = '添加城市接口'
})
module.exports = router;