import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MotorService {
  constructor(
    @Inject('DEVICE_SERVICE')
    private readonly deviceProxy: ClientProxy,
  ) {}

  async getAllMotor() {
    try {
      let resp = await this.deviceProxy
        .send({ cmd: 'getMotors' }, '')
        .toPromise();
      return resp;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }

  async getMotor(id: number) {
    try {
      let resp = await this.deviceProxy
        .send({ cmd: 'getMotor' }, id)
        .toPromise();
      return resp;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }

  async addMotor(body: any) {
    try {
      let resp = await this.deviceProxy
        .send({ cmd: 'addMotor' }, body)
        .toPromise();
      return resp;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }

  async updateMotor(body: any, id: number) {
    try {
      let resp = await this.deviceProxy
        .send({ cmd: 'updateMotor' }, { body, id })
        .toPromise();
      return resp;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }

  async deleteMotor(id:number){
    try{
        let resp = await this.deviceProxy.send({cmd:'deleteMotor'},id).toPromise();
        return resp;

    }catch(err){
        console.log("err",err)
        return err
    }
  }
}
