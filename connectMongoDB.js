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
let shopLogin_Schema = require("./adminSchema/shopLogin_Schema")

//客户端请求*********************************************************************************************************

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

//用户注册数据新增入数据库
app.get('/inputRegister', async function (req, res) {
    login_Schema.create({
        userAccount: req.query.account,
        password: req.query.psw,
        pic_url: "'http://49.235.92.173:70/graduationDesign_images/defaultHeadImg.jpg'", //默认头像地址
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

//用户地址更新入数据库
app.get('/updateAddress', async function (req, res) {

    //找到账号为*** 修改地址数组为新的
    // db.user_datas.updateOne({userAccount:'15815817682'},{$push:{"addressData":{name:'cwh'}}})
    login_Schema.updateOne({
        "userAccount": req.query.account
    }, {
        "$set": {
            "addressData": JSON.parse(req.query.addressData)
        }
    }, function (err, doc) {
        if (err) {
            console.log("地址更新失败");
        } else {
            console.log("地址更新成功");
        }
    })
})

//用户订单更新入数据库
app.get('/updateOrder', async function (req, res) {
    //找到账号为*** 修改订单数组为新的
    login_Schema.updateOne({
        "userAccount": req.query.account
    }, {
        "$set": {
            "orderData": JSON.parse(req.query.orderData)
        }
    }, function (err, doc) {
        if (err) {
            console.log("订单更新失败");
        } else {
            console.log("订单更新成功");
        }
    })
})

// ********************************************************************************************************

// 管理端请求*********************************************************************

//商家登录
app.get('/shopLogin', async function (req, res) {
    // console.log("参数信息",req.query.account,req.query.psw);
    let data = await shopLogin_Schema.find({
        shopAccount: req.query.account,
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

//商家注册预留

//修改商家菜品列表
app.get('/updateFoodList', async function (req, res) {
    // console.log("参数信息", req.query.foodID, req.query.foodItem);
    //找到菜品ID 进行数据更新
    home_foodlists_Schema.updateOne({
        "foodID": req.query.foodID
    }, {
        "$set": {
            "pic_url": JSON.parse(req.query.foodItem).pic_url,
            "foodName": JSON.parse(req.query.foodItem).foodName,
            "foodInfo": JSON.parse(req.query.foodItem).foodInfo,
            "newMoney": JSON.parse(req.query.foodItem).newMoney,
            "foodType": JSON.parse(req.query.foodItem).foodType,
            "isRecommend": JSON.parse(req.query.foodItem).isRecommend,
        }
    }, function (err, doc) {
        if (err) {
            console.log("菜品更新失败");
        } else {
            console.log("菜品更新成功");
        }
    })
})

//删除菜品
app.get('/deleteFoodItem', async function (req, res) {
    console.log("删除菜品ID：", req.query.foodID);
    //找到菜品ID 进行删除
    home_foodlists_Schema.remove({
        "foodID": req.query.foodID
    }, function (err, doc) {
        if (err) {
            console.log("菜品删除失败");
        } else {
            console.log("菜品删除成功");
        }
    })
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