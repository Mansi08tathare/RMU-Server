import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonService } from "src/device/services/common-service";
import { ProjectDetails } from "./farmer.entity";
import { FarmerController } from "./farmer.controller";
import { FarmerService } from "./farmer.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([ProjectDetails]), 
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
    controllers:[FarmerController],
    exports:[FarmerService],
    providers:[FarmerService,CommonService],
})

export class FarmerModule{}