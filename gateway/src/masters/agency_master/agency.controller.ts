import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { AgencyMasterService } from './agency.service';
import { CONSTANT_MSG } from 'src/common-dto/const';

@Controller('agency')
export class AgencyMasterController {
  constructor(private readonly agencyMasterService: AgencyMasterService) {}

  @Get('')
  async getAgencys(@Res() res: any, @Req() req: any) {
    try {
      let resp = await this.agencyMasterService.getAgencys();
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
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }

  @Get('/:id')
  async getAgency(@Res() res: any, @Param('id') id: any) {
    try {
      let resp = await this.agencyMasterService.getAgency(id);
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
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }

  @Post('')
  async addAgency(@Body() body: any, @Res() res: any) {
    try {
      let resp = await this.agencyMasterService.addAgency(body);

      if (resp.code === 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.CREATED) {
        res.status(resp.statusCode).send({ success: resp.message });
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

  @Put('/:id')
  async updateAgency(@Res() res: any, @Body() body: any, @Param('id') id: any) {
    try {
      let resp = await this.agencyMasterService.updateAgency(body, id);
      if (resp.code === 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.ACCEPTED) {
        res.status(resp.statusCode).send({ success: resp.message });
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

  @Delete('/:id')
  async deleteAgency(@Res() res: any, @Param('id') id: number) {
    try {
      let resp = await this.agencyMasterService.deleteAgency(id);
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
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }
}
