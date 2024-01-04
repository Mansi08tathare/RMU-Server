import { Module } from "@nestjs/common";
import { CommonService } from "src/device/services/common-service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PumpCodeController } from "./pump_code.controller";
import { PumpCodeMaster } from "./pump_code.entity";
import { PumpCodeService } from "./pump_code.service";


@Module({
    imports:[
        TypeOrmModule.forFeature([PumpCodeMaster]),
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
    controllers:[PumpCodeController],
    providers:[PumpCodeService,CommonService]
})

export class PumpCodeModule{}