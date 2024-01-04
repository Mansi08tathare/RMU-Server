import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PumpCodeService {
  constructor(
    @Inject('DEVICE_SERVICE')
    private readonly deviceProxy: ClientProxy,
  ) {}

  async getPumpCode() {
    try {
      let resp = await this.deviceProxy.send({ cmd: 'getPumpCode' }, '').toPromise()
      return resp;
    } catch (err) {
        return err;
    }
  }

  async getPumpCodeById(id:number){
    try{
        let resp = await this.deviceProxy.send({cmd:'getPumpCodeById'},id).toPromise()
        return resp
    }catch(err){
       return err;
    }
  }

  async addPumpCode(body:any){
    try{
      let resp = await this.deviceProxy.send({cmd:'addPumpCode'},body).toPromise()
      return resp;
    }catch(err){
      return err;
    }
  }

  async updatePumpCode(body: any, id: number) {
    try {
      let resp = await this.deviceProxy
        .send({ cmd: 'updatePumpCode' }, { body, id })
        .toPromise();
      return resp;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }
  async deletePumpCode(id:number){
    try{
        let resp = await this.deviceProxy.send({cmd:'deletePumpCode'},id).toPromise();
        return resp;

    }catch(err){
        console.log("err",err)
        return err
    }
  }
}
