import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class StateService {
  constructor(
    @Inject('DEVICE_SERVICE')
    private readonly deviceProxy: ClientProxy,
  ) {}

  async getStates() {
    try {
      let resp = await this.deviceProxy
        .send({ cmd: 'getStates' }, '')
        .toPromise();
      return resp;
    } catch (err) {
      //  console.log(err)
      return err;
    }
  }

  async getStateByID(ref_id:number){
    try{
        let resp = await this.deviceProxy.send({cmd:'getStateById'},ref_id).toPromise()
        return resp;
    }catch(err){
        console.log(err)
        return err;
    }
  }

  async addState(name: string, url: string, sid: number) {
    try {
      let state = await this.deviceProxy
        .send({ cmd: 'addState' }, { name, url, sid })
        .toPromise();
      return state;
    } catch (err) {
      //  console.log(err)
      return err;
    }
  }

  async updateState(body: any) {
    try {
      let state = await this.deviceProxy
        .send({ cmd: 'updateState' }, body)
        .toPromise();
      return state;
    } catch (err) {
      //  console.log(err)
      return err;
    }
  }

  async deleteState(ref_id:number){
    try{
     let state = await this.deviceProxy
     .send({cmd:'deleteState'},ref_id).toPromise()
     return state;
    }catch(err){
        console.log(err)
        return err;
    }
  }
}
