import { WebClient, LogLevel } from '@slack/web-api'
import env from '../services/env.js';

export const client = new WebClient(env.SLACK_TOKEN, {
  logLevel: LogLevel.INFO
});