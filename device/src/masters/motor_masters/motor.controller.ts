import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { MotorService } from "./motor.service";

@Controller('')
export class MotorController{
    constructor(
        private readonly motorService:MotorService
    ){}

    @MessagePattern({cmd:'getMotors'})
    async getMotors(){
        try{
         let resp = await this.motorService.getMotors()
         return resp
        }catch(err){
            console.log("err",err)
            return err

        }
    }

    @MessagePattern({cmd:'getMotor'})
    async getMotor(id:number){
        try{
         let resp = await this.motorService.getMotor(id)
         return resp
        }catch(err){
            console.log("err",err)
            return err

        }
    }

    @MessagePattern({cmd:'addMotor'})
    async addMotor(body:any){
        try{
            let resp =await this.motorService.addMotor(body)
            return resp

        }catch(err){
            console.log("err",err)
            return err
        }
    }

    @MessagePattern({cmd:'updateMotor'})
    async updateMotor(data:{body:any,id:number}){
        try{
            const{body,id}=data
           let resp = await this.motorService.updateMotor(body,id)
           return resp
        }catch(err){
            console.log("err",err)
            return err
        }
    }

    @MessagePattern({cmd:'deleteMotor'})
    async deleteMotor(id:number){
        try{
            let resp = await this.motorService.deleteMotor(id)
            return resp
        }catch(err){
            console.log("err",err)
            return err
        }
    }
   
}