const http = require("http");

const server = http.createServer((req, res) => {
    if(req.url === "/") {
        res.end("Welcome to my homepage")
    }
    if (req.url === "/about") {
        res.end("Hello world! My name is Tung Pham")
    }
})

server.listen(3000)