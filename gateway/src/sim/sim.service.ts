import { Body, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class SimService {
  constructor(
    @Inject('DEVICE_SERVICE')
    private readonly deviceProxy: ClientProxy,
  ) {}

  async getSims() {
    try {
      let resp = await this.deviceProxy
        .send({ cmd: 'getSims' }, '')
        .toPromise();
      return resp;
    } catch (err) {
      return err;
    }
  }

  async getSim(id: number) {
    try {
      let resp = await this.deviceProxy.send({ cmd: 'getSim' }, id).toPromise();
      return resp;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }

  async addSim(body: any) {
    try {
      let resp = await this.deviceProxy
        .send({ cmd: 'addSim' }, { body })
        .toPromise();
      return resp;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }

  // async updateSim(body:any,id:number){
  // async updateSim(simno:number,operator:string,mobileno:number,rid?:number,id:number){
  async updateSim(
    simno: number,
    operator: string,
    mobileno: number,
    id: number,
    rid?: number,
  ) {
    try {
      console.log('id', id);
      console.log('rid', rid);
      let resp = await this.deviceProxy
        .send({ cmd: 'updateSim' }, { simno, operator, mobileno,id,rid })
        .toPromise();
      return resp;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }

  async deleteSim(id:number){
    try{
     let resp = await this.deviceProxy.send({cmd:'deleteSim'},id).toPromise()
     return resp;
    }catch(err){
        console.log("err",err);
        return err;
    }
  }
}
