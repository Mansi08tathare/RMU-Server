import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OEM } from "./oem.entity";
import {Repository} from 'typeorm'
import { CommonService } from "src/device/services/common-service";
import { CONSTANT_MSG } from "src/common-dto/const";

@Injectable()
export class OemService{
    constructor(
        @InjectRepository(OEM)
        private readonly oemRepository:Repository<OEM>,
        private readonly commonService:CommonService
    ){}

    async getOem(){
        try{
          let resp = await this.oemRepository.find()
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

    async getOemById(id:number){
        try{
            let resp = await this.oemRepository.findOne({where:{ref_id:id}})

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


     async addOem(body: any) {
        try {
          let exist = await this.getOemByName(body.name);
          if (exist.data.length > 0 && exist.statusCode === HttpStatus.OK) {
            return this.commonService.errorMessage(
              [],
              CONSTANT_MSG.OEM_ALREADY_EXIST,
              HttpStatus.CONFLICT,
            );
          }
          let resp = await this.oemRepository.save(body);
          if (!resp || resp.length === 0) {
            return this.commonService.errorMessage(
              [],
              CONSTANT_MSG.ERROR_SAVING,
              HttpStatus.BAD_REQUEST,
            );
          } else {
            return this.commonService.successMessage(
              [],
              CONSTANT_MSG.OEM_SAVED_SUCCESSFULLY,
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
    
      async getOemByName(name: string) {
        try {
          let exist = await this.oemRepository.find({ where: { name } });
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

      async updateOem(body: any, id: number) {
        try {
          let resp = await this.oemRepository.update({ ref_id: id }, body);
          if (resp.affected > 0) {
            return this.commonService.successMessage(
              [],
              CONSTANT_MSG.OEM_UPDATED_SUCCESSFULLY,
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
    
      async deleteOem(id: number) {
        try {
          let resp = await this.oemRepository.delete({ ref_id: id });
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
