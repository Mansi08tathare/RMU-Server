import { Controller } from '@nestjs/common';
import { PumpModelService } from './pump_model.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('')
export class PumpModelController {
  constructor(private readonly pumpModelService: PumpModelService) {}

  @MessagePattern({ cmd: 'getPumpModel' })
  async getPumpModel() {
    try {
      let resp = await this.pumpModelService.getPumpModel();
      return resp;
    } catch (err) {
      return err;
    }
  }

  @MessagePattern({cmd:'getPumpModelById'})
  async getPumpModelById(id:number){
    try{
       let resp = await this.pumpModelService.getPumpModelById(id)
       return resp
    }catch(err){
        return err;
    }
  }
  //addPumpModel

  @MessagePattern({cmd:'addPumpModel'})
  async addPumpModel(body:any){
    try{
        console.log("add",body)
       let resp = await this.pumpModelService.addPumpModel(body)
       return resp;
    }catch(err){
        return err;
    }
  }

  @MessagePattern({cmd:'updatePumpModel'})
  async updatePumpModel(data:{body:any,id:number}){
      try{
          const{body,id}=data
         let resp = await this.pumpModelService.updatePumpModel(body,id)
         return resp
      }catch(err){
          console.log("err",err)
          return err
      }
  }

  @MessagePattern({cmd:'deletePumpModel'})
  async deletePumpModel(id:number){
      try{
          let resp = await this.pumpModelService.deletePumpModel(id)
          return resp
      }catch(err){
          console.log("err",err)
          return err
      }
  }
 
}
