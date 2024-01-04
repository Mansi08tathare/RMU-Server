import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProjectService {
  constructor(
    @Inject('DEVICE_SERVICE')
    private readonly deviceProxy: ClientProxy,
  ) {}

  async getProject() {
    try {
      let resp = await this.deviceProxy.send({ cmd: 'getProject' }, '').toPromise()
      return resp;
    } catch (err) {
        return err;
    }
  }

  async getProjectById(id:number){
    try{
        let resp = await this.deviceProxy.send({cmd:'getProjectById'},id).toPromise()
        return resp
    }catch(err){
       return err;
    }
  }

  async addProject(body:any){
    try{
      let resp = await this.deviceProxy.send({cmd:'addProject'},body).toPromise()
      return resp;
    }catch(err){
      return err;
    }
  }

  async updateProject(body: any, id: number) {
    try {
      let resp = await this.deviceProxy
        .send({ cmd: 'updateProject' }, { body, id })
        .toPromise();
      return resp;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }
  async deleteProject(id:number){
    try{
        let resp = await this.deviceProxy.send({cmd:'deleteProject'},id).toPromise();
        return resp;

    }catch(err){
        console.log("err",err)
        return err
    }
  }
}
