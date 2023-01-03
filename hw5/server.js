const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors())

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: '121.41.93.125',
    user: 'root',
    password: '20020323wang.',
    database: 'web'
});

connection.connect();

app.use(express.json())

app.get('/login',function (req, res) {
    const params = req.query;
    console.log(params)
    const q1 = "SELECT * from userinfo where email=" + "\"" + params.email + "\"";
    console.log(q1)
    connection.query(q1, function (error, result) {
        if (error) throw error;
        if (result.length === 0) {
            console.log("账号不存在")
            res.send(1)
        } else {
            if (result[0].password === params.password) {
                console.log("登录成功")
                res.send(0)
            } else {
                res.send(2)
            }
        }
    })
})

app.get('/register',function (req, res) {
    const params = req.query;
    console.log(params)
    const q1 = "select * from userinfo where email=" + "\"" + params.email + "\"";
    connection.query(q1, function (error, result) {
        if (error) throw error;
        if (result.length > 0) {
            console.log("邮箱已存在")
            res.send(1)
        } else {
            const q2 = "insert into userinfo(email, phoneNumber, password) values(" + "\"" + params.email + "\",\"" + params.phoneNumber + "\",\"" + params.password + "\")";
            console.log(q2)
            connection.query(q2, function (error, result) {
                if (error) throw error;
                console.log("注册成功")
                res.send(0)
            })
        }
    })
})

app.listen(3001, () => {
    console.log('http://localhost:3001')
});