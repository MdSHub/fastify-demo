import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    TasksModule,
    TypeOrmModule.forRoot({
      host: 'ep-old-cloud-16159702.us-east-2.aws.neon.tech',
      port: 5432,
      type: 'postgres',
      username: 'saqibali9718620',
      database: 'post',
      password: 'IsKJZ0kiLRg6',
      autoLoadEntities: true,
      synchronize: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
