import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DetailModule } from './modules/detail-page/detail.module';
import { indexModule } from './modules/index-page/index.module';

@Module({
  imports: [DetailModule, indexModule, 
    ServeStaticModule.forRoot({
    rootPath: join(process.cwd(), './build'),
  })]
})
export class AppModule {}
