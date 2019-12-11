const Router = require('koa-router');
const mongoose = require('mongoose');
let router = new Router();
router.post('/register',async (ctx)=>{
        const User = mongoose.model('users');
        let userInfo = ctx.request.body
        // console.log(userInfo)
        await User.findOne(userInfo).exec().then((res)=>{
                console.log(res)
                if (res) {
                        ctx.body = {
                                ret_code:403,
                                message:'该账号已经存在'
                        }
                } else {
                        User.create(userInfo)
                        ctx.body = {
                                ret_code:200,
                                message:'注册成功'
                        }
                }
        }).catch(err =>{
                ctx.body ={
                        ret_code:500,
                        message:'服务器故障'
                }
        })
        // await User.create(userInfo).then(res=>{
        //         console.log(res)
        // })
})
router.post('/login', async (ctx) => {
        let loginInfo = ctx.request.body;
        const User = mongoose.model('users');

        await User.findOne(loginInfo).then(res => {
                if (res) {
                        ctx.body = {
                                ret_code: 200,
                                message: '登陆成功',
                                role:res.role
                        }
                } else {
                        ctx.body = {
                                ret_code: 404,
                                message: '该用户未找到'
                        }
                }
        }).catch(err => {
                ctx.body = {
                        ret_code: 500,
                        message: '服务器故障'
                }
        })
})
module.exports = router