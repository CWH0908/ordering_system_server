let mongoose = require('mongoose')

var TestSchema = new mongoose.Schema({
    shopID: {
        type: String
    },
    foodID: {
        type: String
    },
    foodName:{
        type:String
    },
    foodSaleTimes:{
        type:Number
    },
    foodInfo:{
        type: String
    },
    oldMoney:{
        type:Number
    },
    newMoney:{
        type:Number
    }
});
var TestModel = mongoose.connection.model("home_foodlists", TestSchema); //填写你的数据库 集合（复数形式）

module.exports = TestModel;