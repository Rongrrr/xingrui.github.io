const db = require('../db/database')
const bcrypt = require('bcrypt')

exports.userInfo = (req, res) => {
    const sql = 'select id,username,email,avatar,date,identity from user_db where status=0'
    db.query(sql, (err, results) => {
        if (err) return res.msg(err)
        if (!results.length) return res.msg('获取用户信息失败')
        res.send({
            status: 200,
            message: '获取用户基本信息成功!',
            data: results,
        })
    })
}

exports.updateUserInfo = (req, res) => {
    const sql = 'update user_db set ? where id=?'
    db.query(sql, [req.body,req.body.id], (err, results) => {
        if (err) return res.msg(err)
        if (results.affectedRows !== 1) return res.msg('更新用户信息失败')
        res.msg('更新用户信息成功')
    })
}

exports.updatePassword = (req, res) => {
    const sql = `select * from user_db where id=?`
    db.query(sql, req.body.id, (err, results) => {
        if (err) return res.msg(err)
        //检查指定id的用户是否存在
        if (results.length !== 1) return res.msg('用户不存在！')
        //判断密码是否正确
        const comparePwd = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!comparePwd) return res.msg('旧密码错误')
    })

    //定义更新密码
    const updateSql = `update user_db set password=? where id=?`
    // 对新密码进行加密处理
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
    db.query(updateSql, [newPwd, req.body.id], (err, results) => {
        if (err) return res.msg(err)
        if (results.affectedRows !== 1) return res.msg('更新密码失败！')
        res.msg('更新密码成功！')
    })
}

// 忘记密码
exports.forgetPassword = (req, res) => {
    const sql = 'update user_db set password=? where id=?'
    const newPwd = bcrypt.hashSync(req.body.password, 10)
    db.query(sql, [newPwd, req.body.id], (err, results) => {
        if (err) return res.msg(err)
        if (results.affectedRows != 1) return res.msg('修改密码失败')
        res.msg('修改密码成功！')
    })
}

//标记删除用户信息
exports.deleteUserInfo = (req, res) => {
    const sql = 'update user_db set status=1 where id=?'
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.msg(err)
        if (results.affectedRows != 1) return res.send('用户信息删除失败')
        res.send('用户信息删除成功！')
    })
}