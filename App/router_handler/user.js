const db = require('../db/database')
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const config = require('../config')
//注册
exports.regUser = (req, res) => {
    //获取客户端提交到服务器的用户信息
    const userinfo = req.body
    
    //查询是否重复添加
    const sql = 'select * from user_db where email=?'
    db.query(sql, userinfo.email, (err, result) => {
        if (err) return res.msg(err)
        if(result.length > 0) return res.msg('邮箱已被注册')
    })

    // 调用bcrypt.hashSync()对密码进行加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)

    //插入新用户
    const sqlStr = 'insert into user_db set ?'
    //获取现在时间
    const dt = require('moment')().format('YYYY-MM-DD HH:mm:ss');
    //获取头像地址
    const avatar = gravatar.url(userinfo.email, { s: '200', r: 'pg', d: 'cc' });
    db.query(sqlStr,
        {
            username: userinfo.username,
            password: userinfo.password,
            email: userinfo.email,
            avatar,
            identity:userinfo.identity,
            date:dt
        }, (err, result) => {
            if (err) return res.msg(err)
            if (result.affectedRows != 1) return res.msg('注册用户失败，请重新输入')
            res.msg('注册用户成功！')
        })
}

// 登录
exports.loginUser = (req, res) => {
    const userinfo = req.body

    const sql = 'select * from user_db where email=?'
    db.query(sql, userinfo.email , (err, result) => {
        if (err) return res.msg(err)
        
        if (result.length != 1) return res.status(404).json({ message: '用户不存在，请重新输入！' })
        
        const compareRes = bcrypt.compareSync(userinfo.password, result[0].password)
        if (!compareRes) return res.msg('密码错误，请重试！')
        
        //在服务器生成token字符
        const rule = { ...result[0], password: '', email: '' }
        const tokenStr = jwt.sign(rule, config.JwtSecretKey, { expiresIn: '24h' })
        res.send({
            status: 200,
            message:'登录成功！',
            token: 'Bearer ' + tokenStr,
            
        })
    })
}