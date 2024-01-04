import { Module } from "@nestjs/common";
import { CommonService } from "src/device/services/common-service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PumpHeadController } from "./pump_head.controller";
import { PumpHeadMaster } from "./pump_head.entity";
import { PumpHeadService } from "./pump_head.service";



@Module({
    imports:[
        TypeOrmModule.forFeature([PumpHeadMaster]),
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
    controllers:[PumpHeadController],
    providers:[PumpHeadService,CommonService]
})

export class PumpHeadModule{}