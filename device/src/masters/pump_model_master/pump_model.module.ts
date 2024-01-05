import { Module } from "@nestjs/common";
import { CommonService } from "src/device/services/common-service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PumpModelController } from "./pump_model.controller";
import { PumpModel } from "./pump_model.entity";
import { PumpModelService } from "./pump_model.service";



@Module({
    imports:[
        TypeOrmModule.forFeature([PumpModel]),
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
    controllers:[PumpModelController],
    providers:[PumpModelService,CommonService]
})

export class PumpModelModule{}