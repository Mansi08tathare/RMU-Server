import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {Repository} from 'typeorm'
import { CommonService } from "src/device/services/common-service";
import { CONSTANT_MSG } from "src/common-dto/const";
import { SolarPump } from "./solar_pump.entity";

@Injectable()
export class SolarPumpService{
    constructor(
        @InjectRepository(SolarPump)
        private readonly solarPumpRepository:Repository<SolarPump>,
        private readonly commonService:CommonService
    ){}

    async getSolarPump(){
        try{
          let resp = await this.solarPumpRepository.find()
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

    async getSolarPumpById(id:number){
        try{
            let resp = await this.solarPumpRepository.findOne({where:{ref_id:id}})

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


     async addSolarPump(body: any) {
        try {
          let exist = await this.getSolarPumpByModel(body.description);
       
          if (exist.data.length > 0 && exist.statusCode === HttpStatus.OK) {
            return this.commonService.errorMessage(
              [],
              CONSTANT_MSG.SOLARPUMP_ALREADY_EXIST,
              HttpStatus.CONFLICT,
            );
          }
          let resp = await this.solarPumpRepository.save(body);

          if (!resp || resp.length === 0) {
            return this.commonService.errorMessage(
              [],
              CONSTANT_MSG.ERROR_SAVING,
              HttpStatus.BAD_REQUEST,
            );
          } else {
            return this.commonService.successMessage(
              [],
              CONSTANT_MSG.SOLARPUMP_SAVED_SUCCESSFULLY,
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
    
      async getSolarPumpByModel(description: string) {
        try {
            console.log("get code")
          let exist = await this.solarPumpRepository.find({ where: { description } });
          console.log('exist', exist);
    
          if (exist.length > 0) {
            return this.commonService.successMessage(
              exist,
              CONSTANT_MSG.FETCH_SUCCESSFULLY,
              HttpStatus.OK,
            );
          } 
          // else if(exist.length===0){
          //   //console.log("ref_id dos not exist")
          //   return this.commonService.errorMessage(
          //     [],
          //     CONSTANT_MSG.REF_ID_DOES_NOT_PRESENT,
          //     HttpStatus.NOT_FOUND
          //   )
          // }
          else {
            return this.commonService.errorMessage(
              [],
              CONSTANT_MSG.FETCH_ERROR,
              HttpStatus.BAD_REQUEST,
            );
          }
        } catch (err) {
          console.log("err",err)
          return this.commonService.errorMessage(
            [],
            CONSTANT_MSG.INTERNAL_SERVER_ERR,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }

      
      async updateSolarPump(body: any, id: number) {
        try {
            let ref_id = await this.solarPumpRepository.find({where:{ref_id:id}})
            //console.log("ref_id",ref_id)
            if(ref_id.length===0){
              return this.commonService.errorMessage(
                [],
                CONSTANT_MSG.REF_ID_DOES_NOT_PRESENT,
                HttpStatus.NOT_FOUND
              )
            }
            let existingSolarPumps = await this.getSolarPumpByModel(body.description);
            console.log("exist",existingSolarPumps)
            //made change
            //  console.log("up",existingSolarPumps.data[0].ref_id)
            if (existingSolarPumps.statusCode === HttpStatus.OK) {
              
                const existingSolarPump = existingSolarPumps.data[0].ref_id;
                console.log(existingSolarPump)
                console.log("existing",existingSolarPump.ref_id !== id)
                if (existingSolarPump && existingSolarPump.ref_id !== id) {
                 
                    return this.commonService.errorMessage(
                      [],
                      CONSTANT_MSG.ALREADY_EXIST,
                      HttpStatus.CONFLICT
                    )
                }
            }
            // else{
            //   return this.commonService.errorMessage(
            //     [],
            //     existingSolarPumps.message,
            //     existingSolarPumps.statusCode
            //   )
            // }

          let resp = await this.solarPumpRepository.update({ ref_id: id }, body);
          console.log("resp",resp)
          if (resp.affected > 0) {
            return this.commonService.successMessage(
              [],
              CONSTANT_MSG.SOLARPUMP_UPDATED_SUCCESSFULLY,
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
    
      async deleteSolarPump(id: number) {
        try {
          let resp = await this.solarPumpRepository.delete({ ref_id: id });
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
