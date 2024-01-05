import { Module } from "@nestjs/common";
import { CommonService } from "src/device/services/common-service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SolarPumpController } from "./solar_pump.controller";
import { SolarPump } from "./solar_pump.entity";
import { SolarPumpService } from "./solar_pump.service";




@Module({
    imports:[
        TypeOrmModule.forFeature([SolarPump]),
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
    controllers:[SolarPumpController],
    providers:[SolarPumpService,CommonService]
})

export class SolarPumpModule{}