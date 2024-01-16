import {Body,Controller,Delete,Get,HttpStatus,Param, Post,Put,Req,Res} from '@nestjs/common';
import { StateService } from './state.service';
import { CONSTANT_MSG } from 'src/common-dto/const';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { StateDto } from './state.dto';
import { updateStateDto } from './updateState.dto';

@Controller('state')
@ApiTags('State')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get('')
  @ApiResponse({ status: HttpStatus.OK, description: 'All states retrieved successfully' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
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
          .send({ status:resp.statusCode,message: resp.message, data: resp.data });
      } else {
        res.status(resp.statusCode).send({status:resp.statusCode, error: resp.message });
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
  @ApiParam({ name: 'id', description: 'ID of the state' })
  @ApiResponse({ status: HttpStatus.OK, description: 'State retrieved successfully' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
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
          .send({ status:resp.statusCode,message: resp.message, data: resp.data });
      } else {
        res.status(resp.statusCode).send({status:resp.statusCode, error: resp.message });
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
 @ApiBody({ type: StateDto }) 
  @ApiResponse({ status: HttpStatus.CREATED, description: 'State added successfully' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  async addState(@Req() req: any, @Res() res: any,@Body() body:StateDto) {
    try {
      const { name, url, sid } = body;
      let resp = await this.stateService.addState(name, url, sid);
      console.log("resp",resp)
      if (resp.code === 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.CREATED) {
        res.status(resp.statusCode).send({  status:resp.statusCode,message: resp.message });
      } else {
        res.status(resp.statusCode).send({ status:resp.statusCode,error: resp.message });
      }
      //res.status(resp.statusCode).send(resp.data)
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }

  @Put('/:id')
  @ApiBody({ type: updateStateDto })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'State updated successfully' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  async updateState(@Body() body: updateStateDto, @Res() res: any,@Param('id') id:number) {
    try {
      let resp = await this.stateService.updateState(body,id);
      console.log('state', resp);
      if (resp.code === 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.ACCEPTED) {
        res.status(resp.statusCode).send({status:resp.statusCode, message: resp.message });
      } else {
        res.status(resp.statusCode).send({ status:resp.statusCode,error: resp.message });
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
  @ApiParam({ name: 'id', description: 'ID of the state to delete' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'State deleted successfully' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
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
        .send({status:resp.statusCode,success:resp.message})
     }else{
        res.status(resp.statusCode).send({status:resp.statusCode,error:resp.message})
     }
    }catch(err){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            message:CONSTANT_MSG.INTERNAL_SERVER_ERR,
            statusCode:false,
        })
        
    }
  }

}
