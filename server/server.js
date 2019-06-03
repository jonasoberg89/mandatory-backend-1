const express = require('express');
const app = express();
const port = 4000;
const fs = require('fs');
const socket = require('socket.io');
app.use (express.json())
const proxy = require('http-proxy-middleware');


//rooms

//users

//message



//Username
app.post("/post"),(req,res) => {
    console.log (req)
}


// i dont know what the hell im doing...
var options = {
    target: 'http://localhost:3000',
    changeOrigin: true, 
    ws: true,
    pathRewrite: {
      '^/api/old-path': '/api/new-path', 
      '^/api/remove/path': '/path'
    },
    router: {
      'dev.localhost:3000': 'http://localhost:4000'
    }
  };
  
  var exampleProxy = proxy(options);
  app.use('/api', exampleProxy);
  app.listen(port);