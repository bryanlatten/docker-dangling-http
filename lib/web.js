const express = require('express')
const app = express()
const _ = require('lodash')

app.get('/', function(req, res) {

  let responseMsgs = [`[Response from ${req.hostname}]`]
  let consoleMsgs  = [`Request from ${req.ip}`]

  let delay = parseInt(req.query.d) || 0
  let variance = parseInt(req.query.r) || 0

  if (variance) {
    let value = _.random(0,variance)
    delay = delay + value

    let randMsg = `adding ${value}s random delay (max ${variance}s)`
    responseMsgs.push(randMsg)
    consoleMsgs.push(randMsg)
  } // if variance

  let delayMsecs = delay * 1000
  let empty = !!req.query.e;
  let delayMsg = delayMsecs ? `delayed ${delay}s` : 'not delayed'

  responseMsgs.push(delayMsg)
  consoleMsgs.push(delayMsg)
  consoleMsgs.push(empty ? 'prematurely breaking connection' : 'completing normally')

  let output = () => {
    if (empty) {
      return res.socket.end()
    }
    res.end(responseMsgs.join('\n\t- ') + '\n')
  }

  console.log(consoleMsgs.join(', '))
  setInterval(output, delayMsecs)
});

// catch 404 and forward to error handler
app.use(function(req, res) {
  res.sendStatus(404)
});

module.exports = app
