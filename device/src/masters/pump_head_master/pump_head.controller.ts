import { Controller } from '@nestjs/common';
import { PumpHeadService } from './pump_head.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('')
export class PumpHeadController {
  constructor(private readonly pumpHeadService: PumpHeadService) {}

  @MessagePattern({ cmd: 'getPumpHead' })
  async getPumpHead() {
    try {
      let resp = await this.pumpHeadService.getPumpHead();
      return resp;
    } catch (err) {
      return err;
    }
  }

  @MessagePattern({cmd:'getPumpHeadById'})
  async getPumpHeadById(id:number){
    try{
       let resp = await this.pumpHeadService.getPumpHeadById(id)
       return resp
    }catch(err){
        return err;
    }
  }
  //addPumpHead

  @MessagePattern({cmd:'addPumpHead'})
  async addPumpHead(body:any){
    try{
       let resp = await this.pumpHeadService.addPumpHead(body)
       return resp
    }catch(err){
        return err
    }
  }

  @MessagePattern({cmd:'updatePumpHead'})
  async updatePumpHead(data:{body:any,id:number}){
      try{
          const{body,id}=data
         let resp = await this.pumpHeadService.updatePumpHead(body,id)
         return resp
      }catch(err){
          console.log("err",err)
          return err
      }
  }

  @MessagePattern({cmd:'deletePumpHead'})
  async deletePumpHead(id:number){
      try{
          let resp = await this.pumpHeadService.deletePumpHead(id)
          return resp
      }catch(err){
          console.log("err",err)
          return err
      }
  }
 
}
