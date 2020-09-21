#!/usr/bin/env node

/**
 * Module dependencies.
 */
const http = require('http');
const config = require('./lib/config');
const app = require('./lib/web');

const VERSION = '1.0.0';

console.log(`docker-dangling-http, Version ${VERSION}`);
const port = normalizePort(config.defaultPort);

app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('error', onError);

const stopServer = () => {
  console.log('Stopping server...');
  server.close(() => process.exit(0));
};

// Required cleanup behavior
process.on('SIGTERM', stopServer);
process.on('SIGINT', stopServer);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const parsedPort = parseInt(val, 10);

  if (Number.isNaN(parsedPort)) {
    // named pipe
    return val;
  }

  if (parsedPort >= 0) {
    // port number
    return parsedPort;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = (typeof port === 'string')
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}
