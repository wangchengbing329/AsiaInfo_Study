const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const Router = require('koa-router');
   
const {connect} = require('../db/db.init');
const {initSchema} = require('./schemaRequire');
const userRoute = require('../db/router/userRoute');
const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(cors());
   
router.use('/user',userRoute.routes())

app.use(router.routes());
app.use(router.allowedMethods());

;(async ()=>{
      await connect();
        initSchema();
})();


 

app.listen(3000,()=>{
        console.log('Server is running on port 3000')
})
