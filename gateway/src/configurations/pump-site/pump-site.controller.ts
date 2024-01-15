import { Body,Controller,Delete,Get,HttpStatus,Param,Post,Put,Res,
} from '@nestjs/common';
import { CONSTANT_MSG } from 'src/common-dto/const';
import { PumpSiteService } from './pump-site.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PumpSiteDTO } from './pump-site.dto';

@ApiTags('pump_site')
@Controller('pump_site')
export class PumpSiteController {
  constructor(private readonly pumpSiteService: PumpSiteService) {}


 @Post('')
 @ApiBody({type:PumpSiteDTO})
 @ApiOperation({ summary: 'Add a new pump site' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Successfully added a new pump site' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
 async addPumpSite(@Res() res:any,@Body() body:any){
    try{
      let resp = await this.pumpSiteService.addPumpSite(body)
      if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.CREATED) {
        res.status(resp.statusCode).send({ status:resp.statusCode,message: resp.message });
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

 @Get('')
 @ApiOperation({ summary: 'Get all pump sites' })
 @ApiResponse({ status: HttpStatus.OK, description: 'Successfully retrieved pump sites' })
 @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
 async getPumpsite(@Res() res:any){
    try{
         let resp = await this.pumpSiteService.getPumpSite()
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
    }catch(err){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
            statusCode: false,
          });

    }
 }

 @Get('/:id')
 @ApiOperation({ summary: 'Get pump site by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Successfully retrieved pump site by ID' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
 async getPumpSiteById(@Res() res:any,@Param('id') id:any){
    try{
    let resp = await this.pumpSiteService.getPumpSiteById(id)
    if (resp.code == 'ECONNREFUSED') {
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
    }catch(err){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
            statusCode: false,
          });
    }
 }


 @Put('/:id')
 @ApiOperation({ summary: 'Update pump site by ID' })
 @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Successfully updated pump site by ID' })
 @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
 async updatePumpSite(@Body() body:any,@Param('id')id:number,@Res() res:any){
    try{
     let resp = await this.pumpSiteService.updatePumpSite(id,body)
     if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.ACCEPTED) {
        res
          .status(resp.statusCode)
          .send({status:resp.statusCode, message: resp.message });
      } else {
        res.status(resp.statusCode).send({status:resp.statusCode, error: resp.message });
      }

    }catch(err){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
            statusCode: false,
          });
    }
 }

 @Delete('/:id')
 @ApiOperation({ summary: 'Delete pumpsite by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Successfully deleted pumpsite by ID' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
 async deletePumpsite(@Res() res:any,@Param('id') id:number){
    try{
        console.log("id",id)
     let resp = await this.pumpSiteService.DeletePumpSite(id)
     if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.ACCEPTED) {
        res
          .status(resp.statusCode)
          .send({ status:resp.statusCode,message: resp.message });
      } else {
        res.status(resp.statusCode).send({status:resp.statusCode, error: resp.message });
      }
    }catch(err){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
            statusCode: false,
          });
    }
 }
}