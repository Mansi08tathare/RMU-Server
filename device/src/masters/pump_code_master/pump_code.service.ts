import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {Repository} from 'typeorm'
import { CommonService } from "src/device/services/common-service";
import { CONSTANT_MSG } from "src/common-dto/const";
import { PumpCodeMaster } from "./pump_code.entity";

@Injectable()
export class PumpCodeService{
    constructor(
        @InjectRepository(PumpCodeMaster)
        private readonly pumpCodeRepository:Repository<PumpCodeMaster>,
        private readonly commonService:CommonService
    ){}

    async getPumpCode(){
        try{
          let resp = await this.pumpCodeRepository.find()
          if(!resp || resp.length===0){
            return this.commonService.errorMessage(
                [],
                CONSTANT_MSG.FETCH_ERROR,
                HttpStatus.BAD_REQUEST
            )
          }else{
            return this.commonService.successMessage(
                resp,
                CONSTANT_MSG.FETCH_SUCCESSFULLY,
                HttpStatus.OK
            )
          }
        }catch(err){
            console.log("err",err)
           return this.commonService.errorMessage(
            [],
            CONSTANT_MSG.INTERNAL_SERVER_ERR,
            HttpStatus.INTERNAL_SERVER_ERROR
           )
        }
    }

    async getPumpCodeById(id:number){
        try{
            let resp = await this.pumpCodeRepository.findOne({where:{ref_id:id}})

            if(!resp || Object.keys(resp).length === 0){
              return this.commonService.errorMessage(
                [],
                CONSTANT_MSG.FETCH_ERROR,
                HttpStatus.BAD_REQUEST
              )
            }else{
                return this.commonService.successMessage(
                    resp,
                    CONSTANT_MSG.FETCH_SUCCESSFULLY,
                    HttpStatus.OK
                )
            }

        }catch(err){
            return this.commonService.errorMessage(
                [],
                CONSTANT_MSG.INTERNAL_SERVER_ERR,
                HttpStatus.INTERNAL_SERVER_ERROR
               )

        }
    }


     async addPumpCode(body: any) {
        try {
          let exist = await this.getPumpCodeByCode(body.code);
          if (exist.data.length > 0 && exist.statusCode === HttpStatus.OK) {
            return this.commonService.errorMessage(
              [],
              CONSTANT_MSG.PUMPCODE_ALREADY_EXIST,
              HttpStatus.CONFLICT,
            );
          }
          let resp = await this.pumpCodeRepository.save(body);
          if (!resp || resp.length === 0) {
            return this.commonService.errorMessage(
              [],
              CONSTANT_MSG.ERROR_SAVING,
              HttpStatus.BAD_REQUEST,
            );
          } else {
            return this.commonService.successMessage(
              [],
              CONSTANT_MSG.PUMPCODE_SAVED_SUCCESSFULLY,
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
    
      async getPumpCodeByCode(code: string) {
        try {
          let exist = await this.pumpCodeRepository.find({ where: { code } });
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

      
      async updatePumpCode(body: any, id: number) {
        try {

            let existingPumpCodes = await this.getPumpCodeByCode(body.code);
             console.log("up",existingPumpCodes.data[0])
            if (existingPumpCodes.statusCode === HttpStatus.OK) {
                const existingPumpCode = existingPumpCodes.data[0].ref_id;
    
                if (existingPumpCode && existingPumpCode.ref_id !== id) {
                  return this.commonService.errorMessage(
                    [],
                    CONSTANT_MSG.ALREADY_EXIST,
                    HttpStatus.CONFLICT
                  )
                }
            }

          let resp = await this.pumpCodeRepository.update({ ref_id: id }, body);
          if (resp.affected > 0) {
            return this.commonService.successMessage(
              [],
              CONSTANT_MSG.PUMPCODE_UPDATED_SUCCESSFULLY,
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
    
      async deletePumpCode(id: number) {
        try {
          let resp = await this.pumpCodeRepository.delete({ ref_id: id });
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
