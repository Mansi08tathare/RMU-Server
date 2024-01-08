import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { SolarPumpService } from "./solar_pump.service";
import { CONSTANT_MSG } from "src/common-dto/const";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from "@nestjs/swagger";
import { SolarPumpDto } from "./dtos/solarpump.dto";

@ApiTags('SolarPump')
@Controller('solarPump')
export class SolarPumpController{
    constructor(
        private readonly solarPumpService:SolarPumpService
    ){}

    @Get('')
    @ApiOperation({ summary: 'Get all solar pumps' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'All solar pumps retrieved successfully',
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
    })
    async getSolarPump(@Res() res:any){
        try{
            
         let resp = await this.solarPumpService.getSolarPump()
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
    @ApiOperation({ summary: 'Get a solar pump by ID' })
    @ApiParam({ name: 'id', description: 'ID of the solar pump' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Solar pump retrieved successfully',
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
    })
    async getSolarPumpById(@Param('id')id:number,@Res() res:any){
        try{
            let resp = await this.solarPumpService.getSolarPumpById(id)
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
    @ApiOperation({ summary: 'Add a new solar pump' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Solar pump added successfully',
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
    })
    @ApiBody({type:SolarPumpDto})
    async addSolarPump(@Body() body:any,@Res() res:any){
        try{
           let resp = await this.solarPumpService.addSolarPump(body)
           console.log("resp",resp)
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
            console.log("err",err)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
                statusCode: false,
              });
            
        }
    }

    @Put('/:id')
    @ApiOperation({ summary: 'Update a solar pump by ID' })
    @ApiResponse({
        status: HttpStatus.ACCEPTED,
        description: 'Solar pump updated successfully',
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
    })
    async updateSolarPump(
      @Res() res: any,
      @Body() body: any,
      @Param('id') id: number,
    ) {
      try {
        let resp = await this.solarPumpService.updateSolarPump(body, id);
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
    @ApiOperation({ summary: 'Delete a solar pump by ID' })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'Solar pump deleted successfully',
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
    })
    async deleteSolarPump(@Param('id') id: number, @Res() res: any) {
      try {
        let resp = await this.solarPumpService.deleteSolarPump(id);
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