import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { StateService } from './state.service';

@Controller()
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @MessagePattern({ cmd: 'getStates' })
  async getStates() {
    try {
      const state = await this.stateService.getStates();
      //console.log("state",state)
      return state;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @MessagePattern({cmd:'getStateById'})
  async getStateById(ref_id:number){
    try{
     let state = await this.stateService.getStateById(ref_id);
     return state;
    }catch(err){
        return err;

    }
  }

  @MessagePattern({ cmd: 'addState' })
  async addState(data: { name: string; url: string; sid: number }) {
    try {
      const { name, url, sid } = data;
      let state = await this.stateService.addState(name, url, sid);
      return state;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @MessagePattern({ cmd: 'updateState' })
  async updateState(data:{body: any,id:number}) {
    try {
      const{body,id}=data
      let state = await this.stateService.updateState(body,id);
      console.log("state",state)
      return state;
    } catch (err) {
      // console.log(err)
      return err;
    }
  }

  @MessagePattern({cmd:'deleteState'})
  async deleteState(ref_id:number){
    try{
     let  resp = await this.stateService.deleteState(ref_id)
     return resp
    }catch(err){
     console.log("mp",err)
     return err;
    }
  }

}
