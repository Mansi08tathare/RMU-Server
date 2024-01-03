import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RIDController } from '../../rid/rid.controller';
import { RidService } from '../../rid/rid.service';
import { CommonService } from '../services/common-service';


@Module({
  imports: [ 
    ClientsModule.register([
      {
        name: 'DEVICE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      },
    ])
],
  controllers: [RIDController],
  providers: [RidService,CommonService],
})
export class RIDModule {}
