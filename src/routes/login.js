/**
 * Encapsulates the routes
 * @param {import("fastify").FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} [_] plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify, _) {
  fastify.get('/login', async function(request, reply) {

    return reply.view('./login', {
      head: { title: 'lol' },
      form: {
        email: 'staticuser1@renticulate.com',
        password: 'renticulate'
      }
    })

  })

  fastify.post('/login', async function(request, reply) {
    return reply.redirect(303, '/matches')
  })

}

export default routes
