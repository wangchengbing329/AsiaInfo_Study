const Router = require('koa-router');
const mongoose = require('mongoose')
const router = new Router();
router.get('/getInfo', async (ctx) =>{
        const Province = mongoose.model('Provinces')
        await Province.find().exec().then(res => {
                // console.log(res)
                let list = [];
                for (let i of res) {
                        list.push(i.name)
                }
                ctx.body = {
                        ret_code: 200,
                        message: '查询成功',
                        list:list
                }
        } ).catch(err =>{
                ctx.body = {
                        ret_code: 500,
                        message: '服务器故障'
                }
        })
})

module.exports = router