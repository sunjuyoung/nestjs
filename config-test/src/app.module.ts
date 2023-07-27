import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './weather/weather.module';
import config from '../configs/config';

/**
 * isGlobal: true 전역 모듈로 등록되어 다른 모듈에서는 임포트하지 않아도 됩니다.
 * envFilePath : 환경 변수에 따라서 파일을 사용할수있도록 파일의 경로 지정
 */
console.log('env :' + process.env.NODE_ENV);
console.log(`${process.cwd()}/envs/${process.env.NODE_ENV}`);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV}.env`,
      load: [config],
      cache: true,
    }),
    WeatherModule,
  ], //configModule 설정
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
