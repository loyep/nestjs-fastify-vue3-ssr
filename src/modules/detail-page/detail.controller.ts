import { Controller, Get, Req, Res } from '@nestjs/common'
import * as querystring from 'querystring'
import { render } from 'ssr-core-vue3'
import { Readable } from 'stream'
import { ApiDetailService } from './detail.service'


@Controller('/')
export class DetailController {
  constructor (private readonly apiDeatilservice: ApiDetailService) {}

  @Get('/detail/:id')
  async handlerDetail (@Req() req, @Res() res): Promise<any> {
    try {
      const request = req.urlData()
      request.query = querystring.parse(request.query)
      
      const ctx = {
        request,
        response: res,
        apiDeatilservice: this.apiDeatilservice
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
