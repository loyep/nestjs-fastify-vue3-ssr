import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { initialSSRDevProxy, loadConfig } from 'ssr-server-utils'
import { IRequest, IResponse } from '@/interface'
import * as uri from 'uri-js'

import { AppModule } from './app.module'

async function bootstrap (): Promise<void> {
  const fastify = new FastifyAdapter()
  await fastify.register(require('fastify-express'))
  fastify.use((req: IRequest, res: IResponse, next) => {
    // 这里目测需要用 defineProperty 改 configurable 属性
    req.path = uri.parse(req.url).path
    next()
  })

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastify)
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
