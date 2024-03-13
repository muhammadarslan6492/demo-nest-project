import { INJECTION_TOKEN, LOG_CONTEXT, REPOSITORY } from '../../../constant';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entity/user';
import { Config } from '../../../types';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ConfigService } from 'src/modules/config/service/config.service';

export const databaseProviders = [
  {
    provide: INJECTION_TOKEN.DATA_SOURCE,
    useFactory: async (configService: ConfigService): Promise<DataSource> => {
      try {
        const config: Config = configService.getConfig();

        const ormconfig: PostgresConnectionOptions = {
          name: config.DATABASE.DATABASE_NAME,
          type: 'postgres',
          username: config.DATABASE.DATABASE_USERNAME,
          password: config.DATABASE.DATABASE_PASSWORD,
          host: config.DATABASE.DATABASE_HOST,
          port: config.DATABASE.DATABASE_PORT,
          logging: ['error', 'migration', 'schema', 'warn'],
          synchronize: config.DATABASE.SYNC,
          migrationsRun: config.DATABASE.RUN_MIGARTIONS,
          entities: [__dirname + '/../entity/**/*.js'],
          migrations: [__dirname + '/..//migrations/**/*.js'],
          subscribers: [],
        };

        const dataSource = new DataSource(ormconfig);
        const connection = await dataSource.initialize();

        console.log('Established connection', LOG_CONTEXT.DATA_SOURCE);

        return connection;
      } catch (err) {
        throw err;
      }
    },
    inject: [ConfigService],
  },
  {
    provide: REPOSITORY.INVOICE_REPOSITORY,
    useFactory: (dataSource: DataSource): Repository<User> => {
      return dataSource.getRepository(User);
    },
    inject: [INJECTION_TOKEN.DATA_SOURCE],
  },
];
