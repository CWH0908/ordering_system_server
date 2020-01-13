const express = require("express");
const expressWs = require("express-ws")
const router = express.Router()
expressWs(router);

router.ws("/test", (ws, req) => {
    ws.send("连接成功")
    let interval
    // 连接成功后使用定时器定时向客户端发送数据，同时要注意定时器执行的时机，要在连接开启状态下才可以发送数据
    interval = setInterval(() => {
        if (ws.readyState === ws.OPEN) {
            ws.send(Math.random().toFixed(2))
        } else {
            clearInterval(interval)
        }
    }, 1000)
    // 监听客户端发来的数据，直接将信息原封不动返回回去
    ws.on("message", msg => {
        ws.send(msg)
    })
})


module.exports = router