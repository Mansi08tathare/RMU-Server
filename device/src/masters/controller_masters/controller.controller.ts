import { Controller } from '@nestjs/common';
import { ControllerMasterService } from './controller.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ControllerMasterController {
  constructor(
    private readonly controllerMasterService: ControllerMasterService,
  ) {}

  @MessagePattern({ cmd: 'getControllers' })
  async getControllers() {
    try {
      let resp = await this.controllerMasterService.getControllers();
      return resp;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }
}
