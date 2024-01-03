import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmconfigAsync } from './configs/typeorm.config';
import { RidModule } from './rid/modules/rid.module';
import { DeviceModule } from './device/modules/device.module';
import { StateModule } from './portals/states/state.module';
import { VendorModule } from './portals/vendors/vendor.module';
import { SimModule } from './sims/sim.module';
import { ConfigsModule } from './config-api/configs.module';
import { AgencyModule } from './masters/agency_masters/agency.module';
import { ControllerModule } from './masters/controller_masters/controller.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmconfigAsync),
    ClientsModule.register([
    {
      name: 'DEVICE_SERVICE',
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
      },
    },
  ]),RidModule,DeviceModule,StateModule,VendorModule,SimModule,ConfigsModule,AgencyModule,ControllerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
