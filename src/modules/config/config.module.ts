import { Module } from '@nestjs/common';

import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { ConfigService } from './service/config.service';

@Module({
  imports: [NestConfigModule.forRoot({})],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
