const mongoose = require('mongoose');
const db = "mongodb://127.0.0.1:27017/City"
mongoose.Promise = global.Promise;
exports.connect = () =>{
  // 链接数据库
    mongoose.connect(db,{useNewUrlParser: true})

    let maxConnectCount = 0;
  return new Promise((resolve,reject)=>{
      mongoose.connection.on('disconnected',()=>{
        // 进行重新连接
        console.log('******数据库断开连接********');
        if(maxConnectCount<3){

          mongoose.connect(db,{useNewUrlParser: true})
          maxConnectCount++
        }else{
          reject();
          throw new Error('数据库出现了问题，请联系相关人员进行维护！')
        }
      })
      // 当数据库出现问题得时候
      mongoose.connection.on('error',() =>{
        console.log('数据库出现错误!');
        if(maxConnectCount<3){
          mongoose.connect(db,{useNewUrlParser: true})
          maxConnectCount++
        }else{
          reject();
          console.log('数据库出现错误，请联系相关人员进行维护！')
        }
      })
      // 当链接打开的时候
      mongoose.connection.once('open',()=>{
        console.log('MoogoDB Connected Successfully!');
        resolve()
      })
      })

}
