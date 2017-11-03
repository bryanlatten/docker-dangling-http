const express = require('express')
const app = express()

app.get('/', function(req, res) {

  let delay = parseInt(req.query.d) || 0
  let empty = !!req.query.e;

  let delayMsecs = delay * 1000
  let responseMsgs = [`[Response from ${req.hostname}]`]
  let consoleMsgs  = [`Request from ${req.ip}`]

  let delayMsg = delay ? `delayed ${delay}s` : 'not delayed'
  responseMsgs.push(delayMsg)
  consoleMsgs.push(delayMsg)
  consoleMsgs.push( empty ? 'prematurely breaking connection' : 'completing normally')

  console.log(consoleMsgs.join(', '))

  let output = () => {
    if (empty) {
      return res.socket.end()
    }

    res.end(responseMsgs.join('\n\t- ') + '\n')
  }

  setInterval(output, delayMsecs)
});

// catch 404 and forward to error handler
app.use(function(req, res) {
  res.sendStatus(404)
});

module.exports = app
