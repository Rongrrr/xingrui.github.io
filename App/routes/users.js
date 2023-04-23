const express = require('express')
const router = express.Router()
const user_handler = require('../router_handler/user')
const expressJoi = require('@escook/express-joi')


const { user_reg_schema,user_login_schema } = require('../schema/user')
//$route POST /api/user/register
//desc 返回一个json数据
//access public
router.post('/register',expressJoi(user_reg_schema), user_handler.regUser)

//$route POST /api/user/login
//desc 返回一个token
//access public
router.post('/login', expressJoi(user_login_schema), user_handler.loginUser)



module.exports = router