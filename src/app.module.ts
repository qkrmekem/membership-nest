import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './member/member.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import configuration from './config/configuration';
import { validate } from './env.validation';
import configurationYaml from './config/configuration-yaml';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config';
import { DataSource } from 'typeorm';
import { ConfigKey } from './member/interface/dbconfig.interface';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { winstonLogger } from './utils/winston.util';

export const jwtConstants = {
  secret: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    ConfigModule.forRoot({
      // envFilePath: [`config/.env.${process.env.NODE_ENV}`],
      ignoreEnvFile: true,
      isGlobal: true,
      load: [configurationYaml],
      validate
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    MemberModule
  ],
  controllers: [AppController],
  providers: [AppService, 
    {
      provide: 'APP_LOGGER', // 또는 LoggerService, 커스텀 토큰 사용
      useValue: winstonLogger,
    },
  ],
  exports: ['APP_LOGGER'],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }

}
