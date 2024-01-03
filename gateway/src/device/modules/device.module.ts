import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DeviceController } from '../controllers/device.controller';
import { DeviceService } from '../services/device.service';

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
    ])],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class DeviceModule {}
