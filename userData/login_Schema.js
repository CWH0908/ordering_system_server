let mongoose = require('mongoose')

var TestSchema = new mongoose.Schema({
    userAccount: {
        type: String
    },
    password: {
        type: String
    },
    orderData: {
        type: Array
    },
    addressData: {
        type: Array
    }
});
var TestModel = mongoose.connection.model("user_datas", TestSchema); //填写你的数据库 集合（复数形式）

module.exports = TestModel;