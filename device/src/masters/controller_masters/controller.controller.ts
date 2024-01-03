import { Controller } from '@nestjs/common';
import { ControllerMasterService } from './controller.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('')
export class ControllerMasterController {
  constructor(
    private readonly controllerMasterService: ControllerMasterService,
  ) {}

  @MessagePattern({ cmd: 'getControllers' })
  async getControllers() {
    try {
      let resp = await this.controllerMasterService.getControllers();
      console.log("mpresp",resp)
      return resp;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }

  @MessagePattern({cmd:'addController'})
  async addController(body:any){
    try{
      let resp = await this.controllerMasterService.addController(body);
      return resp;

    }catch(err){
      console.log("err",err)
      return err;
    }
  }

  @MessagePattern({cmd:'getController'})
  async getController(id:number){
    try{
      //console.log("enter in mp get")
      let resp = await this.controllerMasterService.getController(id)
      //console.log("mp",resp)
      return resp;

    }catch(err){
      console.log("err",err)
      return err
    }
  }

  @MessagePattern({cmd:'updateController'})
  async updateController(data:{body:any,id:number}){
    try{
      console.log("enter device microservice")
      const {body,id}=data
      console.log(body,id,"mp")
      let resp = await this.controllerMasterService.updateController(body,id)
      return resp;
    }catch(err){
      console.log("err",err)
      return err
    }
  }

  @MessagePattern({cmd:'deleteController'})
  async deleteController(id:number){
    try{
      let resp = await this.controllerMasterService.deleteController(id)
      return resp

    }catch(err){
      console.log("err",err)
      return err
    }
  }
}
