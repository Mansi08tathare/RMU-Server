import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OemService {
  constructor(
    @Inject('DEVICE_SERVICE')
    private readonly deviceProxy: ClientProxy,
  ) {}

  async getOem() {
    try {
      let resp = await this.deviceProxy.send({ cmd: 'getOem' }, '').toPromise()
      return resp;
    } catch (err) {
        return err;
    }
  }

  async getOemById(id:number){
    try{
        let resp = await this.deviceProxy.send({cmd:'getOemById'},id).toPromise()
        return resp
    }catch(err){
       return err;
    }
  }

  async addOem(body:any){
    try{
      let resp = await this.deviceProxy.send({cmd:'addOem'},body).toPromise()
      return resp;
    }catch(err){
      return err;
    }
  }

  async updateOem(body: any, id: number) {
    try {
      let resp = await this.deviceProxy
        .send({ cmd: 'updateOem' }, { body, id })
        .toPromise();
      return resp;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }
  async deleteOem(id:number){
    try{
        let resp = await this.deviceProxy.send({cmd:'deleteOem'},id).toPromise();
        return resp;

    }catch(err){
        console.log("err",err)
        return err
    }
  }
}
