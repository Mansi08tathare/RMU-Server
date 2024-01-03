import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AgencyMasterService {
  constructor(
    @Inject('DEVICE_SERVICE')
    private readonly deviceProxy: ClientProxy,
  ) {}

  async getAgencys() {
    try {
      let resp = await this.deviceProxy
        .send({ cmd: 'getAgencys' }, '')
        .toPromise();
      return resp;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }

  async getAgency(id: number) {
    try {
      let resp = await this.deviceProxy
        .send({ cmd: 'getAgency' }, id)
        .toPromise();
      return resp;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }

  async addAgency(body: any) {
    try {
      let resp = await this.deviceProxy
        .send({ cmd: 'addAgency' }, body)
        .toPromise();
      return resp;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }

  async updateAgency(body: any, id: number) {
    try {
      let resp = await this.deviceProxy
        .send({ cmd: 'updateAgency' }, { body, id })
        .toPromise();
      return resp;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }

  async deleteAgency(id: number) {
    try {
      let resp = await this.deviceProxy
        .send({ cmd: 'deleteAgency' }, id)
        .toPromise();
      return resp;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }


}
