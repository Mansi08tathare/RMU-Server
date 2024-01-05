import { Controller } from '@nestjs/common';
import { SolarPumpService } from './solar_pump.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('')
export class SolarPumpController {
  constructor(private readonly solarPumpService: SolarPumpService) {}

  @MessagePattern({ cmd: 'getSolarPump' })
  async getSolarPump() {
    try {
      let resp = await this.solarPumpService.getSolarPump();
      return resp;
    } catch (err) {
      return err;
    }
  }

  @MessagePattern({cmd:'getSolarPumpById'})
  async getSolarPumpById(id:number){
    try{
       let resp = await this.solarPumpService.getSolarPumpById(id)
       return resp
    }catch(err){
        return err;
    }
  }
  //addSolarPump

  @MessagePattern({cmd:'addSolarPump'})
  async addSolarPump(body:any){
    try{
        console.log("add",body)
       let resp = await this.solarPumpService.addSolarPump(body)
       return resp;
    }catch(err){
        return err;
    }
  }

  @MessagePattern({cmd:'updateSolarPump'})
  async updateSolarPump(data:{body:any,id:number}){
      try{
          const{body,id}=data
         let resp = await this.solarPumpService.updateSolarPump(body,id)
         return resp
      }catch(err){
          console.log("err",err)
          return err
      }
  }

  @MessagePattern({cmd:'deleteSolarPump'})
  async deleteSolarPump(id:number){
      try{
          let resp = await this.solarPumpService.deleteSolarPump(id)
          return resp
      }catch(err){
          console.log("err",err)
          return err
      }
  }
 
}
