import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { CommonService } from "src/device/services/common-service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Role } from "./entities/role.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { Permission } from "./entities/permission.entity";
import { UserRid } from "./entities/users_rid.entity";
import { Rid } from "src/device/entities/rid.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([User,Role,Permission,UserRid,Rid]),
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