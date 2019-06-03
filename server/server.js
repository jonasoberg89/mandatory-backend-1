const express = require('express');

const app = express();

const fs = require('fs');
const socket = require('socket.io');

app.get('/api',(req, res) => {
    fs.readFile('data.json', (err, data) => {
        if (err) return res.status(400);
        console.log(JSON.parse(data));
        res.send(data);
        });

})

  
const port = 5000;
app.listen(port,() => console.log(`Server started on port ${port}`));