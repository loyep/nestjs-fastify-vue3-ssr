import { FastifyRequest, FastifyReply } from 'fastify'

export type IRequest<T={}> = FastifyRequest &{
  path?: string
} & T

export type IResponse<T={}> = FastifyReply &{

} & T
