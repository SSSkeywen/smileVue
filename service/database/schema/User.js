const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10   //加密强度

//创建UserSchema
const userSchema = new Schema({
    UserId : {type: ObjectId},
    userName: {unique:true, type: String},  //不重复
    password: String,
    createAt: {type: Date, default: Date.now()},
    lastLoginAt: { type: Date, default: Date.now() },  //最后登录时间
},{
    collection: 'user',   // 更改数据库名称
})  //加盐 加密
//pre每次调用都执行加密加盐
userSchema.pre('save', function(next){
    bcrypt.genSalt(SALT_WORK_FACTOR, (err,salt) => {
        if(err) return next(err)
        bcrypt.hash(this.password, salt, (err, hash) => {
            if(err) return next(err)
            this.password = hash
            next()
        })
    })

})
//密码对比方法
userSchema.methods = {
    comparePassword: (_password, password) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(_password, password, (err, isMatch) => {
                if(!err) resolve(isMatch)
                else reject(err)
            })
        })
    }
}

//发布模型
mongoose.model('User', userSchema)