import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PumpHeadService {
  constructor(
    @Inject('DEVICE_SERVICE')
    private readonly deviceProxy: ClientProxy,
  ) {}

  async getPumpHead() {
    try {
      let resp = await this.deviceProxy.send({ cmd: 'getPumpHead' }, '').toPromise()
      return resp;
    } catch (err) {
        return err;
    }
  }

  async getPumpHeadById(id:number){
    try{
        let resp = await this.deviceProxy.send({cmd:'getPumpHeadById'},id).toPromise()
        return resp
    }catch(err){
       return err;
    }
  }

  async addPumpHead(body:any){
    try{
      let resp = await this.deviceProxy.send({cmd:'addPumpHead'},body).toPromise()
      return resp;
    }catch(err){
      return err;
    }
  }

  async updatePumpHead(body: any, id: number) {
    try {
      let resp = await this.deviceProxy
        .send({ cmd: 'updatePumpHead' }, { body, id })
        .toPromise();
      return resp;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }
  async deletePumpHead(id:number){
    try{
        let resp = await this.deviceProxy.send({cmd:'deletePumpHead'},id).toPromise();
        return resp;

    }catch(err){
        console.log("err",err)
        return err
    }
  }
}
