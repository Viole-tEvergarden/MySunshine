
//index.js文件
let express = require('express') // 引入express
let app = express() // 相当于 http.createServer(app)

const { server } = require('./router/user')
// 访问根路由
app.get('/',(request,response) => {
	response.send('Hello World')
})
 




// 监听3000端口
server.listen(3000, '127.0.0.1', () => {
	let host = server.address().address // host域
	let port = server.address().port // 端口号
	
	console.log(`Server running at http://${host}:${port}`)
})