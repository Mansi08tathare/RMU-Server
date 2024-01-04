import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Motor } from './motor.entity';
import { Repository } from 'typeorm';
import { CommonService } from 'src/device/services/common-service';
import { CONSTANT_MSG } from 'src/common-dto/const';

@Injectable()
export class MotorService {
  constructor(
    @InjectRepository(Motor)
    private readonly motorRepository: Repository<Motor>,
    private readonly commonService: CommonService,
  ) {}

  async getMotors() {
    try {
      let resp = await this.motorRepository.find();
      console.log('allresp', resp);
      if (!resp || resp.length === 0) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FETCH_ERROR,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          resp,
          CONSTANT_MSG.FETCH_SUCCESSFULLY,
          HttpStatus.OK,
        );
      }
    } catch (err) {
      console.log('err', err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getMotor(id: number) {
    try {
      let resp = await this.motorRepository.findOne({ where: { ref_id: id } });
      if (!resp || Object.keys(resp).length === 0) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FETCH_ERROR,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          resp,
          CONSTANT_MSG.FETCH_SUCCESSFULLY,
          HttpStatus.OK,
        );
      }
    } catch (err) {
      console.log('err', err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addMotor(body: any) {
    try {
      let exist = await this.getMotorByCode(body.code);
      if (exist.data.length > 0 && exist.statusCode === HttpStatus.OK) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.MOTOR_ALREADY_EXIST,
          HttpStatus.CONFLICT,
        );
      }
      let resp = await this.motorRepository.save(body);
      if (!resp || resp.length === 0) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.ERROR_SAVING,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          [],
          CONSTANT_MSG.MOTOR_SAVED_SUCCESSFULLY,
          HttpStatus.CREATED,
        );
      }
    } catch (err) {
      console.log('err', err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getMotorByCode(code: string) {
    try {
      let exist = await this.motorRepository.find({ where: { code } });
      console.log('exist', exist);

      if (exist.length > 0) {
        return this.commonService.successMessage(
          exist,
          CONSTANT_MSG.FETCH_SUCCESSFULLY,
          HttpStatus.OK,
        );
      } else {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FETCH_ERROR,
          HttpStatus.BAD_REQUEST,
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

  async updateMotor(body: any, id: number) {
    try {
      let resp = await this.motorRepository.update({ ref_id: id }, body);
      if (resp.affected > 0) {
        return this.commonService.successMessage(
          [],
          CONSTANT_MSG.MOTOR_UPDATED_SUCCESSFULLY,
          HttpStatus.ACCEPTED,
        );
      } else {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.ERROR_WHILE_UPDATING,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      console.log('err', err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteMotor(id: number) {
    try {
      let resp = await this.motorRepository.delete({ ref_id: id });
      if (resp.affected > 0) {
        return this.commonService.successMessage(
          [],
          CONSTANT_MSG.MOTOR_DELETED_SUCCESSFULLY,
          HttpStatus.NO_CONTENT,
        );
      } else {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.ERROR_WHILE_DELETING,
          HttpStatus.BAD_REQUEST,
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
