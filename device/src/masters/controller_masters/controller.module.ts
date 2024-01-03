import {  Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonService } from "src/device/services/common-service";
import { ControllerMasterController } from "./controller.controller";
import { ControllerMasterService } from "./controller.service";
import { ControllerMaster } from "./controller.entity";




@Module({
    imports:[
        TypeOrmModule.forFeature([ControllerMaster]), 
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
    controllers:[ControllerMasterController],
    providers:[ControllerMasterService,CommonService],
    exports:[ControllerMasterService]
})

export  class ControllerModule{}