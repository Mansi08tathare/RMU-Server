import {Body,Controller,Delete,Get,HttpStatus,Param, Post,Put,Req,Res} from '@nestjs/common';
import { StateService } from './state.service';
import { CONSTANT_MSG } from 'src/common-dto/const';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get('')
  async getStates(@Req() req: any, @Res() res: any) {
    try {
      //console.log("enter in state")
      let resp = await this.stateService.getStates();
      if (resp.code === 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.OK) {
        res
          .status(resp.statusCode)
          .send({ success: resp.message, data: resp.data });
      } else {
        res.status(resp.statusCode).send({ error: resp.message });
      }
      //res.status(resp.statusCode).send(resp.data)
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }

  @Get('/:id')
  async getStateByID(@Res() res:any,@Req() req:any,@Param() param:any){
    try{
        let ref_id=param.id;
      let resp = await this.stateService.getStateByID(ref_id);
      if (resp.code === 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.OK) {
        res
          .status(resp.statusCode)
          .send({ success: resp.message, data: resp.data });
      } else {
        res.status(resp.statusCode).send({ error: resp.message });
      }
      
    }catch(error){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
            statusCode: false,
          });

    }
  }
  //if in state want to add body then dto needed
  @Post('')
  async addState(@Req() req: any, @Res() res: any) {
    try {
      const { name, url, sid } = req.body;
      let resp = await this.stateService.addState(name, url, sid);
      console.log("resp",resp)
      if (resp.code === 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.CREATED) {
        res.status(resp.statusCode).send({ success: resp.message });
      } else {
        res.status(resp.statusCode).send({ error: resp.message });
      }
      //res.status(resp.statusCode).send(resp.data)
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }

  @Put('')
  async updateState(@Body() body: any, @Res() res: any) {
    try {
      let resp = await this.stateService.updateState(body);
      console.log('state', resp);
      if (resp.code === 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.NO_CONTENT) {
        res.status(resp.statusCode).send({ success: resp.message });
      } else {
        res.status(resp.statusCode).send({ error: resp.message });
      }
    } catch (err) {
      console.log(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }

 
  @Delete('/:id')
  async deleteState(@Param() param:any,@Res() res:any,@Req() req:any){
    try{
      let ref_id=param.id;
     let resp = await this.stateService.deleteState(ref_id)
     if(resp.code === 'ECONNREFUSED'){
        res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({error:'Device Microservice ECONNREFUSED'})
     }else if(resp.statusCode === HttpStatus.NO_CONTENT){
        res
        .status(resp.statusCode)
        .send({success:resp.message})
     }else{
        res.status(resp.statusCode).send({error:resp.message})
     }
    }catch(err){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            message:CONSTANT_MSG.INTERNAL_SERVER_ERR,
            statusCode:false,
        })
        
    }
  }

}
