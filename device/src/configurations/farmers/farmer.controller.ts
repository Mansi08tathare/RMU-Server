import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { FarmerService } from "./farmer.service";

@Controller()
export class FarmerController{
    constructor(
        private readonly farmerService:FarmerService
    ){}

    @MessagePattern({cmd:'addFarmer'})
    async addFarmer(body:any){
        try{
            //console.log("mp body",body)
          let resp = await this.farmerService.addFarmer(body)
         // console.log("mp resp",resp)
          return resp;
        }catch(err){
           //console.log("err",err)
           return err;
        }
    }

    @MessagePattern({cmd:'getProject'})
    async getProject(){
        try{
        let resp = await this.farmerService.getProject()
        return resp;
        }catch(err){
          return err;
        }
    }

    @MessagePattern({cmd:'getProjectById'})
    async getProjectById(id:number){
        try{
         let resp = await this.farmerService.getProjectById(id)
         return resp;
        }catch(err){
        return err
        }
    }

    @MessagePattern({cmd:'updateProject'})
    async updateProject(data:{id:number,body:any}){
        try{
            const{id,body}=data
        let resp = await this.farmerService.updateProject(id,body)
        return resp;
        }catch(err){
          return err
        }
    }

    @MessagePattern({cmd:'deleteProject'})
    async deleteProject(id:number){
        try{
         let resp = await this.farmerService.deleteProject(id)
         return resp
        }catch(err){
            return err
        }
    }
}