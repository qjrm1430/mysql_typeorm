import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ormConfig } from './orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [TypeOrmModule.forRootAsync({ useFactory: ormConfig }), CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
