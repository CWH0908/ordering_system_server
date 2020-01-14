let mongoose = require('mongoose')

var TestSchema = new mongoose.Schema({
    shopID: {
        type: String
    },
    userAccount: {
        type: String
    },
    shopInfo: {
        type: Object
    },
    foodList: {
        type: Array
    },
    addressData: {
        type: Object
    },
    payType: {
        type: String
    },
    buyTime: {
        type: String
    },
});
var TestModel = mongoose.connection.model("order_datas", TestSchema); //填写你的数据库 集合（复数形式）

module.exports = TestModel;