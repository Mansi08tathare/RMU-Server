import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ControllerMasterService } from './controller.service';
import { CONSTANT_MSG } from 'src/common-dto/const';
import { ApiTags, ApiResponse, ApiParam, ApiOperation, ApiBody } from '@nestjs/swagger';
import { controllerDto } from './dtos/controller.dto';
import { updateControllerDto } from './dtos/updateController';

@Controller('controller')
@ApiTags('ControllerMaster')
export class ControllerMasterController {
  constructor(
    private readonly controllerMasterService: ControllerMasterService,
  ) {}

  @Get('')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All controllers retrieved successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async getControllers(@Res() res: any) {
    try {
      let resp = await this.controllerMasterService.getControllers();

      if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.OK) {
        res
          .status(resp.statusCode)
          .send({ status:resp.statusCode,message: resp.message, data: resp.data });
      } else {
        res.status(resp.statusCode).send({ status:resp.statusCode,error: resp.message });
      }
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }

  @Get('/:id')
  @ApiParam({ name: 'id', description: 'ID of the controller' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Controller retrieved successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async getController(@Res() res: any, @Param('id') id: number) {
    try {
      console.log('enter in id');
      let resp = await this.controllerMasterService.getController(id);
      console.log('response', resp);
      if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.OK) {
        res
          .status(resp.statusCode)
          .send({status:resp.statusCode, message: resp.message, data: resp.data });
      } else {
        res.status(resp.statusCode).send({ status:resp.statusCode,error: resp.message });
      }
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }

  @Post('')
  @ApiOperation({ summary: 'Add a new controller' })
  @ApiBody({type:controllerDto})
  async addController(@Res() res: any, @Body() body: controllerDto) {
    try {
      let resp = await this.controllerMasterService.addController(body);
      if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.CREATED) {
        res.status(resp.statusCode).send({ status:resp.statusCode,message: resp.message });
      } else {
        res.status(resp.statusCode).send({ status:resp.statusCode,error: resp.message });
      }
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }

  @Put('/:id')
  @ApiBody({type:updateControllerDto})
  @ApiOperation({ summary: 'Update a controller by ID' })
  async updateController(@Body() body:updateControllerDto,@Res() res:any,@Param('id') id:number){
    try{
      console.log(body,id)
      let resp = await this.controllerMasterService.updateController(body,id)
      if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.ACCEPTED) {
        res.status(resp.statusCode).send({ status:resp.statusCode,message: resp.message });
      } else {
        res.status(resp.statusCode).send({status:resp.statusCode, error: resp.message });
      }

    }catch{
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      }); 
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a controller by ID' })
  async deleteController(@Param('id') id:number,@Res()  res:any){
    try{
      let resp = await this.controllerMasterService.deleteController(id)
      if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.NO_CONTENT) {
        res.status(resp.statusCode).send({status:resp.statusCode, message: resp.message });
      } else {
        res.status(resp.statusCode).send({ status:resp.statusCode,error: resp.message });
      }
    }catch(err){
      console.log("err",err)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      }); 
      
    }
  }
}
