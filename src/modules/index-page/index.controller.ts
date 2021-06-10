import { Controller, Get, Req, Res } from '@nestjs/common'
import * as querystring from 'querystring'
import { render } from 'ssr-core-vue3'
import { Readable } from 'stream'
import { ApiService } from './index.service'

@Controller('/')
export class AppController {
  constructor (private readonly apiService: ApiService) {}

  @Get('/')
  async handlerIndex (@Req() req, @Res() res): Promise<any> {
    try {
      const request = req.urlData()
      request.query = querystring.parse(request.query)
      const ctx = {
        request,
        response: res,
        apiService: this.apiService
      }
      const stream = await render<Readable>(ctx, {
        stream: true
      })
      return res.send(stream)
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  }
}
