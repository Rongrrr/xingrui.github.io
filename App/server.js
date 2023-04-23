const express = require('express')
const joi = require('joi')
const app = express()
const bodyParser = require('body-parser')

const cors = require('cors')
app.use(cors())

//配置解析表单数据的中间件，注意：这个中间件只能解析application/x-www-form-unencoded格式的表单数据
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.use(express.urlencoded({ extends: false }))


//路由之前封装res.cc函数,优化res.send()语句
app.use((req, res, next) => {
    res.msg = function (err, status = 400) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

//配置解析token的中间件
const expressJwt = require('express-jwt')
const config = require('./config')

app.use(expressJwt({ secret: config.JwtSecretKey }).unless({ path: [/^\/api\//] }))

//导入并使用user中间件
const users = require('./routes/users')
app.use('/api/user', users)

//导入并使用goods中间件
const goods = require('./routes/goods')
app.use('/api/goods', goods)

//导入并使用userinfo中间件
const userinfo = require('./routes/userinfo')
app.use('/api/userinfo', userinfo)


app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) return res.msg(err)
    if (err.name === 'UnauthorizedError') return res.msg('身份认证失败')
    res.msg(err)
})

const port = process.env.port || 5000

app.listen(port, () => {
    console.log(`Server running at this port:${port}`);
})