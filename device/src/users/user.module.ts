import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { CommonService } from "src/device/services/common-service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Role } from "./role.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([User,Role]),
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
    controllers:[UserController],
    providers:[UserService,CommonService],
    exports:[UserService]
})
export class UserModule{}