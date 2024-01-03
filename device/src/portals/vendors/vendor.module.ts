import { Module } from "@nestjs/common";
import { VendorService } from "./vendor.service";
import { VendorController } from "./vendor.controller";
import { Vendor } from "src/device/entities/vendor.entity";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonService } from "src/device/services/common-service";
import { State } from "src/device/entities/state.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([Vendor,State]), 
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
    controllers:[VendorController],
    providers:[VendorService,CommonService],
    exports:[VendorService]
})
export class VendorModule{}