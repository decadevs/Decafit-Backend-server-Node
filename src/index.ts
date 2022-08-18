#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

require('dotenv').config();

import App from './app';
import http = require('http');
const mongoose = require('mongoose');

const url = process.env.MONGODB_URL;
//Database Connection
/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '4000');
App.app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(App.app);

(async() => {
  const apolloServer = await App.startApolloServer();
  await new Promise<void>((resolve) => {
   try {
      mongoose.connect(url).then(() => {
        // eslint-disable-next-line no-console
        console.log('Database Connected')
        server.listen(port);
        server.on('error', onError);
        server.on('listening', () => {
            console.log(`🚀 Server ready at ::${process.env.PORT || port}${apolloServer.graphqlPath}`);
            resolve();
        });
      });
   } catch (error) {
    console.error(error);
   }
  })
})()

function normalizePort(val: string) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

