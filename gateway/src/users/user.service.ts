import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class UserService {
    constructor(
        @Inject('DEVICE_SERVICE')
        private readonly deviceProxy: ClientProxy
    ) { }


    async addUser(body: any) {
        try {
            let resp = await this.deviceProxy.send({ cmd: 'addUser' }, body).toPromise()
            return resp;
        } catch (err) {
            console.log("err", err)
            return err;
        }
    }

    async getUser(){
        try{
         let resp = await this.deviceProxy.send({cmd:'getUser'},'').toPromise()
         return resp;
        }catch(err){
          console.log("err",err)
          return err;
        }
    }

    async getUserById(id:number){
        try{
         let resp = await this.deviceProxy.send({cmd:'getUserById'},id).toPromise()
         return resp
        }catch(err){
            console.log("err",err)
            return err;
        }
    }
}