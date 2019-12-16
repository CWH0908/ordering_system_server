let TestModel = require('./mySchema');

let handleObj = {
  selectData: selectData, //查询数据
}

//查找数据
function selectData() {
  return new Promise((resolve, reject) => {
    TestModel.find(function (err, doc) {
      if (err) {
        console.log("error :" + err);
      } else {
        console.log("查询数据成功");
        resolve(); //返回查询的数据
        return doc;
      }
    });
  })
}


//插入数据
function insertData() {
  var TestEntity = new TestModel({
    pic_url: '测试图片地址',
    item_type: '测试类型'
  });
  TestEntity.save(function (err, doc) {
    if (err) {
      console.log("error :" + err);
    } else {
      console.log("插入数据成功");
    }
  });
}

// 删除数据

//修改数据


module.exports = handleObj;