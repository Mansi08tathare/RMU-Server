import { Controller } from '@nestjs/common';
import { AgencyMasterService } from './agency.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AgencyMasterController {
  constructor(private readonly agencyMasterService: AgencyMasterService) {}

  @MessagePattern({ cmd: 'getAgencys' })
  async getAgencys() {
    try {
      let resp = await this.agencyMasterService.getAgencys();
      return resp;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }

  @MessagePattern({ cmd: 'getAgency' })
  async getAgency(id: number) {
    try {
      let resp = await this.agencyMasterService.getAgency(id);
      return resp;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }

  @MessagePattern({ cmd: 'addAgency' })
  async addAgency(body: any) {
    try {
      let resp = await this.agencyMasterService.addAgency(body);
      return resp;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }

  @MessagePattern({ cmd: 'updateAgency' })
  async updateAgency(data: { body: any; id: number }) {
    try {
      const { body, id } = data;
      let resp = await this.agencyMasterService.updateAgency(body, id);
      return resp;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }

  @MessagePattern({cmd:'deleteAgency'})
  async deleteAgency(id:number){
    try{
     let resp = await this.agencyMasterService.deleteAgency(id)
     return resp
    }catch(err){
        console.log("err",err)
        return err
    }
  }
}
