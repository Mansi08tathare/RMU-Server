import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { OemService } from "./oem.service";
import { CONSTANT_MSG } from "src/common-dto/const";

@Controller('oem')
export class OemController{
    constructor(
        private readonly oemService:OemService
    ){}

    @Get('')
    async getOem(@Res() res:any){
        try{
            
         let resp = await this.oemService.getOem()
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
    async getOemById(@Param('id')id:number,@Res() res:any){
        try{
            let resp = await this.oemService.getOemById(id)
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
    async addOem(@Body() body:any,@Res() res:any){
        try{
           let resp = await this.oemService.addOem(body)
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
    async updateOem(
      @Res() res: any,
      @Body() body: any,
      @Param('id') id: number,
    ) {
      try {
        let resp = await this.oemService.updateOem(body, id);
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
    async deleteOem(@Param('id') id: number, @Res() res: any) {
      try {
        let resp = await this.oemService.deleteOem(id);
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