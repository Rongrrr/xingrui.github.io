const db = require('../db/database')

//添加商品路由函数
exports.add_goods_handler = (req, res) => {
    //获取用户传给服务器的数据
    const goods = req.body

    const sql = 'insert into goods_db set ?'
    db.query(sql, { name: goods.name, goods_num: goods.goods_num, goods_price: goods.goods_price,type:goods.type,remark:goods.remark }, (err, result) => {
        if (err) return res.msg(err)
        if (result.affectedRows != 1) return res.msg('商品添加失败！')
        res.msg('商品添加成功！')
    })
}
//查询所有商品信息
exports.getAll_goods_handler = (req, res) => {
    const sql = 'select * from goods_db'
    db.query(sql, (err, result) => {
        if (err) return res.msg(err)
        
        if (!result.length) return res.status(404).json({ msg: '没有查询到商品信息' })
        
        res.json({
            status: 200,
            msg:'查询成功',
            data:result
        }
        )
    })
}
// 查询一条商品信息
exports.getOne_goods_handler = (req, res) => {
    const goods = req.body
    
    const sql = 'select * from goods_db where id=?'
    db.query(sql,goods.id, (err, result) => {
        if (err) return res.msg(err)

        if (result.length != 1) return res.status(404).json({ msg: '没有查询到商品信息' })

        res.json({
            status: 200,
            msg: '查询成功',
            data: result[0]
        }
        )
    })
}

//编辑商品信息
exports.update_goods_handler = (req, res) => {
    const goodsInfo =req.body
    const sql = 'update goods_db set ? where id=?'
    db.query(sql, [goodsInfo, goodsInfo.id], (err, result) => {
        if (err) return res.msg(err)
        
        if (result.affectedRows !== 1) return res.msg('修改失败')
        res.msg('修改成功',200)
    })
}

exports.delete_goods_handler = (req, res) => {
    
    // const sql = 'update goods_db set status=1 where id=?'
    const sql = 'delete from goods_db where id=?'
    db.query(sql, req.params.id, (err, result) => {
        if (err) return res.msg(err)
        if (result.affectedRows !== 1) return res.msg('删除失败')
        res.msg('删除成功', 200)
    })
}