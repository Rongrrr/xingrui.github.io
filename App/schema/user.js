const joi = require('joi')
//定义验证规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
const id = joi.number().integer().min(1).required()
const email = joi.string().email().required()
const avatar = joi.string().dataUri().default('')
const identity = joi.string().required()

//定义验证注册,登录表单数据的规则对象
exports.user_reg_schema = {
    body: {
        username,
        email,
        password,
        identity
    }
}
exports.user_login_schema = {
    body: {
        
        email,
        password,
        
    }
}
exports.userinfo_schema = {
    body: {
        id,
        username,
        email,
        identity
    }
}

