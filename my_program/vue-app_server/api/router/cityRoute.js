// const Koa = require('koa')
const KoaRouter = require('koa-router')
const mongoose = require('mongoose');
let router = new KoaRouter();
router.post('/',async(ctx)=>{
        // console.log('!!!!')
        // console.log(ctx.request.body)
        // ctx.body = ctx.request.body
        const City = mongoose.model('City')
        // console.log(ctx.response)
        // let newCity = new City(ctx.request.body)
        let city = ctx.request.body.cityId
        await City.updateOne({city:'南京'},{'$addToSet':{'CityName':city}}).then(async()=>{
           
                        let citydata = ''
               await City.findOne({city:'南京'},(err,doc)=>{
                        // console.log('---',doc)
                        citydata =doc.CityName
                }).exec();
              
                         ctx.body ={
                                code:200,
                                meaasge:'选择城市成功',
                                cities:citydata
                         }
        }).catch(err =>{
                ctx.body={
                        code:500,
                        mseeage:err
                }
        })
})
module.exports = router;