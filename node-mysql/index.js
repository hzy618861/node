const db = require('./sql');
const express = require('express');
const app = express();
const port = 3000;

// 查询商品信息
app.get('/getGoods', (req, res) => {
    let result = {};
    db.query('SELECT * FROM `users`', function (error, results, fields) {
        if (error) {
            result = {
                code: 101,
                msg: 'get_fail',
                data: {
                    info: "查询失败！"
                }
            }
        };
        if(!results) results = []
        result = {
            code: 200,
            msg: 'get_suc',
            data: {
                info: "查询成功！",
                list: results
            }
        }
        res.json(result);
    });
})
app.get('/addGoods',(req,res)=>{
    const sql = `CREATE TABLE IF NOT EXISTS users(name varchar(20), age int)`
    db.query(sql,(err,result)=>{
        if(err) throw err;
        const sql ='insert into users (name,age) values ("安卓系列",21)';
        db.query(sql,(err,result)=>{
            if(err) throw err;
            res.json(result)
        })
    })

})




app.listen(port, () => {
    console.log('Server is running on port ', port + '!');
})