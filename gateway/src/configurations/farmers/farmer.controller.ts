import { Body,Controller,Delete,Get,HttpStatus,Param,Post,Put,Res,
} from '@nestjs/common';
import { FarmerService } from './farmer.service';
import { CONSTANT_MSG } from 'src/common-dto/const';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectDetailsDTO } from './farmer.dto';


@ApiTags('farmer')
@Controller('farmer')
export class FarmerController {
  constructor(private readonly farmerService: FarmerService) {}

  @Post('')
  @ApiBody({type:ProjectDetailsDTO})
  @ApiOperation({ summary: 'Add a new project detail' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Successfully added a new project detail' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  async addFarmer(@Res() res: any, @Body() body: any) {
    try {
      let resp = await this.farmerService.addFarmer(body);
      console.log('resp', resp);
      if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.CREATED) {
        res.status(resp.statusCode).send({status:resp.statusCode, message: resp.message });
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

  @Get('')
  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Successfully retrieved projects' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  async getProject(@Res() res: any) {
    try {
      let resp = await this.farmerService.getProject();
      if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.OK) {
        res
          .status(resp.statusCode)
          .send({status:resp.statusCode, message: resp.message, data: resp.data });
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

  @Get('/:id')
  @ApiOperation({ summary: 'Get project by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Successfully retrieved project by ID' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  async getProjectById(@Res() res: any, @Param('id') id: number) {
    try {
      let resp = await this.farmerService.getProjectById(id);

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

  @Put('/:id')
  @ApiOperation({ summary: 'Update project by ID' })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Successfully updated project by ID' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  async updateProject(@Res() res:any,@Param('id') id:any ,@Body() body:any){
    try{
     let resp = await this.farmerService.updateProject(id,body)
     if (resp.code == 'ECONNREFUSED') {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: 'Device Microservice ECONNREFUSED' });
    } else if (resp.statusCode === HttpStatus.ACCEPTED) {
      res
        .status(resp.statusCode)
        .send({status:resp.statusCode, message: resp.message, data: resp.data });
    } else {
      res.status(resp.statusCode).send({ status:resp.statusCode,error: resp.message });
    }
    }catch(err){
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete project by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Successfully deleted project by ID' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  async deleteProjectDetails(@Res() res:any,@Param('id') id:number){
    try{
      console.log("id",id)

      let resp = await this.farmerService.deleteProjectDetails(id)
      console.log("resp",resp)
      if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.OK) {
        res
          .status(resp.statusCode)
          .send({status:resp.statusCode, message: resp.message});
      } else {
        res.status(resp.statusCode).send({ status:resp.statusCode,error: resp.message });
      }

    }catch(err){
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }
}
