import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class VendorService {
  constructor(
    @Inject('DEVICE_SERVICE')
    private readonly deviceProxy: ClientProxy,
  ) {
    //this.getVendors()
  }

  async getVendors() {
    try {
      console.log('enter');
      let resp = await this.deviceProxy
        .send({ cmd: 'getVendors' }, '')
        .toPromise();
      console.log('resps', resp);
      return resp;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getVendorByID(ref_id: number) {
    try {
      let resp = await this.deviceProxy
        .send({ cmd: 'getVendorByID' }, ref_id)
        .toPromise();
      return resp;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async addVendor(body: any) {
    try {
      let resp = await this.deviceProxy
        .send({ cmd: 'addVendor' }, body)
        .toPromise();
      return resp;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async updateVendor(body: any) {
    try {
      let resp = await this.deviceProxy
        .send({ cmd: 'updateVendor' }, body)
        .toPromise();
      return resp;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async deleteVendor(ref_id: number) {
    try {
      let resp = await this.deviceProxy
        .send({ cmd: 'deleteVendor' }, ref_id)
        .toPromise();
      return resp;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
