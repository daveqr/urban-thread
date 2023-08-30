const net = require("net")

const port = 9999

const server = net.createServer(socket => {
    socket.write("Hello.")
    socket.on("data", data => {
        console.log(data.toString())
    })
})

server.listen(port)