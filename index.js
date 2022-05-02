// Deps
const express = require('express')
const morgan = require('morgan')
const {WebSocketServer} = require('ws')
const cors = require('cors')
const path = require('path')
var sqlite3 = require('sqlite3');

// Globals
const app = express()
var db = new sqlite3.Database('main.db');
const {v4 : uuidv4} = require('uuid')
const port = 3001
const router = express.Router()
const controller = express.Router()

// Config
app.set('query parser', true);

/////////////////////////////////////////////////////////////////////
// Middleware 
/////////////////////////////////////////////////////////////////////

app.use(express.static('public'))
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, './client/build')));
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

        sendMessage("ping")

        date = new Date(req.query.time*1000)
        const newId = uuidv4()
        let data = {
          area: parseInt(req.query.area),
          id: newId,
          epochTime: parseInt(req.query.time), 
          humanTime: date.toLocaleString()
        }

        db.run(`INSERT INTO area`+data.area+`(id, epochTime,humanTime)
                    VALUES('`+data.id+`','`+data.epochTime+`','`+data.humanTime+`')`
                    , (err) => {
              if (err) 
              {
                res.send({"message":"err", "data": err})
              }else
              {
                res.send({"message": "success", "data": data})
              }
         });
      })
  /////////////////////////////////////////////////////////////////////
  // /get
  /////////////////////////////////////////////////////////////////////

      controller.route('/get').get((req, res) => {
        db.all("SELECT * FROM area" + req.query.area, (error, rows) => {
          if(error) 
          {
            res.send({"message":"error", "data": error})
          }else
          {
            res.send({"message":"success", "data": rows})
          }
        });
      })

  /////////////////////////////////////////////////////////////////////
  // /nuke
  /////////////////////////////////////////////////////////////////////

      controller.route('/nuke').get((req, res) => {
        db.run(`DELETE FROM area`+req.query.area, (err) => {
              if (err) 
              {
                res.send({"message":"err", "data": err})
              }else
              {
                res.send({"message": "success"})
              }
         });
      })
/////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
// Express server listener
//////////////////////////////////////////////////////////////////////
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

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

