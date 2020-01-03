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
let home_recommends_Schema = require("./home/home_recommends_Schema")
let home_shoplists_Schema = require("./home/home_shoplists_Schema")
let home_foodlists_Schema = require("./home/home_foodlists_Schema")
let login_Schema = require("./userData/login_Schema")

//前端路由操作

//获取home页导航条数据
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

//获取home页所有店铺列表
app.get('/home_recommend', async function (req, res) {
    let data = await home_shoplists_Schema.find(function (err, doc) {
        if (err) {
            console.log("访问数据库错误 :" + err);
            return "error"
        } else {
            return doc;
        }
    });
    res.json(data);; //返回数据
})

//获取home页店铺信息
app.get('/home_shopList', async function (req, res) {
    //店铺ID req.query[0]
    let data = await home_shoplists_Schema.find({
        shopID: req.query[0]
    }, function (err, doc) {
        if (err) {
            console.log("访问数据库错误 :" + err);
            return "error"
        } else {
            return doc;
        }
    });
    res.json(data); //返回数据
})

//获取home页菜品列表
app.get('/home_foodList', async function (req, res) {
    //店铺ID req.query[0]
    let data = await home_foodlists_Schema.find({
        shopID: req.query[0]
    }, function (err, doc) {
        if (err) {
            console.log("访问数据库错误 :" + err);
            return "error"
        } else {
            return doc;
        }
    });
    res.json(data); //返回数据
})

//用户登录
app.get('/login', async function (req, res) {
    // console.log("参数信息",req.query.account,req.query.psw);
    let data = await login_Schema.find({
        userAccount: req.query.account,
        password: req.query.psw
    }, function (err, doc) {
        if (err) {
            console.log("访问数据库错误 :" + err);
            return "error"
        } else {
            return doc;
        }
    });
    res.json(data); //返回数据
})

//用户注册搜索账号
app.get('/register', async function (req, res) {
    let data = await login_Schema.find({
        userAccount: req.query.account
    }, function (err, doc) {
        if (err) {
            console.log("访问数据库错误 :" + err);
            return "error"
        } else {
            return doc;
        }
    });
    res.json(data); //返回数据
})

//用户注册数据写入数据库
app.get('/inputRegister', async function (req, res) {
    // let data = await login_Schema.save({
    //     userAccount: req.query.account,
    //     password: req.query.psw,
    //     orderData: [],
    //     addressData: []
    // }, function (err, doc) {
    //     if (err) {
    //         console.log("访问数据库错误 :" + err);
    //         return "error"
    //     } else {
    //         return doc;
    //     }
    // });
    // res.json(data); //返回数据
    login_Schema.create({
        userAccount: req.query.account,
        password: req.query.psw,
        orderData: [],
        addressData: []
    }, function (err, doc) {
        if (err) {
            console.log("访问数据库错误 :" + err);
            return "error"
        } else {
            return doc;
        }
    });
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