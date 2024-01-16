import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/device/services/common-service';
import { Repository } from 'typeorm';
import { CONSTANT_MSG } from 'src/common-dto/const';
import { PumpSite } from './pump_site.entity';

@Injectable()
export class PumpSiteService {
  constructor(
    private readonly commonService: CommonService,
    @InjectRepository(PumpSite)
    private readonly pumpSiteRepository: Repository<PumpSite>,
  ) {}

  async addPumpSite(body: any) {
    try {
      let ridExist = await this.getPumpSiteDetailByRID(body.rid);
      // && ridExist.data.length === 0
      console.log('rid', ridExist);
      if (ridExist.statusCode === HttpStatus.NOT_FOUND) {
        let pumpSite = await this.pumpSiteRepository.save(body);
        if (!pumpSite || Object.keys(pumpSite).length === 0) {
          return this.commonService.errorMessage(
            [],
            CONSTANT_MSG.UNABLE_TO_ADD,
            HttpStatus.BAD_REQUEST,
          );
        } else {
          return this.commonService.successMessage(
            [],
            CONSTANT_MSG.ADDED_SUCCESSFULLY_PUMP_SITE,
            HttpStatus.CREATED,
          );
        }
      } else {
        console.log('enter in else');
        console.log(ridExist.message, ridExist.statusCode);
        return this.commonService.errorMessage(
          [],
          ridExist.message,
          ridExist.statusCode,
        );
      }
      //   console.log('resp', resp);
    } catch (err) {
      console.log('err', err);
      return await this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getPumpSiteDetailByRID(rid: any) {
    try {
      let exist = await this.pumpSiteRepository.find({ where: { rid: rid } });
      console.log('get', exist);

      if (exist.length === 0) {
        return this.commonService.errorMessage(
          exist,
          CONSTANT_MSG.PUMPSITE_DOES_NOT_EXIST,
          HttpStatus.NOT_FOUND,
        );
      } else if (exist.length > 0) {
        return this.commonService.successMessage(
          [],
          CONSTANT_MSG.PUMPSITE_EXIST,
          HttpStatus.CONFLICT,
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

  async getPumpSite(){
    try{
      let query = await this.pumpSiteRepository.find()
      if(query.length>0){
        return this.commonService.successMessage(
          query,
          CONSTANT_MSG.FETCH_SUCCESSFULLY,
          HttpStatus.OK
        )
      }else{
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FETCH_ERROR,
          HttpStatus.BAD_REQUEST
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

  async getPumpSiteById(id:number){
    try{
      let query = await this.pumpSiteRepository.find({where:{ref_id:id}})
      if(query.length>0){
        return this.commonService.successMessage(
          query,
          CONSTANT_MSG.FETCH_SUCCESSFULLY,
          HttpStatus.OK
        )
      }else{
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FETCH_ERROR,
          HttpStatus.BAD_REQUEST
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

  async updatePumpSite(id:number,body:any){
    try{

      let exist = await this.pumpSiteRepository.find({where:{ref_id:id}})
      if(exist.length === 0){
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.REF_ID_DOES_NOT_PRESENT,
          HttpStatus.NOT_FOUND
        )
      }
       let query = await this.pumpSiteRepository.update(
        {ref_id:id},
        body
       )

       if(query.affected >0){
        return this.commonService.successMessage(
          [],
          CONSTANT_MSG.PUMP_SITE_UPDATED_SUCCESSFULLY,
          HttpStatus.ACCEPTED
        )
       }else{
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.ERROR_WHILE_UPDATING,
          HttpStatus.BAD_REQUEST
        )
       }
    }catch(err){
        console.log("err",err)
        return  this.commonService.errorMessage(
         [],
         CONSTANT_MSG.INTERNAL_SERVER_ERR,
         HttpStatus.INTERNAL_SERVER_ERROR
        )
    }
  }

  async deletePumpSite(id:number){
    try{
        console.log("id",id)

        let exist = await this.pumpSiteRepository.find({where:{ref_id:id}})
        if(exist.length === 0){
          return this.commonService.errorMessage(
            [],
            CONSTANT_MSG.REF_ID_DOES_NOT_PRESENT,
            HttpStatus.NOT_FOUND
          )
        }
     let query = await this.pumpSiteRepository.delete(id)
       console.log("query",query)
     if(query.affected >0){
        return this.commonService.successMessage(
          [],
          CONSTANT_MSG.PUMP_SITE_DELETED_SUCCESSFULLY,
          HttpStatus.ACCEPTED
        )
       }else{
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.ERROR_WHILE_DELETING,
          HttpStatus.BAD_REQUEST
        )
       }
    }catch(err){
        console.log("err",err)
        return  this.commonService.errorMessage(
         [],
         CONSTANT_MSG.INTERNAL_SERVER_ERR,
         HttpStatus.INTERNAL_SERVER_ERROR
        )
    }
  }
}
