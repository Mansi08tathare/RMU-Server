import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class ControllerMasterService{
    constructor(
        @Inject('DEVICE_SERVICE')
        private readonly deviceProxy:ClientProxy
    ){}
       
      async getControllers(){
        try{
          let resp = await this.deviceProxy.send({cmd:'getControllers'},'')
          return resp
        }catch(err){
            console.log("err",err)
            return err
        }

      }

      async getController(id:number){
        try{
            let resp = await this.deviceProxy.send({cmd:'getController'},id).toPromise()
            return resp
        }catch(err){
            console.log("err",err)
            return err
        }
      }
}