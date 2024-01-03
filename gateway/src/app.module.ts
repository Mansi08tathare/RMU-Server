import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckMicroservicesService } from './services/healthcheck.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DeviceModule } from './device/modules/device.module';
import { RIDModule } from './device/modules/rid.module';
import { StateController } from './portals/states/state.controller';
import { StateService } from './portals/states/state.service';
import { VendorController } from './portals/vendors/vendor.controller';
import { VendorService } from './portals/vendors/vendor.service';
import { SimController } from './sim/sim.controller';
import { SimService } from './sim/sim.service';
import { ConfigController } from './config/config.controller';
import { ConfigService } from './config/config.service';
import { AgencyMasterController } from './masters/agency_master/agency.controller';
import { AgencyMasterService } from './masters/agency_master/agency.service';
import { ControllerMasterController } from './masters/controller_master/controller.controller';
import { ControllerMasterService } from './masters/controller_master/controller.service';

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
    ]),DeviceModule,RIDModule],
  controllers: [AppController,StateController,VendorController,SimController,ConfigController,AgencyMasterController,ControllerMasterController],
  providers: [AppService,HealthCheckMicroservicesService,StateService,VendorService,SimService,ConfigService,AgencyMasterService,ControllerMasterService],
})
export class AppModule {}
