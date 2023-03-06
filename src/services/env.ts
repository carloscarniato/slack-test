import { parseEnv, z } from 'znv'
import * as dotenv from 'dotenv'

dotenv.config()

const env = parseEnv(process.env, {
  LOG_LEVEL: z.string().optional().default('info'),
  PORT: z.number().optional().default(3000),
  AUTH_TOKEN: z.string().optional().default('secret'),
  SLACK_TOKEN: z.string(),
  SLACK_CHANNEL_ID: z.string()
})

export default env
