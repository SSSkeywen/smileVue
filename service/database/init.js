const mongoose = require('mongoose')
const db = "mongodb://localhost/smile-db"
const glob = require('glob')
const {resolve} = require('path')

exports.initSchemas = () => {
    glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}


exports.connect = () => {
    //链接数据库
    mongoose.connect(db)

    let maxConnerctTimes = 0; //连接次数

    //把所有链接放到这里
    return new Promise((resolve, reject) => {

        //增加数据库监听事件
        mongoose.connection.on('disconnected', () => {
            console.log('***********数据库断开************')
            if(maxConnerctTimes <= 3){
                maxConnerctTimes ++
                mongoose.connect(db)
            }else {
                reject()
                throw new Error('数据库出现问题，程序无法搞定，请人为处理......')
            }
            
        })

        mongoose.connection.on('error', (err) => {
            console.log('***********数据库错误')
            if(maxConnerctTimes < 3){
                maxConnerctTimes ++
                mongoose.connect(db)
            }else {
                reject(err)
                throw new Error('数据库出现问题，程序无法搞定，请人为处理......')
            }
            
        })
        //链接打开时
        mongoose.connection.on('open', () => {
            console.log('MongoDB connected successfully')
            resolve()
        })
    })

}