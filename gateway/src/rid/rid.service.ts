import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';


@Injectable()
export class RidService {
  constructor(
    @Inject('DEVICE_SERVICE') private readonly deviceProxy: ClientProxy,
  ) {
    //this.getallRids()
  }

  async addRID(rid: string, CONT_MFR: string) {
    try {
      const resp = await this.deviceProxy
        .send({ cmd: 'addRID' }, { rid, CONT_MFR })
        .toPromise();
      return resp;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getConfig(rid_ref_id: number) {
    try {
      console.log('gws', rid_ref_id);
      const resp = await this.deviceProxy
        .send({ cmd: 'checkConfig' }, { rid_ref_id })
        .toPromise();
      return resp;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getRIDByRefID(id: number) {
    try {
      console.log('getbyid-id', id);
      const resp = await this.deviceProxy
        .send({ cmd: 'getRIDByRefID' }, id)
        .toPromise();
      return resp;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async deleteRid(id: number) {
    try {
      const resp = await this.deviceProxy
        .send({ cmd: 'deleteRid' }, id)
        .toPromise();
      return resp;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async updateRid(params: any, id: any) {
    try {
      const resp = await this.deviceProxy
        .send({ cmd: 'updateRid' }, { params, id })
        .toPromise();
      return resp;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getallRids() {
    try {
      const resp = await this.deviceProxy
        .send({ cmd:'getallRids'},"")
        .toPromise();

      console.log('resp', resp);
       return resp;
      
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
