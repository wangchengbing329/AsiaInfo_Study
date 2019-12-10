const mongoose = require('mongoose');
const db = 'mongodb://127.0.0.1:27017/ManageSystem';
mongoose.Promise = global.Promise;
exports.connect = () =>{
        mongoose.connect(db,{useNewUrlParser:true,useFindAndModify:false,useUnifiedTopology:true})
        let maxConnectCount = 0;
        return new Promise((resolve,reject)=>{
                mongoose.connection.on('disconnected',()=>{
                        // 重新连接
                        if (maxConnectCount<3) {
                                mongoose.connect(db,{useNewUrlParser:true,useFindAndModify:false,useUnifiedTopology:true})
                                maxConnectCount++;                               
                        } else {
                                reject();
                                throw new Error('数据库连接错误，请联系相关人员进行维护！')
                        }
                        
                })

                // 数据库出现问题时
                mongoose.connection.on('error',()=>{
                        if (maxConnectCount<3) {
                                mongoose.connect(db,{useNewUrlParser:true,useFindAndModify:false,useUnifiedTopology:true});
                                maxConnectCount++;
                        } else {
                                reject();
                                throw new Error('数据库出现问题，请联系相关人员进行维护')
                        }
                })

                // 当链接打开时
                mongoose.connection.once('open',()=>{
                        console.log('MongoDB Connected Successfuly!');
                        resolve();
                })
        })
}