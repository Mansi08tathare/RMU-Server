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
import { MotorController } from './masters/motor_master/motor.controller';
import { MotorService } from './masters/motor_master/motor.service';
import { OemController } from './masters/oem_master/oem.controller';
import { OemService } from './masters/oem_master/oem.service';
import { ProjectController } from './masters/project_masters/project.controller ';
import { ProjectService } from './masters/project_masters/project.service';
import { PumpCodeController } from './masters/pump_code_master/pump_code.controller';
import { PumpCodeService } from './masters/pump_code_master/pump_code.service';
import { PumpHeadController } from './masters/pump_head_master/pump_head.controller';
import { PumpHeadService } from './masters/pump_head_master/pump_head.service';
import { PumpModelController } from './masters/pump_model_master/pump_model.controller';
import { PumpModelService } from './masters/pump_model_master/pump_model.service';
import { SolarPumpController } from './masters/solar_pump/solar_pump.controller';
import { SolarPumpService } from './masters/solar_pump/solar_pump.service';

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
  controllers: [AppController,StateController,VendorController,SimController,ConfigController,AgencyMasterController,ControllerMasterController,MotorController,OemController,ProjectController,PumpCodeController,PumpHeadController,PumpModelController,SolarPumpController],
  providers: [AppService,HealthCheckMicroservicesService,StateService,VendorService,SimService,ConfigService,AgencyMasterService,ControllerMasterService,MotorService,OemService,ProjectService,PumpCodeService,PumpHeadService,PumpModelService,SolarPumpService],
})
export class AppModule {}
