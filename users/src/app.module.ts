import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/user.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'postgresUsers',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'auth',
    entities: [User],
    synchronize: true,
    // logging: true,
  })],
  controllers: [],
  providers: [],
})
export class AppModule {
}
