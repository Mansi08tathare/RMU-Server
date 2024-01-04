import { Controller } from '@nestjs/common';
import { PumpCodeService } from './pump_code.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('')
export class PumpCodeController {
  constructor(private readonly pumpCodeService: PumpCodeService) {}

  @MessagePattern({ cmd: 'getPumpCode' })
  async getPumpCode() {
    try {
      let resp = await this.pumpCodeService.getPumpCode();
      return resp;
    } catch (err) {
      return err;
    }
  }

  @MessagePattern({cmd:'getPumpCodeById'})
  async getPumpCodeById(id:number){
    try{
       let resp = await this.pumpCodeService.getPumpCodeById(id)
       return resp
    }catch(err){
        return err;
    }
  }
  //addPumpCode

  @MessagePattern({cmd:'addPumpCode'})
  async addPumpCode(body:any){
    try{
       let resp = await this.pumpCodeService.addPumpCode(body)
       return resp
    }catch(err){
        return err
    }
  }

  @MessagePattern({cmd:'updatePumpCode'})
  async updatePumpCode(data:{body:any,id:number}){
      try{
          const{body,id}=data
         let resp = await this.pumpCodeService.updatePumpCode(body,id)
         return resp
      }catch(err){
          console.log("err",err)
          return err
      }
  }

  @MessagePattern({cmd:'deletePumpCode'})
  async deletePumpCode(id:number){
      try{
          let resp = await this.pumpCodeService.deletePumpCode(id)
          return resp
      }catch(err){
          console.log("err",err)
          return err
      }
  }
 
}
