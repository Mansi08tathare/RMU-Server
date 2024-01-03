import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ControllerMaster } from './controller.entity';
import { Repository } from 'typeorm';
import { CommonService } from 'src/device/services/common-service';
import { CONSTANT_MSG } from 'src/common-dto/const';

@Injectable()
export class ControllerMasterService {
  constructor(
    @InjectRepository(ControllerMaster)
    private readonly controllerRepository: Repository<ControllerMaster>,
    private readonly commonService: CommonService,
  ) {}

  async getControllers() {
    try {
      let resp = await this.controllerRepository.find();
      if (!resp || resp.length === 0) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FETCH_ERROR,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          [],
          CONSTANT_MSG.FETCH_SUCCESSFULLY,
          HttpStatus.OK,
        );
      }
    } catch (err) {
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
