const app = require('./app')
const configApp = require('./config/app')

// 启动项目
const server = app.listen(configApp.port, () => {
    console.log('http://localhost:' + configApp.port)
})