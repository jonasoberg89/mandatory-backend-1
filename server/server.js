const express = require('express');
const app = express();
const fs = require('fs');
const socket = require('socket.io');
let dataJson = require('./data.json');

let users = [];
let connections = [];

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
    res.json(getRoom);
})

app.post("/newroom", (req, res) => {
    let name = req.body.roomName
    if (!name) {
        res.status(404);
        res.end();
        return;
    }
    let newRoom = {
        "id": roomId(),
        "roomName": name,
        "messages": []
    }
    dataJson.data.push(newRoom);
    fs.writeFile("./data.json", JSON.stringify(dataJson), function (err, data) {
        if (err) throw err;
        res.status(201);
        res.send({ data: newRoom });
    })
})

app.delete("/delete/:id", (req, res) => {
    let deleteRoom = dataJson.data.filter((room) => room.id !== parseInt(req.params.id));
    fs.writeFile("./data.json", JSON.stringify({ data: deleteRoom }), function (err, data) {
        if (err) throw err;
        res.status(204).end();
    })
})

const port = 5000;
const server = app.listen(port, () => console.log(`Server started on port ${port}`));

const io = socket(server);

io.on("connection", function (socket) {
    connections.push(socket);
    console.log("Connected: %s connected", connections.length)

    socket.on("disconnect", function (data) {
        connections.splice(connections.indexOf(socket), 1);
        users.splice(users.indexOf(socket.username), 1);
        updateUsername();
        connections.splice(connections.indexOf(socket), 1)
        console.log("Disconnected: %s sockets connected", connections.length)
    })

    socket.on("send message", function (data) {
        let user = {
            "id": socket.id,
            "user": data.username,
            "message": data.msg
        }
        dataJson.data.map((room) => {
            if (room.roomName === data.room) {
                room.messages.push(user);
                fs.writeFile("./data.json", JSON.stringify(dataJson), function (err, data) {
                })
            }
        });
        io.sockets.emit("new message", {
            msg: user
        })
    })

    socket.on("new user", function (data, callback) {
        callback = true;
        socket.username = data;
        users.push(socket.username);
        updateUsername();
    })
    function updateUsername() {
        io.sockets.emit("get users", users)
    }
});