const express = require(`express`)
const bodyParser = require(`body-parser`)
const cors = require(`cors`)
const contact = require(`../api/index.js`)

const server = express()
const port = 1118

server.use(cors())
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));

server.get(`/`, contact.show)

server.listen(port, () => console.log(`
        Contact server listening on port ${port}
        `))