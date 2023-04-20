import { Module } from '@nestjs/common';
import { CatModule } from './cat/cat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './cat/cat.entity';

@Module({
  imports: [
    CatModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Cat],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
