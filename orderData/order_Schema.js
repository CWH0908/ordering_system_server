let mongoose = require('mongoose')

var TestSchema = new mongoose.Schema({
    orderID: {
        type: String
    },
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
    state: {
        //订单的状态，waiting：等待中 ， askCancel：请求取消 , cancelSuccess：取消成功  , cancelFail : 取消失败  ， arrive：已送达
        type: String
    },
    rateValue: {
        type: Number
    },
    comment: {
        type: String
    }
});
var TestModel = mongoose.connection.model("order_datas", TestSchema); //填写你的数据库 集合（复数形式）

module.exports = TestModel;