import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ControllerMasterService {
  constructor(
    @Inject('DEVICE_SERVICE')
    private readonly deviceProxy: ClientProxy,
  ) {}

  async getControllers() {
    try {
      let resp = await this.deviceProxy
        .send({ cmd: 'getControllers' }, '')
        .toPromise();
      // console.log("resp",resp)
      return resp;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }

  async getController(id: number) {
    try {
      console.log('enter in gw service');
      let resp = await this.deviceProxy
        .send({ cmd: 'getController' }, id)
        .toPromise();
      return resp;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }

  async addController(body: any) {
    try {
      let resp = await this.deviceProxy
        .send({ cmd: 'addController' }, body)
        .toPromise();
      return resp;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }

  async updateController(body: any,id:number) {
    try {
      console.log("enter device microservice")
      console.log(body,id)
      let resp = await this.deviceProxy.send({ cmd: 'updateController' }, {body,id}).toPromise()
      return resp;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }

  async deleteController(id:number){
    try{
    let resp = await this.deviceProxy.send({cmd:'deleteController'},id).toPromise()
    return resp;
    }catch(err){
      console.log("err",err)
      return err;
    }
  }
}
