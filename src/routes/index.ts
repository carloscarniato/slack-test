import type { FastifyPluginCallback } from 'fastify'
import env from '../services/env.js';
import { client } from '../services/slack.js'
import type { BodyType } from 'types';
import { ErrorCode } from '@slack/web-api';

const index: FastifyPluginCallback = (fastify, _, done) => {
  fastify.post<{Body: BodyType}>(
    '/sendMessage',
    {
      schema: {
        body: {
          type: 'object', 
          properties: { 
            RecordType: {
              type: "string"
            },
            Type: {
              type: "string"
            },
            TypeCode: {
              type: "number"
            },
            Name: {
              type: "string"
            },
            Tag: {
              type: "string"
            },
            MessageStream: {
              type: "string"
            },
            Description: {
              type: "string"
            },
            Email: {
              type: "string",
              format: 'email'
            },
            From: {
              type: "string"
            },
            BouncedAt: {
              type: "string",
              format: 'date-time'
            },
          } 
        },
        response: {
          200: {
            message: { type: 'string' },
          },
          409: {
            message: { type: 'string' },
          },
          500: {
            message: { type: 'string' },
          }
        },
      },
    },
    async (request, reply) => {
      try {
        if (request.body.Type === "SpamNotification") {
          await client.chat.postMessage({
            token: env.SLACK_TOKEN,
            channel: env.SLACK_CHANNEL_ID,
            text: request.body.Email
          })
        } else {
          return reply.code(409).send({ message: 'Type different than SpamNotification' })
        }
        return reply.code(200).send({ message: 'Alert sent to Slack.' })
      } catch (e: any) {
        if(e.code === ErrorCode.PlatformError && e.data.error === "not_in_channel") {
          return reply.code(500).send({ message: "Please add your bot to the channel."})
        }
        return reply.code(500).send({ message: 'Ops! Something went wrong.'})
      }
    },
  )

  done()
}

export default index
