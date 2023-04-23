const joi = require('joi')

const name = joi.string().required()
const goods_num = joi.number().integer().min(0).required()
const goods_price = joi.number().required()
const sale = joi.number().min(0).required()
const type = joi.string().required()
//定义增加商品的规则对象
exports.add_goods_schema = {
    body: {
        name,
        goods_num,
        goods_price,
        type
    }
}