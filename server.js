const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)


app.use('/', express.static(path.join(__dirname, '/public')))


let users = {
    'DJ': 'pass1234'
}
let socketMap = {}

io.on('connection', (socket) => {
    console.log('connected with socketId = ', socket.id)

    function login(s, u) {
        s.join(u)
        s.emit('logged-in')
        socketMap[s.id] = u
        console.log(socketMap)
    }

    socket.on('login', (data) => {
        if (users[data.username]) {
            if (users[data.username] == data.password) {
                login(socket, data.username)
            } else {
                socket.emit('login failed')
            }
        } else {
            users[data.username] = data.password
            login(socket, data.username)
        }
    })

    socket.on('msg_send', (data) => {
        data.from=socketMap[socket.id]
        if (data.to) {
            io.to(data.to).emit('msg_rcvd', data)
        } else {
            socket.broadcast.emit('msg_rcvd', data)
        }
    })
})


server.listen(5757, () => {
    console.log(`http://localhost:5757`)
})