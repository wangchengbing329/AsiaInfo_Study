module.exports = function (config) {
        /**
         * @params {object} dll 开启包分析
         * @params {object} pages 多页面配置 通过 box run/build index来使用
         * @params {function} chainWebpack
         * @params {string} entry 入口
         * @params {string} output 出口
         * @params {string} publicPath
         * @params {string} port
         */
        return {
                entry: 'src/main.js',
                output: 'dist',
                publicPath: '/common/',
                port: '8080',
                dll: {
                        venders: ['vue','react']
                },
                pages: {
                        index:{
                                entry: 'src/main.js',
                                template: 'public/index.html',
                                filename: 'index.html'
                        },
                        index2: {
                                entry: 'src/main.js',
                                template: 'public/index.html',
                                filename: 'index2.html'
                        }
                },
                chainWebpack (config) {
                        
                }
        }
}