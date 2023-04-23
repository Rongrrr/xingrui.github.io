const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const userinfo_handler = require('../router_handler/userinfo')

//获取用户基本信息的路由
router.get('/', userinfo_handler.userInfo)

//更新用户信息路由
router.post('/updateinfo', userinfo_handler.updateUserInfo)
// 修改密码路由
router.post('/updatepwd', userinfo_handler.updatePassword)
// 忘记密码
router.post('/forgetpwd', userinfo_handler.forgetPassword)
//删除用户信息
router.post('/deleteuser/:id',userinfo_handler.deleteUserInfo)

module.exports = router