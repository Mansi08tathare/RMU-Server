import { Body,Controller,Delete,Get,HttpStatus,Param,Post,Put,Req,Res,} from '@nestjs/common';
import { AgencyMasterService } from './agency.service';
import { CONSTANT_MSG } from 'src/common-dto/const';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@Controller('agency')
@ApiTags('Agency') 
export class AgencyMasterController {
  constructor(private readonly agencyMasterService: AgencyMasterService) {}

  @Get('')
  @ApiResponse({ status: HttpStatus.OK, description: 'All agencies retrieved successfully' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
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
  @ApiParam({ name: 'id', description: 'ID of the agency' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Agency retrieved successfully' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
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
 // @ApiBody({ type: YourDtoClass }) // Replace YourDtoClass with your actual DTO class
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Agency added successfully' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
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
  @ApiParam({ name: 'id', description: 'ID of the agency to update' })
 // @ApiBody({ type: YourDtoClass }) // Replace YourDtoClass with your actual DTO class
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Agency updated successfully' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
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
  @ApiParam({ name: 'id', description: 'ID of the agency to delete' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Agency deleted successfully' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
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
