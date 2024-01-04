import { Module } from "@nestjs/common";
import { MotorController } from "./motor.controller";
import { MotorService } from "./motor.service";
import { Motor } from "./motor.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { CommonService } from "src/device/services/common-service";

@Module({
    imports:[
        TypeOrmModule.forFeature([Motor]),
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
    controllers:[MotorController],
    providers:[MotorService,CommonService]

})
export class MotorModule{}