import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from "@nestjs/common";
import { ConfigService } from "./config.service";
import { CONSTANT_MSG } from "src/common-dto/const";
import { ApiTags, ApiResponse, ApiParam, ApiBody } from "@nestjs/swagger";

@Controller('config')
@ApiTags('Config')
export class ConfigController{
    constructor(
        private readonly configService:ConfigService
    ){ }

    @Get('')
    @ApiResponse({ status: HttpStatus.OK, description: 'All configs retrieved successfully' })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
    async getConfigs(@Res() res: any){
        try{
          console.log("get")
            let resp = await this.configService.getConfigs()
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

        }catch(err){
            console.log("err",err)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
                statusCode: false,
              });
            
        }
    }

    @Get('/:ref_id')
    @ApiParam({ name: 'ref_id', description: 'Reference ID of the config' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Config retrieved successfully' })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
    async getConfig(@Res() res:any,@Param('ref_id') ref_id:number){
      try{
        console.log("ref_id",ref_id)
      let resp = await this.configService.getConfig(ref_id)
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
      }catch(err){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
          statusCode: false,
        });
      

      }
    }

    @Post('')
   // @ApiBody({ type: YourDtoClass }) 
    @ApiResponse({ status: HttpStatus.OK, description: 'Config added successfully' })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
    async addConfig(@Req() req:any,@Res() res:any,@Body() body:any){
      try{
        console.log("gw",body)
      let resp = await this.configService.addConfig(body);
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
      
      }catch(err){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
          statusCode: false,
        });
      }
    }

    @Put('/:id')
    @ApiParam({ name: 'id', description: 'ID of the config' })
    //@ApiBody({ type: YourDtoClass }) 
    @ApiResponse({ status: HttpStatus.OK, description: 'Config updated successfully' })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
    async updateConfig(@Req() req:any,@Res() res:any,@Param('id') id:any,@Body() body:any){
      try{
       console.log("gw",body,id)
       let resp = await this.configService.updateConfig(body,id);
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
      }catch(err){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
          statusCode: false,
        });
      }
    }

    @Delete('/:id')
    @ApiParam({ name: 'id', description: 'ID of the config' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Config deleted successfully' })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
    async deleteConfig(@Req() req:any,@Res() res:any,@Param('id') id:any){
      try{
       console.log("id",id)
       let resp = await this.configService.deleteConfig(id);
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
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
          statusCode: false,
        });
      }
    }

}