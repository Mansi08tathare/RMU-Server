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
import { MotorService } from './motor.service';
import { CONSTANT_MSG } from 'src/common-dto/const';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MotorDto } from './dtos/motor.dto';
import { updateMotorDto } from './dtos/updateMotor.dto';

@ApiTags('Motor')
@Controller('motor')
export class MotorController {
  constructor(private motorService: MotorService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all motors' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All motors retrieved successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async getAllMotor(@Res() res: any) {
    try {
      let resp = await this.motorService.getAllMotor();
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

  @Get('/:id')
  @ApiOperation({ summary: 'Get a motor by ID' })
  @ApiParam({ name: 'id', description: 'ID of the motor' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Motor retrieved successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async getMotor(@Res() res: any, @Param('id') id: number) {
    try {
      let resp = await this.motorService.getMotor(id);
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

  @Post('')
  @ApiBody({type:MotorDto})
  @ApiOperation({ summary: 'Add a new motor' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Motor added successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async addMotor(@Res() res: any, @Body() body: any) {
    try {
      let resp = await this.motorService.addMotor(body);
      if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.CREATED) {
        res.status(resp.statusCode).send({status:resp.statusCode, message: resp.message });
      } else {
        res.status(resp.statusCode).send({status:resp.statusCode, error: resp.message });
      }
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }

  @Put('/:id')
  @ApiBody({type:updateMotorDto})
  @ApiOperation({ summary: 'Update a motor by ID' })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Motor updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async updateMotor(
    @Res() res: any,
    @Body() body: updateMotorDto,
    @Param('id') id: number,
  ) {
    try {
      let resp = await this.motorService.updateMotor(body, id);
      if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.ACCEPTED) {
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

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a motor by ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Motor deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async deleteMotor(@Param('id') id: number, @Res() res: any) {
    try {
      let resp = await this.motorService.deleteMotor(id);
      if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.NO_CONTENT) {
        res.status(resp.statusCode).send({status:resp.statusCode, message: resp.message });
      } else {
        res.status(resp.statusCode).send({status:resp.statusCode, error: resp.message });
      }
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }
}
