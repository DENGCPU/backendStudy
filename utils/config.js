//对环境变量进行配置
require('dotenv').config()

const PORT = process.env.PORT || 3001


if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}
// 在npm run dev后输入链接数据库的密码
const password = process.argv[2]

const MONGODB_URI = process.env.MONGODB_URI ||`mongodb+srv://imdj1996:${password}@cluster0.7qq6f.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

module.exports = {
    PORT,
    MONGODB_URI
}
