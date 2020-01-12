let express = require('express');
let app = new express();
let RouterAPI = express.Router();
let axios = require('axios');

//引入七牛云请求配置
const bodyparse = require('body-parser')
// 解析数据
app.use(bodyparse.json())
// 引入七牛云配置
const qnconfig = require('./config.js')
// 处理请求
app.get('/token', (req, res, next) => {
    console.log("接收到上传图片请求");
    res.status(200).send(qnconfig.uploadToken)
})


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

//新增菜品
app.get('/insertFoodItem', async function (req, res) {
    //将传入的foodItem插入到数据库文档集合中
    let foodItem = JSON.parse(req.query.foodItem);
    // console.log("转换后的新增foodItem", foodItem);
    home_foodlists_Schema.create({
        foodID: foodItem.foodID,
        foodInfo: foodItem.foodInfo,
        foodName: foodItem.foodName,
        foodSaleTimes: foodItem.foodSaleTimes,
        foodType: foodItem.foodType,
        isRecommend: foodItem.isRecommend,
        newMoney: foodItem.newMoney,
        oldMoney: foodItem.oldMoney,
        pic_url: foodItem.pic_url,
        saleTimes: foodItem.saleTimes,
        shopID: foodItem.shopID,
    }, function (err, doc) {
        if (err) {
            console.log("访问数据库错误 :" + err);
            return "error"
        } else {
            console.log("添加菜品成功");
            return doc;
        }
    });
})

//修改分类
app.get('/modifyFoodType', async function (req, res) {
    console.log("要修改的类型", JSON.parse(req.query.newTypeArr));
    let newTypeArr = JSON.parse(req.query.newTypeArr);
    //找到要修改的菜品 进行数据更新
    for (let i in newTypeArr) {
        console.log("修改：", i, newTypeArr[i].oldType);
        home_foodlists_Schema.updateMany({
            "foodType": newTypeArr[i].oldType
        }, {
            "$set": {
                "foodType": newTypeArr[i].newType,
            }
        }, function (err, doc) {
            if (err) {
                console.log("类型更新失败");
            } else {
                console.log("类型更新成功");
            }
        })
    }

})

//删除分类
app.get('/removeFoodType', async function (req, res) {
    console.log("删除分类：", req.query.foodType);
    //找到菜品类型 进行删除
    home_foodlists_Schema.remove({
        "foodType": req.query.foodType
    }, function (err, doc) {
        if (err) {
            console.log("类型删除失败");
        } else {
            console.log("类型删除成功");
        }
    })
})

//店铺管理板块更新店铺信息
app.get('/updateShopData', async function (req, res) {
    console.log("更新店铺信息：", req.query.shopData);
    //找到店铺ID 进行数据更新
    home_shoplists_Schema.updateOne({
        "shopID": req.query.shopID
    }, {
        "$set": {
            "pic_url": JSON.parse(req.query.shopData).pic_url,
            "shopName": JSON.parse(req.query.shopData).shopName,
            "startFee": JSON.parse(req.query.shopData).startFee,
            "sendFee": JSON.parse(req.query.shopData).sendFee,
            "phone": JSON.parse(req.query.shopData).phone,
            "isClose": JSON.parse(req.query.shopData).isClose,
            "openTime": JSON.parse(req.query.shopData).openTime,
            "closeTime": JSON.parse(req.query.shopData).closeTime,
            "mallType": JSON.parse(req.query.shopData).mallType,
        }
    }, function (err, doc) {
        if (err) {
            console.log("店铺信息更新失败");
        } else {
            console.log("店铺信息更新成功");
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