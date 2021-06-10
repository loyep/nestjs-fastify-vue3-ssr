import { Controller, Get, Req, Res } from '@nestjs/common'
import { render } from 'ssr-core-vue3'
import { Readable } from 'stream'
import { IRequest, IResponse } from '@/interface'
import { ApiDetailService } from './detail.service'

@Controller('/')
export class DetailController {
  constructor (private readonly apiDeatilservice: ApiDetailService) {}

  @Get('/detail/:id')
  async handlerDetail (@Req() req: IRequest, @Res() res: IResponse) {
    try {
      const ctx = {
        request: req,
        response: res,
        apiDeatilservice: this.apiDeatilservice
      }
      // @ts-expect-error
      const stream = await render<Readable>(ctx, {
        stream: true
      })
      await res.send(stream)
    } catch (error) {
      console.log(error)
      await res.status(500).send(error)
    }
  }
}
