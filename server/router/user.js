
const http = require('http')
const url = require('url')
const fs = require('fs')
const querystring = require('querystring')

const server = http.createServer((req,res) => {
  //定义公共变量, 存储请求方法,路径,数据
  const method = req.method;
  let path = '';
  let get = {};
  let post = {};

  // 判断请求方法类型, 区分处理数据
  if (method === 'GET') {
    //使用 url.parse 解析get数据
    const { pathName, qurey } = url.parse(req.url, true);

    path = pathName;
    get = qurey;

    complete();
  } else if (method === 'POST'){
    path = req.url;
    let arr = [];

    req.on('data',(buffer)=>{
      //获取POST请求的 Buffer 数据
      arr.push(buffer)
    })

    req.on('end',()=>{
      //将buffer数据合并
      let buffer = Buffer.concat(arr);

      // 处理接收到的 POST 数据
      post = JSON.parse(buffer.toString());

      complete();
    })
  }
  // 在回调函数中统一处理解析后的数据
  function complete() {
    try{
      if (path === '/reg') {
        // 获取 get 数据
        const { userName, password } = get;

        // 读取 user.json 文件
        fs.readFile('./user.json', (error,data) => {
          if (error) {
            res.writeHead(404)
          } else {
            // 读取用户数据
            const users = JSON.parse(data.toString());
            const userNameIndex = users.findIndex(item => userName === item.userName);

            //判断用户名是否存在
            if (userNameIndex >= 0) {
              res.write(JSON.stringify({ error: 1, msg: '此用户不存在'}));
              res.end();
            } else {
              // 用户名不存在则在用户列表中增加一个用户
              users.push({  userName, password});

              // 将新的用户列表保存到 user.json 文件中
              fs.writeFile('./user.json',JSON.stringify(users), error => {
                if (error) {
                  res.writeHead(404)
                } else {
                  res.write( JSON.stringify({ error: 0, msg: '注册成功'}));
                  res.end()
                }
              })
            }
          }
        })
      } else if (path === '/login') {
        const { userName, password } = post;
        // 读取 user.json
        fs.readFile('./user.json', (error,data) => {
          if(error){
            res.writeHead(404);
          } else {
            // 获取user列表数据
            const users = JSON.parse(data.toString());
            const userNameIndex = users.findIndex(item => userName === item.userName);

            if (userNameIndex>=0) {
              // 用户名存在, 校验密码
              if (users[userNameIndex].password === password) {
                res.write( JSON.stringify({ error: 0, msg: '登录成功'}));
              } else {
                res.write( JSON.stringify({ error: 1, msg: '密码错误'}));
              }
            } else {
              res.write( JSON.stringify({ error: 1, msg: '用户不存在'}));
            }
          }
          res.end()
        })
      } else {
        // 若不是登录或者注册接口,则直接返回相应文件
        fs.readFile('../view/index.html','utf-8',(error,data)=>{
          console.log(error,data);
          if (error) {
            res.writeHead(404)
          } else {
            res.end(data)
          }
          
        })
      }
    } catch (err) {
      console.error(err);
    }
  }
})

exports.server = server