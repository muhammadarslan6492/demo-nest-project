import { Injectable } from '@nestjs/common';
import { Config } from 'src/types';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  getConfig(): Config {
    return {
      DATABASE: {
        DATABASE_NAME: this.configService.get('DATABASE_NAME'),
        DATABASE_USERNAME: this.configService.get('DATABASE_USERNAME'),
        DATABASE_PASSWORD: this.configService.get('DATABASE_PASSWORD'),
        DATABASE_HOST: this.configService.get('DATABASE_HOST'),
        DATABASE_PORT: this.configService.get('DATABASE_PORT'),
        SYNC: this.configService.get('DATABASE_SYNC'),
        RUN_MIGARTIONS: this.configService.get('DATABASE_RUN_MIGRATION'),
      },
      SERVER: {
        PORT: this.configService.get('PORT'),
      },
      AUTH: {
        SECRET_KEY: this.configService.get('JWT_SECRET_KEY'),
      },
      REDIS: {
        HOST: this.configService.get('REDIS_HOST'),
        PASSWORD: this.configService.get('REDIS_PASSWORD'),
        PORT: this.configService.get('REDIS_PORT'),
        TTL: this.configService.get('REDIS_TTL'),
      },
    };
  }
}
