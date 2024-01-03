import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { ControllerMasterService } from './controller.service';
import { CONSTANT_MSG } from 'src/common-dto/const';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';

@Controller('controller')
@ApiTags('ControllerMaster')
export class ControllerMasterController {
  constructor(
    private readonly controllerMasterService: ControllerMasterService,
  ) {}

  @Get('')
  @ApiResponse({ status: HttpStatus.OK, description: 'All controllers retrieved successfully' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
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
  @ApiParam({ name: 'id', description: 'ID of the controller' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Controller retrieved successfully' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
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
