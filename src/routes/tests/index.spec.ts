import { describe, it, expect } from 'vitest'
import fastify from 'fastify'
import fastifyAutoload from '../../autoload.js'
import { resolve } from 'path'
describe('Testing sendMessage endpoint', () => {
  it("should return a Type different than SpamNotification in response's body", async () => {
    const server = fastify({})

    server.register(fastifyAutoload, {
      dir: resolve(__dirname, '../'),
      ignorePattern: /.*(test|spec).ts/,
    })

    const response = await server.inject({
      method: 'POST',
      payload: {
        "RecordType": "Bounce",
        "MessageStream": "outbound",
        "Type": "HardBounce",
        "TypeCode": 1,
        "Name": "Hard bounce",
        "Tag": "Test",
        "Description": "The server was unable to deliver your message (ex: unknown user, mailbox not found).",
        "Email": "arthur@example.com",
        "From": "notifications@honeybadger.io",
        "BouncedAt": "2019-11-05T16:33:54.9070259Z",
      },
      path: '/sendMessage',
    })
    expect(response.statusCode).toBe(409)
    expect(response.json()).toEqual({ message: 'Type different than SpamNotification' })
  })
})
