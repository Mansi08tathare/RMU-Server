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

    @MessagePattern({cmd:'deleteUser'})
    async deleteUser(id:number){
        try{
            console.log("id mp",id)
          let user = await this.userService.deleteUser(id)
          console.log("resp",user)
          return user;
        }catch(err){
            return err;
        }
    }

    @MessagePattern({cmd:'updateUser'})
    async updateUser(data:{id:number,body:any}){
        try{
            const{id,body}=data;
          //console.log("id mp",id)
          let user = await this.userService.updateUser(id,body)
          return user;
        }catch(err){
            return err
        }
    }

    @MessagePattern({ cmd: 'login' })
    async login(data: { email: string; password: string }) {
      try {
        console.log("data", data)
       let resp = await this.userService.login(data);
       console.log("resp",resp)
       return resp
      } catch (error) {
        console.log(error)
      }
    }

}