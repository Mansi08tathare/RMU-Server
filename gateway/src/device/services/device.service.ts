import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { cDevice } from '../interfaces/device.interface';

@Injectable()
export class DeviceService {
  constructor(
    @Inject('DEVICE_SERVICE') private readonly deviceProxy: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async registerDevice(configD: cDevice): Promise<any> {
    try {
      const device = await this.deviceProxy
        .send({ cmd: 'registerDevice' }, configD)
        .toPromise();
      return device;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getDevice(channel: string): Promise<any> {
    console.log('service', channel);
  }

  async getRegisteredDevice(limit: number, offset: number): Promise<any> {
    try {
      const device = await this.deviceProxy
        .send({ cmd: 'getRegisteredDevice' }, { limit, offset })
        .toPromise();
      console.log('device gateway', device);
      return device;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getRegDeviceById(ref_id: number): Promise<any> {
    try {
      const device = await this.deviceProxy
        .send({ cmd: 'getRegDeviceById' }, ref_id)
        .toPromise();
      console.log('gw', device);
      return device;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getRegDeviceByImei(imei: number): Promise<any> {
    try {
      const device = await this.deviceProxy
        .send({ cmd: 'getRegDeviceByImei' }, imei)
        .toPromise();
      console.log('deviceByImei', device);
      return device;
    } catch (err) {
      console.log(err);
      return err;
    }
  }


  async updateRegisteredDevices(params:any,id:number):Promise<any>{
    try{
      const device = await this.deviceProxy.send({cmd:'updateDevice'},{params,id}).toPromise();
      console.log("updateDevice",device);
      
      return device;

    }catch(err){
      console.log(err);
      return err;
    }
  }


  async deleteDevice(id:any):Promise<any>{
    try{
     const device = await this.deviceProxy.send({cmd:'deleteDevice'},id).toPromise();
     console.log("deleteDevice",device);
     return device;
    }catch(err){
     console.log(err);
     return err;
    }
  }

  // async reassignRID():Promise<any>{
  //   try{
  //    const device =await this.deviceProxy.send({cmd:'reassignRID'},{Number(param.rid),Number(param.id)}).toPromise();
  //    return device;
  //   }catch(err){
  //     console.log(err)
  //     return err;
  //   }
  // }
  async reassignRID(  rid: number, id: number ): Promise<any> {
  try {
    const device = await this.deviceProxy.send({ cmd: 'reassignRID'}, {rid,id }).toPromise();
    return device;
  } catch (err) {
    console.log(err);
    return err;
  }
}


  }

