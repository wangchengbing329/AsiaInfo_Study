const Koarouter = require('koa-router');
const mongoose = require('mongoose');
let router = new Koarouter();
router.post('/register',async(ctx)=>{
        const Register = mongoose.model('registers')
        // console.log(ctx.request.body)
        let nickname = ctx.request.body.nickname 
        let newUserInfo = ctx.request.body;
        
        function search (){
               return Register.find({'nickname':nickname}).exec()
        }


     await search().then(res=>{
        console.log(res)
        if(res.length ===0){
                Register.create(newUserInfo)
                ctx.body ={
                        code:200,
                        message:'注册成功'
                }
        }else {
                ctx.body ={
                        code:403,
                        message:'账号已经存在'
                }
        }
     }).catch(rej=>{
        ctx.body ={
                code:500,
                message:'服务器故障'
        }
     })
       
})
router.post('/login',async(ctx)=>{
        const Register = mongoose.model('registers')
        const login = ctx.request.body
        
        await Register.findOneAndUpdate(login,{'$set':{'isLogin':1}},{'new':true}).then(res=>{
                console.log('----',res)
                if(Object.prototype.toString.call(res)  === '[object Null]'){
                        ctx.body ={
                                code:404,
                                message:'未找到'
                        }
                        
                }
               else{
                        ctx.body = {
                                 code:200,
                                 message:'登陆成功',
                                isLogin:res.isLogin,
                                nickname:res.nickname
                        }
                }

                
                // if(res.length !==0){
                //         Register.updateOne(login,{'$set':{'isLogin':1}}).then(res=>{
                //                 console.log(res)
                //                 console.log(doc)
                //         }).catch(err =>{
                //                 console.log(err)
                //         })
                //         Register.find
                //         ctx.body = {
                //                 code:200,
                //                 message:'登陆成功',
                //         }
                // }else {
                //         ctx.body = {

                //                 code:404,
                //                 message:'没找到'
                //         }   
                // }
        }).catch(err=>{
                console.log(err)
                
        })
})
module.exports = router