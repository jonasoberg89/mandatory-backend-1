const express = require('express');

const app = express();

const fs = require('fs');
const socket = require('socket.io');
app.use(express.json());
app.get('/api',(req, res) => {
    fs.readFile('data.json', (err, data) => {
        if (err) return res.status(400);
        console.log(JSON.parse(data));
        res.send(data);
        });
})

app.post('/user',(req, res) => {

    if(!req.body.user|| req.body.user.length > 15){
        res.status(400);
    }   else{
        res.send(req.body.user)

    }

   
})
const port = 5000;
const server = app.listen(port,() => console.log(`Server started on port ${port}`));

const io = socket(server);

io.on("connection",function(socket){
    console.log("made connection")
});