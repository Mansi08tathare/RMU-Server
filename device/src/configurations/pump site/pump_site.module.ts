import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonService } from "src/device/services/common-service";
import { PumpSite } from "./pump_site.entity";
import { PumpSiteController } from "./pump_site.controller";
import { PumpSiteService } from "./pump_site.service";


@Module({
    imports:[
        TypeOrmModule.forFeature([PumpSite]), 
        ClientsModule.register([
        {
          name: 'DEVICE_SERVICE',
          transport: Transport.TCP,
          options: {
            host: 'localhost',
            port: 3001,
          },
        },
      ]),],
    controllers:[PumpSiteController],
    exports:[PumpSiteService],
    providers:[PumpSiteService,CommonService],
})

export class PumpSiteModule{}