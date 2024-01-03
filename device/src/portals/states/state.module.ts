import { Module } from "@nestjs/common";
import { StateController } from "./state.controller";
import { StateService } from "./state.service";
import { State } from "src/device/entities/state.entity";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonService } from "src/device/services/common-service";
import { Device } from "src/device/entities/device.entity";



@Module({
    imports:[
        TypeOrmModule.forFeature([State,Device]), 
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
    controllers:[StateController],
    providers:[StateService,CommonService],
    exports:[StateService]
})

export  class StateModule{}