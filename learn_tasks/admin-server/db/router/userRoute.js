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
                                data:res
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
});

router.get('/userinfo', async ctx => {
        const User = mongoose.model('users');
        await User.find().then(res =>{
                if (res) {
                        ctx.body = {
                                data: res,
                                ret_code: 200,
                                ret_message: '查询成功'
                        }
                } else {
                        ctx.body = {
                                ret_code: 404,
                                ret_message: '你所查询的信息未找到'
                        }
                }
        }).catch(err  => {
                ctx.body = {
                        ret_code: 503,
                        ret_message: '服务器故障'
                }
        })
})
router.post('/userdelete', async ctx => {
        const User = mongoose.model('users') 
        let deleteInfo = ctx.request.body
        await User.deleteOne(deleteInfo).then(res => {
                if (res.deletedCount) {
                        ctx.body = {
                                ret_code: 200,
                                ret_message: '删除成功'
                        }
                } else {
                        ctx.body = {
                                ret_code: 404,
                                ret_message: '删除失败'
                        }
                }
        }).catch(err => {
                ctx.body = {
                        ret_code: 503,
                        ret_message: '服务故障',
                        err
                }
        })
})

router.post('/userSetRole', async ctx => {
        const User = mongoose.model('users')
        let info = ctx.request.body
       
        if (info.role) {
                await User.update({account:info.account},{'$set': {"role": info.role}},{muti: true}).then(res => {
                        // console.log(res) 
                        if (res.nModified) {
                                ctx.body = {
                                        ret_code : 200,
                                        ret_message : "更新成功"
                                }
                        } else {
                                ctx.body = {
                                        ret_code : 400,
                                        ret_message : "更新失败"
                                }
                        }
                })

        }      
        
})

router.post('/userSet', async ctx => {
        const User = mongoose.model('users')
        let info = ctx.request.body
        if (info.role) {
                await User.update(info,{'$set': info},{muti: true}).then(res => {
                        // console.log(res) 
                        if (res.nModified) {
                                ctx.body = {
                                        ret_code : 200,
                                        ret_message : "更新成功"
                                }
                        } else {
                                ctx.body = {
                                        ret_code: 400,
                                        ret_message: "更新失败"
                                }
                        }
                })

        }      
        
})

router.post('/userChange', async ctx => {
        const User = mongoose.model('users')
        let changeInfo = ctx.request.body
        let newInfo,searchInfo;
        console.log (changeInfo)
        if (changeInfo.account) {
                searchInfo = {
                        account:changeInfo.account
                }
                newInfo = {
                        account: changeInfo.newAccount
                }
                
        } else if (changeInfo.newPass) {
                searchInfo = {
                        account: changeInfo.searchAccount
                }
                newInfo = {
                        pass: changeInfo.newPass
                }

        } else if (changeInfo.newAddress) {
                searchInfo = {
                        account: changeInfo.searchAccount
                }
                newInfo = {
                        address: changeInfo.newAddress
                }
        }     
                await User.updateOne(searchInfo,{'$set': newInfo}).then(res => {
                        // console.log(res) 
                        if (res.nModified) {
                                ctx.body = {
                                        ret_code : 200,
                                        ret_message : "更新成功"
                                }
                        } else {
                                ctx.body = {
                                        ret_code: 400,
                                        ret_message: "更新失败"
                                }
                        }
                })    
        
})

router.post('/account', async ctx => {
        const User = mongoose.model('users');
        let adress = ctx.request.body
        await User.find(adress).then(res =>{
                console.log(res)
                if (res) {
                        ctx.body = {
                                data: res,
                                ret_code: 200,
                                ret_message: '查询成功'
                        }
                } else {
                        ctx.body = {
                                ret_code: 404,
                                ret_message: '你所查询的信息未找到'
                        }
                }
        }).catch(err  => {
                ctx.body = {
                        ret_code: 503,
                        ret_message: '服务器故障'
                }
        })
})

router.post('/tabel', async ctx => {
        let search = ctx.request.body
        console.log(search)
        const User = mongoose.model('users')
        let addressSearch;
        let roleSearch;
        switch (search.search) {
                case '管理员' :  roleSearch = { role: 'M'}; break;
                case '用户' :  roleSearch = { role: 'U'}; break;
                default :  addressSearch = { address: search.search}; break;
        } 

        if (roleSearch) {
                await User.find(roleSearch).then(res => {
                        console.log(res)
                        ctx.body = {
                                ret_code:200,
                                list:res
                        }
                }).catch(err => {
                        ctx.body = {
                                ret_code:404,
                                err
                        }
                })
        } else {
                await User.find(addressSearch).then(res =>{
                        console.log(res)
                        ctx.body = {
                                ret_code:200,
                                list:res
                        }
                }).catch(err => {
                        ctx.body = {
                                ret_code:404,
                                err
                        }
                })
        }
        
})
module.exports = router