const Koa = require('koa');
const  mongoose = require('mongoose')
const KoaRouter = require('koa-router');
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
let cityRoute =require('../router/cityRoute.js') 
const {connect} = require('../db/db.init.js')
const {initSchema} = require('./server.init.js')
const app =new Koa();
let router = new KoaRouter();

app.use(bodyParser())
app.use(cors())

router.use('/addCity',cityRoute.routes());

app.use(router.routes())
app.use(router.allowedMethods())
;(async()=>{
  await connect();
  initSchema();
  // const City = mongoose.model('City')
  // let oneCity = new City({CityId:'南京'})
  // oneCity.save().then(()=>{
  //   console.log('插入成功')
  // })
  // let users = await City.find().exec();
  // console.log('------')
  // console.log(users)
})()



app.use(async (ctx)=>{
  ctx.body = 'hello'
})
app.listen(3000,()=>{
  console.log('A server is running on port 3000')
})
