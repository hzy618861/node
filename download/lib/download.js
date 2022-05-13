var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");
const OSS = require('ali-oss')
const client = new OSS({});
module.exports = function downLoad(){
    //解析指定url数据，上传阿里云oss
    function parseData(targetUrl,response){
        if(!targetUrl) return
        if(/http|https/g.test(targetUrl)){
            targetUrl = targetUrl.replace(/http:\/\/|https:\/\//g,'')
        }
        const  options = {
            hostname:targetUrl.slice(0,targetUrl.indexOf('/')),// 这里别加http://，否则会出现ENOTFOUND错误
            path:targetUrl.slice(targetUrl.lastIndexOf('/')),// 子路径
            method:'GET',
        }
        const req =  http.request(options,res=>{
            let data = ''
            res.on('data', (chunk) => {
              data+=chunk
            });
            res.on('end',async ()=>{
              const fileName = targetUrl.slice(targetUrl.lastIndexOf('/')+1)
              let result = await client.put(fileName, Buffer.from(data)); 
              response.writeHead(200,{"Content-Type":"text/plain;charset=utf-8"})
              response.write('目标资源上传到阿里云资源地址: \n'+result.url)
              response.end();
            })
      })
      req.on('error', (e) => {
          console.error(`problem with request: ${e.message}`);
      });
      req.end() 
    }
    const server = http.createServer((req, res) => {
        let queryUrl = url.parse(req.url,true)
        const targetUrl = queryUrl.query.url
        if(queryUrl.pathname=='/fetch'){
            parseData(targetUrl,res)
        }else{
            res.writeHead(200,{"Content-Type":"text/plain;charset=utf-8"})
            res.write(`                          
                        请使用如下示例地址上传资源到阿里云: ↓
                       
                        url参数为需要上传的资源 
                        
                        *******************************************************************************************
                        http://localhost:8080/fetch?url=https://sqb-it.oss-cn-hangzhou.aliyuncs.com/union-web/nc.js
                        *******************************************************************************************`
                        
                        )
            res.end();
        }
    })
    server.listen(8080,()=>{
         console.log('listen at 8080')
    })
}