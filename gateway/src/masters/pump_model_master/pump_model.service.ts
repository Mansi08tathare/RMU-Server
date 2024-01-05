import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PumpModelService {
  constructor(
    @Inject('DEVICE_SERVICE')
    private readonly deviceProxy: ClientProxy,
  ) {}

  async getPumpModel() {
    try {
      let resp = await this.deviceProxy.send({ cmd: 'getPumpModel' }, '').toPromise()
      return resp;
    } catch (err) {
        return err;
    }
  }

  async getPumpModelById(id:number){
    try{
        let resp = await this.deviceProxy.send({cmd:'getPumpModelById'},id).toPromise()
        return resp
    }catch(err){
       return err;
    }
  }

  async addPumpModel(body:any){
    try{
        console.log("gw",body)
      let resp = await this.deviceProxy.send({cmd:'addPumpModel'},body).toPromise()
      return resp;
    }catch(err){
        console.log("gw",err)
      return err;
    }
  }

  async updatePumpModel(body: any, id: number) {
    try {
      let resp = await this.deviceProxy
        .send({ cmd: 'updatePumpModel' }, { body, id })
        .toPromise();
      return resp;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }
  async deletePumpModel(id:number){
    try{
        let resp = await this.deviceProxy.send({cmd:'deletePumpModel'},id).toPromise();
        return resp;

    }catch(err){
        console.log("err",err)
        return err
    }
  }
}
