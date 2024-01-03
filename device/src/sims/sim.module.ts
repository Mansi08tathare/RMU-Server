import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { SimController } from "./sim.controller";
import { SimService } from "./sim.service";
import { CommonService } from "src/device/services/common-service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sim } from "src/device/entities/sim.entity";
import { RidSim } from "src/device/entities/rid.sim.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([Sim,RidSim]),
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
    controllers:[SimController],
    providers:[SimService,CommonService],
    exports:[SimService]
})
export class SimModule{}