import fastifyAutoload from './autoload.js'
import fastify from 'fastify'
import logger from './services/logger.js'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import env from './services/env.js'

const __dir = dirname(fileURLToPath(import.meta.url))

const server = fastify({
  logger: logger,
})

function main() {
  try {
    server.register(fastifyAutoload, {
      dir: resolve(__dir, 'plugins'),
      forceEsm: true,
    })
    server.register(fastifyAutoload, {
      dir: resolve(__dir, 'routes'),
      ignorePattern: /.*(test|spec).ts/,
      forceEsm: true,
    })

    server.listen({ port: env.PORT, host: '0.0.0.0' })
  } catch (error) {
    if (error instanceof Error) {
      server.log.error(error)
      process.exit(1)
    }
  }
}

main()

export default server
