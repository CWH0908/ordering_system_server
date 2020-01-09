/*七牛云配置*/
const qiniu = require('qiniu')

// 创建上传凭证
const accessKey = 'LcRmxb1R4C2V4e-WfhY6SEYVIvsc1GAg5x3jku20'
const secretKey = 'Fzu7CjuXzv6Qu4s8rnw17qYPsNjTx9UUURSMkgTX'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const options = {
    scope: 'cwh-imglist',
    expires: 7200
    //自定义凭证有效期,单位为秒，为上传凭证的有效时间）
}
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)

module.exports = {
    uploadToken
}