
import { Body, Controller } from "@nestjs/common";
import { RidService } from "../services/rid.service";
import { MessagePattern } from "@nestjs/microservices";

@Controller('rid')
export class RidController {
    constructor(private readonly ridService: RidService) {}

    @MessagePattern({cmd:'addRID'})
    async addRID(rData: any):Promise<any>{
        try{
            const {rid, CONT_MFR} = rData;
            //console.log("mp",rid,CONT_MFR)
            const resp= await this.ridService.addRID(rid,CONT_MFR);
             console.log("resp",resp)
            // console.log(resp.data)
            // console.log(resp.message)
            // console.log(resp.statusCode)
            return resp;
        }catch(err){
            console.log("ridc",err);
            return err;
        }
    }

    @MessagePattern({cmd:'checkConfig'})
    async checkConfigRidExist(rData:any):Promise<any>{
        try{
            const{rid_ref_id}=rData
            console.log("c",rid_ref_id)
            const resp=await this.ridService.checkConfigRidExist(rid_ref_id)
            return resp;
        }catch(err){
            return err;
        }
    }

    @MessagePattern({cmd:'getRIDByRefID'})
    async getRIDByRefID(id:number):Promise<any>{
        try{
          const resp = await this.ridService.getRIDByRefID(id)
          return resp;
        } catch(err){
          return err
        }
    }

    @MessagePattern({cmd:'deleteRid'})
    async deleteRid(id:number){
      try{
        const device = await this.ridService.deleteRid(id)
        return device
  
      }catch(err){
        console.log(err)
        return err;
  
      }
    }
    
    @MessagePattern({cmd:'updateRid'})
    async updateRid(data:{id:number,params:any}){
      try{
       const{id,params}=data
       const device = await this.ridService.updateRid(id,params)
       return device;
      }catch(err){
        console.log(err)
        return err;
      }
    }

    @MessagePattern({cmd:'getallRids'})
    async getRids(){
      try{
        const device = await this.ridService.getallRids()
        console.log("mp",device)
        return device;
      } catch(err){
        console.log(err)
        return err;
      }
    }
}