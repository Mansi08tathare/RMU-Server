import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class SolarPumpService {
  constructor(
    @Inject('DEVICE_SERVICE')
    private readonly deviceProxy: ClientProxy,
  ) {}

  async getSolarPump() {
    try {
      let resp = await this.deviceProxy.send({ cmd: 'getSolarPump' }, '').toPromise()
      return resp;
    } catch (err) {
        return err;
    }
  }

  async getSolarPumpById(id:number){
    try{
        let resp = await this.deviceProxy.send({cmd:'getSolarPumpById'},id).toPromise()
        return resp
    }catch(err){
       return err;
    }
  }

  async addSolarPump(body:any){
    try{
        console.log("gw",body)
      let resp = await this.deviceProxy.send({cmd:'addSolarPump'},body).toPromise()
      return resp;
    }catch(err){
        console.log("gw",err)
      return err;
    }
  }

  async updateSolarPump(body: any, id: number) {
    try {
      let resp = await this.deviceProxy
        .send({ cmd: 'updateSolarPump' }, { body, id })
        .toPromise();
      return resp;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }
  async deleteSolarPump(id:number){
    try{
        let resp = await this.deviceProxy.send({cmd:'deleteSolarPump'},id).toPromise();
        return resp;

    }catch(err){
        console.log("err",err)
        return err
    }
  }
}
