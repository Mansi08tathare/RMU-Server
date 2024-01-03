import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  Put,
  Delete,
  Req,
} from '@nestjs/common';

import { CONSTANT_MSG } from 'src/common-dto/const';
import { VendorService } from './vendor.service';

@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Get('')
  async getVendors(@Res() res: any) {
    try {
      let resp = await this.vendorService.getVendors();
      console.log('resp', resp);
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
  async getVendorById(@Res() res: any, @Param() param: any) {
    try {
      let ref_id = param.id;
      let resp = await this.vendorService.getVendorByID(ref_id);
      console.log('resp', resp);
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

  @Post('')
  async addVendor(@Res() res: any, @Body() body: any) {
    try {
      let resp = await this.vendorService.addVendor(body);
      if (resp.code == 'ECONNREFUSED') {
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

  @Put('')
  async updateVendor(@Res() res: any, @Body() body: any, @Param() param: any) {
    try {
      let resp = await this.vendorService.updateVendor(body);
      if (resp.code == 'ECONNREFUSED') {
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
  async deleteVendor(@Res() res: any,@Req() req:any ,@Param('id') id:any ) {
    try {
      let ref_id = id;
       console.log("ref_id",ref_id)
      let resp = await this.vendorService.deleteVendor(ref_id);
      if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.NO_CONTENT) {
        res.status(resp.statusCode).send({ success: resp.message });
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
}
