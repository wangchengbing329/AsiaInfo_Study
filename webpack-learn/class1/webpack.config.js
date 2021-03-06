const path = require('path');
const rimraf = require('rimraf');
const Config = require('webpack-chain');
const config = new Config();
const resolve = src => {
        return path.join(process.cwd(),src);
}

// 删除dist 目录
rimraf.sync('dist');

//webpack 配置
config
.entry('src/index')
.add(resolve('src/index.js'))
.end()
// 模式
// .mode(process.env.NODE_ENV)
.set('mode', process.env.NODE_ENV)
// 出口
.output.path(resolve('dist'))
.filename('[name].bundle.js')

config.module
.rule('css')
.test(/\.css$/)
.use('css')
.loader('css-loader')

module.exports = config.toConfig();
// module.exports = {
//         entry: './src/index',
//         mode: process.env.NODE_ENV,
//         output: {
//                 filename: 'bundle.js',
//                 path: path.resolve(__dirname, 'dist')
//         }
// };