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
import { ConfigsService } from './config/config.service';
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
import { UserController } from './users/user.controller';
import { UserService } from './users/user.service';
import { FarmerController } from './configurations/farmers/farmer.controller';
import { FarmerService } from './configurations/farmers/farmer.service';
import { PumpSiteController } from './configurations/pump-site/pump-site.controller';
import { PumpSiteService } from './configurations/pump-site/pump-site.service';
import { UserModule } from './users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonService } from './common-service/common-service';


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
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),DeviceModule,RIDModule,UserModule],
  controllers: [AppController,StateController,VendorController,SimController,ConfigController,AgencyMasterController,ControllerMasterController,MotorController,OemController,ProjectController,PumpCodeController,PumpHeadController,PumpModelController,SolarPumpController,UserController,FarmerController,PumpSiteController],
  providers: [AppService,HealthCheckMicroservicesService,StateService,VendorService,SimService,ConfigsService,AgencyMasterService,ControllerMasterService,MotorService,OemService,ProjectService,PumpCodeService,PumpHeadService,PumpModelService,SolarPumpService,UserService,FarmerService,PumpSiteService,CommonService],
})
export class AppModule {}
