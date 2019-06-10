const express = require('express');
const app = express();
const fs = require('fs');
const socket = require('socket.io');
let dataJson = require('./data.json');


function roomId() {
  return parseInt(Date.now() + Math.random());
}


app.use(express.json());

app.get('/api', (req, res) => {
    fs.readFile('data.json', (err, data) => {
        if (err) return res.status(400);
        res.send(dataJson);
    });
})

app.get("/room/:id", (req, res) => {
    let getRoom = dataJson.data.find((room) => room.id === parseInt(req.params.id))
    if (!getRoom) {
        res.status(404);
        res.end();
        return;
    }
    res.status(200);
    console.log(getRoom)
    res.json(getRoom);
})
app.post('/user', (req, res) => {

    if (!req.body.user || req.body.user.length > 15) {
        res.status(400);
    } else {
        res.send(req.body.user)
    }
})
app.post("/newroom", (req, res) => {
    let name = req.body.roomName
    let newRoom = {
        "id": roomId(),
        "roomName": name,
        "members": [],
        "messages": []
    }
    console.log(newRoom)
    dataJson.data.push(newRoom);
    fs.writeFile("./data.json", JSON.stringify(dataJson), function (err, data) {
        if (err) throw err;
        res.status(201);
        res.send({ data: newRoom });
    })
})

app.delete("/delete/:id", (req, res) => {
    let deleteRoom = dataJson.data.filter((room) => room.id !== parseInt(req.params.id));
    console.log(deleteRoom)
    fs.writeFile("./data.json", JSON.stringify({data:deleteRoom}), function (err, data) {
        if (err) throw err;
        res.status(204).end();
    })
})

const port = 5000;
const server = app.listen(port, () => console.log(`Server started on port ${port}`));

const io = socket(server);

io.on("connection", function (socket) {
    console.log("made connection")
});