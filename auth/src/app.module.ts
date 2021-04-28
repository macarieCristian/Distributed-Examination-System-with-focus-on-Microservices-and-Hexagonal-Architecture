import { Global, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Service } from './domain/enum/service';

@Global()
@Module({
  imports: [AuthModule,
    ClientsModule.register([
      {
        name: Service.USERS,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 9030,
        },
      },
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [ClientsModule]
})
export class AppModule {
}
