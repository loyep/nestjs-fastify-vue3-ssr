import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify"
import { initialSSRDevProxy, loadConfig } from 'ssr-server-utils'
import { AppModule } from './app.module'

async function bootstrap (): Promise<void> {
  const fastify = new FastifyAdapter()
  await fastify.register(require('fastify-url-data'))
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastify, {})
  await initialSSRDevProxy(app, {
    express: true
  })
  const { serverPort } = loadConfig()
  await app.listen(serverPort)
}

bootstrap().catch(err => {
  console.log(err)
  process.exit(1)
})
