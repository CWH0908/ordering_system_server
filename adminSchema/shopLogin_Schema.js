let mongoose = require('mongoose')

var TestSchema = new mongoose.Schema({
    shopAccount: {
        type: String
    },
    password: {
        type: String
    },
    orderData: {
        type: Array
    },
    shopID: {
        type: String
    }
});
var TestModel = mongoose.connection.model("shop_datas", TestSchema); //填写你的数据库 集合（复数形式）

module.exports = TestModel;