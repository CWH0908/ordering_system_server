let mongoose = require('mongoose')

var TestSchema = new mongoose.Schema({
    pic_url: {
        type: String
    },
    item_type: {
        type: String
    }
});
var TestModel = mongoose.connection.model("home_navs", TestSchema); //填写你的数据库 集合（复数形式）

module.exports = TestModel;