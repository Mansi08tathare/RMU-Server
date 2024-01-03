import { Controller } from "@nestjs/common";
import { ConfigService } from "./configs.service";
import { MessagePattern } from "@nestjs/microservices";

@Controller('')
export class ConfigController {
  constructor(
    private readonly configService: ConfigService
  ) {}

  @MessagePattern({ cmd: 'getConfigs' })
  async getConfigs() {
    try {
      console.log("config");
      let config = await this.configService.getConfigs();
      return config;
    } catch (err) {
      console.log("err", err);
      return err;
    }
  }

  @MessagePattern({cmd:'getConfig'})
  async getConfig(ref_id:number){
    try{
     let config = await this.configService.getConfig(ref_id);
     return config;
    }catch(err){
        console.log("err",err)
        return err;
    }
  }

  @MessagePattern({cmd:'addConfig'})
  async addConfig(body:any){
    try{
      console.log("bodymp",body)
      let config = await this.configService.addConfig(body)
      return config;

    }catch(err){
      console.log("err",err)
      return err;
    }
  }

  @MessagePattern({cmd:'updateConfig'})
  async updateConfig(data:{body:any,id:number}){
    try{
     const {body,id}=data
     let config = await this.configService.updateConfig(body,id)
     return config;
    }catch(err){
      console.log("err",err)
      return err;
    }
  }

  @MessagePattern({cmd:'deleteConfig'})
  async deleteConfig(id:number){
    try{
      let config = await this.configService.deleteConfig(id)
      return config;

    }catch(err){
      console.log("err",err)
      return err
    }
  }
}