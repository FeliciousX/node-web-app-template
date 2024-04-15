import path from 'node:path'
import { fileURLToPath } from 'node:url'

import viewFP from '@fastify/view'
import formBodyFP from '@fastify/formbody'
import staticFp from '@fastify/static'
import cookieFp from '@fastify/cookie'
import handlebars from 'handlebars'

import loginRoute from './routes/login.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Encapsulates the routes
 * @param {import("fastify").FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} [_] plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function app(fastify, _) {
  fastify.register(formBodyFP)
  fastify.register(viewFP, {
    engine: {
      handlebars,
    },
    root: path.join(__dirname, 'views'),
    viewExt: 'hbs',
    defaultContext: {
      dev: process.env.NODE_ENV === 'development'
    },
    options: {
      useDataVariables: true,
      partials: {
        layout: './layouts/main.hbs',
        head: './partials/head.hbs',
      }
    },
  })

  fastify.register(staticFp, {
    root: path.join(__dirname, '../public/assets/css'),
    prefix: '/public/assets/css'
  })

  fastify.register(staticFp, {
    root: path.join(__dirname, '../node_modules'),
    prefix: '/public/assets/js',
    decorateReply: false
  })

  fastify.register(cookieFp, {
    secret: "TODO: UPGRADE THE SECURITY OF COOKIE USAGE!!!",
    parseOptions: {}
  })

  fastify.get('/', (_, reply) => {
    reply.view('./layouts/main', { head: { title: 'Renticulate' } });
  })
  
  fastify.register(loginRoute)
  fastify.register(matchesRoute)

}

export default app;
