import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {Repository} from 'typeorm'
import { CommonService } from "src/device/services/common-service";
import { CONSTANT_MSG } from "src/common-dto/const";
import { PumpHeadMaster } from "./pump_head.entity";

@Injectable()
export class PumpHeadService{
    constructor(
        @InjectRepository(PumpHeadMaster)
        private readonly pumpHeadRepository:Repository<PumpHeadMaster>,
        private readonly commonService:CommonService
    ){}

    async getPumpHead(){
        try{
          let resp = await this.pumpHeadRepository.find()
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

    async getPumpHeadById(id:number){
        try{
            let resp = await this.pumpHeadRepository.findOne({where:{ref_id:id}})

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


     async addPumpHead(body: any) {
        try {
          let exist = await this.getPumpHeadByCode(body.code);
       
          if (exist.data.length > 0 && exist.statusCode === HttpStatus.OK) {
            return this.commonService.errorMessage(
              [],
              CONSTANT_MSG.PUMPHEAD_ALREADY_EXIST,
              HttpStatus.CONFLICT,
            );
          }
          let resp = await this.pumpHeadRepository.save(body);

          if (!resp || resp.length === 0) {
            return this.commonService.errorMessage(
              [],
              CONSTANT_MSG.ERROR_SAVING,
              HttpStatus.BAD_REQUEST,
            );
          } else {
            return this.commonService.successMessage(
              [],
              CONSTANT_MSG.PUMPHEAD_SAVED_SUCCESSFULLY,
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
    
      async getPumpHeadByCode(code: string) {
        try {
            console.log("get code")
          let exist = await this.pumpHeadRepository.find({ where: { code } });
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

      
      async updatePumpHead(body: any, id: number) {
        try {

            let existingPumpHeads = await this.getPumpHeadByCode(body.code);
            console.log("exist",existingPumpHeads)
            //made change
             console.log("up",existingPumpHeads.data.ref_id)
            if (existingPumpHeads.statusCode === HttpStatus.OK) {
                const existingPumpHead = existingPumpHeads.data.ref_id;
    
                if (existingPumpHead && existingPumpHead.ref_id !== id) {
                    return {
                        status: HttpStatus.CONFLICT,
                        resp: 'PumpHead already exists'
                    };
                }
            }

          let resp = await this.pumpHeadRepository.update({ ref_id: id }, body);
          console.log("resp",resp)
          if (resp.affected > 0) {
            return this.commonService.successMessage(
              [],
              CONSTANT_MSG.PUMPHEAD_UPDATED_SUCCESSFULLY,
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
    
      async deletePumpHead(id: number) {
        try {
          let resp = await this.pumpHeadRepository.delete({ ref_id: id });
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
