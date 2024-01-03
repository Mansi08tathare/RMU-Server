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
import { CONSTANT_MSG } from 'src/common-dto/const';
import { SimService } from './sim.service';

@Controller('sim')
export class SimController {
  constructor(private readonly simService: SimService) {}

  @Get('')
  async getSims(@Res() res: any) {
    try {
      let resp = await this.simService.getSims();
      if (resp.code == 'ECONNREFUSED') {
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
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }

  @Get('/:id')
  async getSim(@Res() res: any, @Param('id') id: number) {
    try {
      let resp = await this.simService.getSim(id);
      if (resp.code == 'ECONNREFUSED') {
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
    } catch (err) {
      console.log(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }

  @Post('')
  async addSim(@Res() res: any, @Body() body: any) {
    try {
      console.log("body",body)
      let resp = await this.simService.addSim(body);
      if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.CREATED) {
        res
          .status(resp.statusCode)
          .send({ success: resp.message});
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

  // @Put('/:id')
  // async updateSim(@Param('id') id:number,@Res() res: any, @Body() body: any) {
  @Put('/:id')
  async updateSim(@Param('id') id: number, @Res() res: any, @Body() body: any) {
    try {
      console.log('id', id);
      // let id=param.id
      
      const { simno, operator, mobileno, rid } = body;
      let resp = await this.simService.updateSim(
        simno,
        operator,
        mobileno,
    
        id,
        rid
      );
      if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.OK) {
        res
          .status(resp.statusCode)
          .send({ success: resp.message });
      } else {
        res.status(resp.statusCode).send({ error: resp.message });
      }
    } catch (err) {
      console.log('err', err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }

  @Delete('/:id')
  async deleteSim(@Param('id') id:number,@Res() res:any){
    try{
      console.log("id",id)

      let resp = await this.simService.deleteSim(id)
      if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.OK) {
        res
          .status(resp.statusCode)
          .send({ success: resp.message});
      } else {
        res.status(resp.statusCode).send({ error: resp.message });
      }

    }catch(err){
      console.log('err', err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }
}
