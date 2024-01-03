import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { ControllerMasterService } from './controller.service';
import { CONSTANT_MSG } from 'src/common-dto/const';

@Controller('controller')
export class ControllerMasterController {
  constructor(
    private readonly controllerMasterService: ControllerMasterService,
  ) {}

  @Get('')
  async getControllers(@Res() res: any) {
    try {
      let resp = await this.controllerMasterService.getControllers();
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

  @Get("/:id")
  async getController(@Res() res:any,@Param('id') id:number){
    try{
      let resp = await this.controllerMasterService.getController(id)
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
}
