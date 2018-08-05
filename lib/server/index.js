const express = require(`express`)
const bodyParser = require(`body-parser`)

const contact = require(`../api/index.js`)

const server = express()
const port = 1118

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));

server.get(`/`, contact.show)

server.listen(3000, () => console.log(`
        Contact server listening on port ${port}
        `))