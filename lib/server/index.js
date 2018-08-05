const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const contact = require("../api/index.js");

const server = express();
const port = 3000;

server.use(cors());

server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: true
  })
);

server.get(`/`, contact.show);
server.post(`/`, contact.add);

server.listen(port, () =>
  console.log(`
        Contact server listening on port ${port}
        `)
);
