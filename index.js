const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000
const router = require('./routes')


app.set('query parser', true);
app.use(express.json())
app.use(morgan('dev'))
app.use('/', router)

// app.get('/', (req, res) => {
//   console.log(req.query.time)
//   res.send('Hello World!')
// })

// app.post('/ping', (req, res) => {
//     console.log(req.body)
//   res.send("pong")
// })

// app.get('/nuke', (req, res) => {
//   nuke().then(response => res.send(response)).catch(err => res.send(err))
// })

// app.get('/get', (req, res) => {
//   get().then(response => res.send(response)).catch(err => res.send(err))
// })

// app.get('/create', (req, res) => {
//   create(req.query.time).then(response => res.send(response)).catch(err => res.send(err))
// })

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})