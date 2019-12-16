let mongoose = require('mongoose')

var TestSchema = new mongoose.Schema({
    pic_url: {
        type: String
    },
    shopName: {
        type: String
    },
    rateValue:{
        type:Number
    },
    saleTimes:{
        type:Number
    },
    startFee:{
        type:Number
    },
    sendFee:{
        type:Number
    }
});
var TestModel = mongoose.connection.model("home_recommends", TestSchema); //填写你的数据库 集合（复数形式）

module.exports = TestModel;