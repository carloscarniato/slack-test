import pino from 'pino'
import env from './env.js'

const logger = pino({
  level: env.LOG_LEVEL,
  base: {
    pid: false,
    hostname: false,
  },
})

export default logger
