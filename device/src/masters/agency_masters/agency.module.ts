import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonService } from "src/device/services/common-service";
import { Agency } from "./agency.entity";
import { AgencyMasterController } from "./agency.controller";
import { AgencyMasterService } from "./agency.service";



@Module({
    imports:[
        TypeOrmModule.forFeature([Agency]), 
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
    controllers:[AgencyMasterController],
    providers:[AgencyMasterService,CommonService],
    exports:[AgencyMasterService]
})

export  class AgencyModule{}