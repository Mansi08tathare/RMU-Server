import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PumpSiteService {
  constructor(
    @Inject('DEVICE_SERVICE')
    private readonly deviceProxy: ClientProxy,
  ) {}

  async addPumpSite(body: any) {
    try {
      let resp = await this.deviceProxy
        .send({ cmd: 'addPumpSite' }, body)
        .toPromise();
      return resp;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }

  async getPumpSite() {
    try {
      let resp = await this.deviceProxy
        .send({ cmd: 'getPumpSite' }, '')
        .toPromise();
      return resp;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }

  async getPumpSiteById(id:number){
    try{
     let resp = await this.deviceProxy.send({cmd:'getPumpSiteById'},id).toPromise();
     return resp;
    }catch(err){
      console.log("err",err)
      return err;
    }
  }

  async updatePumpSite(id:number,body:any){
    try{
      let resp = await this.deviceProxy.send({cmd:'updatePumpSite'},{id,body}).toPromise()
      return resp
    }catch(err){
      console.log("err",err)
      return err;
    }
  }

  async DeletePumpSite(id:number){
    try{
        console.log("id",id)
      let resp = await this.deviceProxy.send({cmd:'deletePumpSite'},id).toPromise()
      return resp
    }catch(err){
        console.log("err",err)
        return err;
    }
  }
}
