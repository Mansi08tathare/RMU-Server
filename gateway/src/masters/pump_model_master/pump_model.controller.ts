import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { PumpModelService } from "./pump_model.service";
import { CONSTANT_MSG } from "src/common-dto/const";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from "@nestjs/swagger";
import { PumpModelDto } from "./dtos/pumpmodel.dto";
import { UpdatePumpModelDto } from "./dtos/Updatepumpmodel.dto";

@ApiTags('PumpModel')
@Controller('pumpModel')
export class PumpModelController{
    constructor(
        private readonly pumpModelService:PumpModelService
    ){}

    @Get('')
    @ApiOperation({ summary: 'Get all pump models' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'All pump models retrieved successfully',
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
    })
    async getPumpModel(@Res() res:any){
        try{
            
         let resp = await this.pumpModelService.getPumpModel()
        //  console.log("resp",resp)
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

        }catch(err){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
                statusCode: false,
              });

        }
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a pump model by ID' })
    @ApiParam({ name: 'id', description: 'ID of the pump model' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Pump model retrieved successfully',
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
    })
    async getPumpModelById(@Param('id')id:number,@Res() res:any){
        try{
            let resp = await this.pumpModelService.getPumpModelById(id)
            if (resp.code == 'ECONNREFUSED') {
                res
                  .status(HttpStatus.INTERNAL_SERVER_ERROR)
                  .send({ error: 'Device Microservice ECONNREFUSED' });
              } else if (resp.statusCode === HttpStatus.OK) {
                res
                  .status(resp.statusCode)
                  .send({ status:resp.statusCode, message: resp.message, data: resp.data });
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

    @Post('')
    @ApiOperation({ summary: 'Add a new pump model' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Pump model added successfully',
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
    })
    @ApiBody({type:PumpModelDto})
    async addPumpModel(@Body() body:PumpModelDto,@Res() res:any){
        try{
           let resp = await this.pumpModelService.addPumpModel(body)
           console.log("resp",resp)
           if (resp.code == 'ECONNREFUSED') {
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .send({ error: 'Device Microservice ECONNREFUSED' });
          } else if (resp.statusCode === HttpStatus.CREATED) {
            res
              .status(resp.statusCode)
              .send({status:resp.statusCode, message: resp.message });
          } else {
            res.status(resp.statusCode).send({status:resp.statusCode, error: resp.message });
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
    //@ApiBody({type:UpdatePumpModelDto})
    @ApiOperation({ summary: 'Update a pump model by ID' })
    @ApiResponse({
        status: HttpStatus.ACCEPTED,
        description: 'Pump model updated successfully',
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
    })
    @ApiBody({type:UpdatePumpModelDto})
    async updatePumpModel(
      @Res() res: any,
      @Body() body: UpdatePumpModelDto,
      @Param('id') id: number,
    ) {
      try {
        let resp = await this.pumpModelService.updatePumpModel(body, id);
        console.log("gw",resp)
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
        console.log("err",err)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
          statusCode: false,
        });
      }
    }


    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a pump model by ID' })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'Pump model deleted successfully',
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
    })
    async deletePumpModel(@Param('id') id: number, @Res() res: any) {
      try {
        let resp = await this.pumpModelService.deletePumpModel(id);
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