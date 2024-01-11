import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class FarmerService{
    constructor(
        @Inject('DEVICE_SERVICE')
        private readonly deviceProxy:ClientProxy
    ){}


    async addFarmer(body:any){
        try{
          console.log("body",body)
          let resp = await this.deviceProxy.send({cmd:'addFarmer'},body).toPromise()
          console.log("resp",resp)
          return resp
        }catch(err){
          console.log("err",err)
          return err
        }
    }

    async getProject(){
      try{
       let resp = await this.deviceProxy.send({cmd:'getProject'},'').toPromise()
       return resp
      }catch(err){
        console.log("err",err)
        return err
      }
    }
  

    async getProjectById(id:number){
      try{
       let resp = await this.deviceProxy.send({cmd:'getProjectById'},id).toPromise()
       return resp
      }catch(err){
        console.log("err",err)
        return err
      }
    }

    async updateProject(id:number,body:any){
     try{
      let resp = await this.deviceProxy.send({cmd:'updateProject'},{id,body}).toPromise()
      return resp
      }catch(err){
        console.log("err",err)
        return err
      }
    }

    async deleteProjectDetails(id:number){
      try{
        console.log("id",id)
      let resp = await this.deviceProxy.send({cmd:'deleteProject'},id).toPromise()
      console.log("resp",resp)
      return resp
      }catch(err){
        console.log("err",err)
        return err
      }
    }
}