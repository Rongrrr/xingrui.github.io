const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')

const goods_handler = require('../router_handler/goods')
const { add_goods_schema } = require('../schema/goods')


//添加商品路由
router.post('/add', expressJoi(add_goods_schema), goods_handler.add_goods_handler)

//获取所有商品信息
router.get('/', goods_handler.getAll_goods_handler)
//获取某条商品信息
router.get('/one/:id', goods_handler.getOne_goods_handler)

router.post('/edit/:id', goods_handler.update_goods_handler)

router.post('/delete/:id',goods_handler.delete_goods_handler)

module.exports = router