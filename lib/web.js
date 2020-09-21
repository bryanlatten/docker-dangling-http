const express = require('express');

const app = express();
const _ = require('lodash');

app.get('/', (req, res) => {
  const responseMsgs = [`[Response from ${req.hostname}]`];
  const consoleMsgs = [`Request from ${req.ip}`];

  const variance = parseInt(req.query.r, 10) || 0;
  let delay = parseInt(req.query.d, 10) || 0;

  if (variance) {
    const value = _.random(0, variance);
    delay += value;

    const randMsg = `adding ${value}s random delay (max ${variance}s)`;
    responseMsgs.push(randMsg);
    consoleMsgs.push(randMsg);
  } // if variance

  const delayMsecs = delay * 1000;
  const empty = !!req.query.e;
  const delayMsg = (delayMsecs)
    ? `delayed ${delay}s`
    : 'not delayed';

  responseMsgs.push(delayMsg);
  consoleMsgs.push(delayMsg);
  consoleMsgs.push(empty ? 'prematurely breaking connection' : 'completing normally');

  const output = () => (
    (empty)
      ? res.socket.end()
      : res.end(`${responseMsgs.join('\n\t- ')}\n`)
  );

  console.log(consoleMsgs.join(', '));
  setInterval(output, delayMsecs);
});

// catch 404 and forward to error handler
app.use((req, res) => {
  res.sendStatus(404);
});

module.exports = app;
