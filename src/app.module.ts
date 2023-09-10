import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { AppController } from './app.controller';
import { OAuthModule } from './oauth/OAuthModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.MYSQL.HOST,
      port: config.MYSQL.PORT,
      username: config.MYSQL.USER,
      password: config.MYSQL.PASSWORD,
      database: config.MYSQL.DATABASE,
      synchronize: false,
      entities: [
        __dirname + '/**/entities/*Entity{.ts,.js}',
        __dirname + '/**/entities/*View{.ts,.js}',
      ],
      charset: 'utf8mb4',
      logging: true,
    }),
    OAuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
