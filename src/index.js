import fastify from 'fastify'

import app from './app.js'

import 'dotenv/config'

const server = fastify({
  logger: true
})

server.register(app)

// Run the server!
server.listen({ port: 3000 }, function(err, address) {
  console.log({ address })
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
  console.log('Server listening at ${address}')
})
