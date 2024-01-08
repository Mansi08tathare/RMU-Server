import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { UserService } from "./user.service";

@Controller()
export class UserController{
    constructor(
        private readonly userService:UserService
    ){}

    @MessagePattern({cmd:'addUser'})
    async addUser(body:any){
        try{
         let user= await this.userService.addUser(body)
         console.log("usermp",user)
         return user
        }catch(err){
            console.log("err",err)
            return err

        }
    }

    @MessagePattern({cmd:"getUser"})
    async getUser(){
        try{
            let user = await this.userService.getUser()
            return user
        }catch(err){
            return err
        }
    }

    @MessagePattern({cmd:'getUserById'})
    async getUserById(id:number){
        try{
         let user = await this.userService.getUserById(id)
         return user
        }catch(err){
            return err
        }
    }

}