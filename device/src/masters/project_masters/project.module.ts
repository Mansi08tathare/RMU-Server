import { Module } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { CommonService } from "src/device/services/common-service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectMaster } from "./project.entity";
import { ProjectController } from "./project.controller ";

@Module({
    imports:[
        TypeOrmModule.forFeature([ProjectMaster]),
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
    controllers:[ProjectController],
    providers:[ProjectService,CommonService]
})

export class ProjectModule{}