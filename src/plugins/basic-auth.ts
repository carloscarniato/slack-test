import fp from 'fastify-plugin'
import bearerAuthPlugin from '@fastify/bearer-auth'
import env from '../services/env.js'

const keys = new Set([env.AUTH_TOKEN])

export default fp(async (fastify) => await fastify.register(bearerAuthPlugin, { keys }))
