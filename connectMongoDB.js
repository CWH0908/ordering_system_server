let express = require('express');
let app = new express();
let RouterAPI = express.Router();
let axios = require('axios');

//解决跨域
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

//引入对数据库某个集合的增删查改操作
let home_navs_Schema = require("./home/home_navs_Schema")
let hpme_recommends_Schema =require("./home/home_recommends_Schema")

//前端路由操作
app.get('/home_nav', async function (req, res) {
    let data = await home_navs_Schema.find(function (err, doc) {
        if (err) {
            console.log("访问数据库错误 :" + err);
            return "error"
        } else {
            return doc;
        }
    });
    res.json(data);; //返回数据
})

app.get('/home_recommend', async function (req, res) {
    let data = await hpme_recommends_Schema.find(function (err, doc) {
        if (err) {
            console.log("访问数据库错误 :" + err);
            return "error"
        } else {
            return doc;
        }
    });
    res.json(data);; //返回数据
})

//连接数据库
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/graduationDesignDB');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("连接数据库成功！");
});

app.listen(8081, function () {
    console.log("服务启动：8081")
})