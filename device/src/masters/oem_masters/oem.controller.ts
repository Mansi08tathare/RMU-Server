import { Controller } from '@nestjs/common';
import { OemService } from './oem.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('')
export class OemController {
  constructor(private readonly oemService: OemService) {}

  @MessagePattern({ cmd: 'getOem' })
  async getOem() {
    try {
      let resp = await this.oemService.getOem();
      return resp;
    } catch (err) {
      return err;
    }
  }

  @MessagePattern({cmd:'getOemById'})
  async getOemById(id:number){
    try{
       let resp = await this.oemService.getOemById(id)
       return resp
    }catch(err){
        return err;
    }
  }
  //addOem

  @MessagePattern({cmd:'addOem'})
  async addOem(body:any){
    try{
       let resp = await this.oemService.addOem(body)
       return resp
    }catch(err){
        return err
    }
  }

  @MessagePattern({cmd:'updateOem'})
  async updateOem(data:{body:any,id:number}){
      try{
          const{body,id}=data
         let resp = await this.oemService.updateOem(body,id)
         return resp
      }catch(err){
          console.log("err",err)
          return err
      }
  }

  @MessagePattern({cmd:'deleteOem'})
  async deleteOem(id:number){
      try{
          let resp = await this.oemService.deleteOem(id)
          return resp
      }catch(err){
          console.log("err",err)
          return err
      }
  }
 
}
