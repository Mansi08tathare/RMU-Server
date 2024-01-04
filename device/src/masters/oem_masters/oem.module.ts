import { Module } from "@nestjs/common";
import { OemController } from "./oem.controller";
import { OemService } from "./oem.service";
import { CommonService } from "src/device/services/common-service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OEM } from "./oem.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([OEM]),
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
    controllers:[OemController],
    providers:[OemService,CommonService]
})

export class OemModule{}