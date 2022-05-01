// Deps
const { PrismaClient } = require('@prisma/client')
const express = require('express')
const morgan = require('morgan')
const {WebSocketServer} = require('ws')
const prisma = new PrismaClient()
const app = express()
const cors = require('cors')

// Variables
const port = 3001
const router = express.Router()
const controller = express.Router()

// Config
app.set('query parser', true);

///////////////////////////////////k//////////////////////////////////
// Middleware 
/////////////////////////////////////////////////////////////////////

app.use(express.static('public'))
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

///////////////////////////////////k//////////////////////////////////
// Routers 
/////////////////////////////////////////////////////////////////////

app.use('/', router)
app.use('/area', controller)

/////////////////////////////////////////////////////////////////////
// controllers
/////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////
  // /ping
  /////////////////////////////////////////////////////////////////////
      router.route('/ping').get((req, res) => {
        res.send("pong")
      })
  /////////////////////////////////////////////////////////////////////
  // /create
  /////////////////////////////////////////////////////////////////////

      controller.route('/create').get((req, res) => {

        let area
        let areaName

        sendMessage("ping")

        switch (parseInt(req.query.area)) {
          case 1:
            areaName = "Area 1"
            area = prisma.area1
            break;
          case 2:
            areaName = "Area 2"
            area = prisma.area2
            break;
          case 3:
            areaName = "Area 3"
            area = prisma.area3
            break;
        }
        date = new Date(req.query.time*1000)
        area.create({
          data: {
            humanTime: date.toLocaleString(),
            epochTime: parseInt(req.query.time)
          }
        }).then(result => res.send({"Area": areaName, "message": "success", "data": result}))
        .catch(err => res.send({"Area": areaName, "message": "error", "data": err}))
      })
  /////////////////////////////////////////////////////////////////////
  // /get
  /////////////////////////////////////////////////////////////////////

      controller.route('/get').get((req, res) => {
        let area
        let areaName
        switch (parseInt(req.query.area)) {
          case 1:
            area = prisma.area1
            areaName = "1"
            break;
          case 2:
            area = prisma.area2
            areaName = "2"
            break;
          case 3:
            area = prisma.area3
            areaName = "3"
            break;
        }
        area.findMany({}).then(result => res.send({"Area": areaName, "message": "success", "data": result}))
        .catch(err => res.send({"Area": areaName, "message": "error", "data": err}))
      })

  /////////////////////////////////////////////////////////////////////
  // /nuke
  /////////////////////////////////////////////////////////////////////

      controller.route('/nuke').get((req, res) => {
        let area
        let areaName
        sendMessage("ping")
        switch (parseInt(req.query.area)) {
          case 1:
            area = prisma.area1
            areaName = "1"
            break;
          case 2:
            area = prisma.area2
            areaName = "2"
            break;
          case 3:
            area = prisma.area3
            areaName = "3"
            break;
        }
        area.deleteMany({}).then(result => res.send({"Area": areaName, "message": "success", "data": result}))
        .catch(err => res.send({"Area": areaName, "message": "error", "data": err}))
      })
/////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
// Express server listener
//////////////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

//////////////////////////////////////////////////////////////////////
// WebSockets
//////////////////////////////////////////////////////////////////////

const wss = new WebSocketServer({ port:3003 });
const clients = {}

const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
  };

const sendMessage = (json) => {
    // We are sending the current data to all connected clients
    Object.keys(clients).map((client) => {
      clients[client].send(json);
    });
  }

wss.on('connection', connection)

function connection(ws){
    let userID = getUniqueID()
    ws.on('message', message)
    clients[userID] = ws

}

function message(data){
    console.log("received: " + data.toString())
    sendMessage("copy that")
}

