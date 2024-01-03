import { Module } from "@nestjs/common";
import { RidController } from "../controllers/rid.controller";
import { RidService } from "../services/rid.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { CommonService } from "src/device/services/common-service";
import { Rid } from "src/device/entities/rid.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RidConfig } from "src/device/entities/rid_config.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([Rid,RidConfig]), 
        ClientsModule.register([
        {
          name: 'DEVICE_SERVICE',
          transport: Transport.TCP,
          options: {
            host: 'localhost',
            port: 3001,
          },
        },
      ]),],
    controllers:[RidController],
    exports:[RidService],
    providers:[RidService,CommonService],
})

export class RidModule{}