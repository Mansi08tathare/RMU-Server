import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { PumpSiteService } from "./pump_site.service";


@Controller()
export class PumpSiteController{
    constructor(
        private readonly pumpSiteService:PumpSiteService
    ){}

    @MessagePattern({cmd:'addPumpSite'})
    async addPumpSite(body:any){
        try{
         let resp = await this.pumpSiteService.addPumpSite(body)
         return resp;
        }catch(err){
           console.log("err",err)
           return err
        }
    }

    @MessagePattern({cmd:'getPumpSite'})
    async getPumpSite(){
        try{
          let resp = await this.pumpSiteService.getPumpSite()
          return resp;
        }catch(err){
          console.log("err",err)
          return err
        }
    }

    @MessagePattern({cmd:'getPumpSiteById'})
    async getPumpSiteById(id:number){
        try{
          let resp = await this.pumpSiteService.getPumpSiteById(id)
          return resp;
        }catch(err){
           console.log("err",err)
           return err;
        }
    }

    @MessagePattern({cmd:'updatePumpSite'})
    async updatePumpSite(data:{id:number,body:any}){
        try{
            const{id,body}=data
          let resp = await this.pumpSiteService.updatePumpSite(id,body)
          return resp;
        }catch(err){
          console.log("err",err)
          return err;
        }
    }

    @MessagePattern({cmd:'deletePumpSite'})
    async deletePumpSite(id:number){
        try{
            console.log("id",id)
          let resp = await this.pumpSiteService.deletePumpSite(id)
           console.log("resp",resp)
          return resp
        }catch(err){
          console.log("err",err)
          return err
        }
    }
}