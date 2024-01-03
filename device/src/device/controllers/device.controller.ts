import { Body, Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { cDevice } from 'src/device/interfaces/device.interface';
import { DeviceService } from 'src/device/services/device.service';

@Controller()
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @MessagePattern({ cmd: 'registerDevice' })
  async registerDevice(@Body() configD: cDevice): Promise<any> {
    try {
      const device = await this.deviceService.registerDevice(configD);
      console.log('dc', device);
      return device;
    } catch (err) {
      console.log('dc', err);
      return err;
    }
  }

  @MessagePattern({ cmd: 'getRegisteredDevice' })
  async getRegisteredDevice(data: { limit: number; offset: number }) {
    try {
      const { limit, offset } = data;
      const device = await this.deviceService.getRegisteredDevice(
        limit,
        offset,
      );
      console.log('getDevice', device);
      return device;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @MessagePattern({ cmd: 'getRegDeviceById' })
  async getRegDeviceById(ref_id: number) {
    try {
      console.log('ref_id', ref_id);
      const device = await this.deviceService.getRegDeviceById(ref_id);
      console.log('devicById', device);
      return device;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @MessagePattern({ cmd: 'getRegDeviceByImei' })
  async getRegDeviceByImei(imei: number) {
    try {
      console.log('imei', imei);
      const device = await this.deviceService.getRegDeviceByImei(imei);
      console.log('deviceByImei', device);
      return device;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @MessagePattern({ cmd: 'updateDevice' })
  async updateDevice(data: { id: number; params: any }) {
    try {
      console.log("update-id",data.id)
      const { id, params } = data;
      console.log("mp",id,params)
      const device = await this.deviceService.updateRegisteredDevice(
        id,
        params,
      );
      console.log('updateDevice',device);
      return device;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @MessagePattern({cmd:'deleteDevice'})
  async deleteDevice(id:any){
    try{
     console.log("delete-id",id)
     const device = await this.deviceService.deleteDevice(id);
     console.log("device",device) 
     return device;
    }catch(err){
     console.log(err);
     return err;
    }
  }

  
  @MessagePattern({cmd:'reassignRID'})
  async reassignRID(data:{rid:number,id:number}){
    try{
      const{rid,id}=data
      console.log("type",typeof rid)
     console.log("data",data)
     const device = await this.deviceService.reassignRID(rid,id)
     return device
    }catch(err){
     console.log(err)
     return err;
    }
  }


 
}