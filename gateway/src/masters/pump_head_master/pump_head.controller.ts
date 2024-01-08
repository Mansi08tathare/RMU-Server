import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { PumpHeadService } from "./pump_head.service";
import { CONSTANT_MSG } from "src/common-dto/const";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from "@nestjs/swagger";
import { PumpHeadDto } from "./dtos/pumphead.dto";
import { UpdatProjectDto } from "../project_masters/dtos/updateProject.dto";

@ApiTags('PumpHead')
@Controller('pumpHead')
export class PumpHeadController{
    constructor(
        private readonly pumpHeadService:PumpHeadService
    ){}

    @Get('')
    @ApiOperation({ summary: 'Get all pump heads' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'All pump heads retrieved successfully',
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
    })
    async getPumpHead(@Res() res:any){
        try{
            
         let resp = await this.pumpHeadService.getPumpHead()
        //  console.log("resp",resp)
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

    @Get('/:id')
    @ApiOperation({ summary: 'Get a pump head by ID' })
    @ApiParam({ name: 'id', description: 'ID of the pump head' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Pump head retrieved successfully',
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
    })
    async getPumpHeadById(@Param('id')id:number,@Res() res:any){
        try{
            let resp = await this.pumpHeadService.getPumpHeadById(id)
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
    @ApiOperation({ summary: 'Add a new pump head' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Pump head added successfully',
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
    })
    @ApiBody({type:PumpHeadDto})
    async addPumpHead(@Body() body:PumpHeadDto,@Res() res:any){
        try{
           let resp = await this.pumpHeadService.addPumpHead(body)
           if (resp.code == 'ECONNREFUSED') {
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .send({ error: 'Device Microservice ECONNREFUSED' });
          } else if (resp.statusCode === HttpStatus.CREATED) {
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
    @ApiOperation({ summary: 'Update a pump head by ID' })
    @ApiResponse({
        status: HttpStatus.ACCEPTED,
        description: 'Pump head updated successfully',
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
    })
    @ApiBody({type:UpdatProjectDto})
    async updatePumpHead(
      @Res() res: any,
      @Body() body: any,
      @Param('id') id: number,
    ) {
      try {
        let resp = await this.pumpHeadService.updatePumpHead(body, id);
        console.log("gw",resp)
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
        console.log("err",err)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
          statusCode: false,
        });
      }
    }
    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a pump head by ID' })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'Pump head deleted successfully',
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
    })
    async deletePumpHead(@Param('id') id: number, @Res() res: any) {
      try {
        let resp = await this.pumpHeadService.deletePumpHead(id);
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
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
          statusCode: false,
        });
      }
    }
}