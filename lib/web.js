const express = require('express');
const app = express();

app.get('/', function(req, res) {

  let delay = parseInt(req.query.d) || 0
  let delayMsecs = delay * 1000
  let message = (delay) ? `Delayed ${delay}s` : 'Not delayed'

  let output = () => {
    res.end(message);
  }

  setInterval(output, delayMsecs)
});

// catch 404 and forward to error handler
app.use(function(req, res) {
  res.sendStatus(404);
});

module.exports = app;
