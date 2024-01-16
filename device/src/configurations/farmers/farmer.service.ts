import {  HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/device/services/common-service';
import { Repository } from 'typeorm';
import { ProjectDetails } from './farmer.entity';
import { CONSTANT_MSG } from 'src/common-dto/const';

@Injectable()
export class FarmerService {
  constructor(
    private readonly commonService: CommonService,
    @InjectRepository(ProjectDetails)
    private readonly farmerRepository: Repository<ProjectDetails>,
    
    
  ) { }

  async addFarmer(body:any){
    try{
      //console.log("SER",body)
       let ridExist = await this.getDetailsFromRid(body.rid)
       console.log(ridExist,"ridExist")
       if(ridExist.statusCode === HttpStatus.NOT_FOUND){
        let farmer = await this.farmerRepository.save(body)
        console.log("farmer",farmer)
        if(!farmer || Object.keys(farmer).length ===0){
          return  this.commonService.errorMessage(
            [],
            CONSTANT_MSG.UNABLE_TO_ADD,
            HttpStatus.BAD_REQUEST
          )
        }else{
          return this.commonService.successMessage(
            [],
            CONSTANT_MSG.ADDED_SUCCESSFULLY_PROJECT_DETAILS,
            HttpStatus.CREATED
          )
        }
       }else{
        console.log(ridExist.message,ridExist.statusCode)
         return this.commonService.errorMessage(
          [],
          ridExist.message,
          ridExist.statusCode
        )
       }
       
       //console.log("farmer",farmer)
    }catch(err){
        console.log("err",err)
          return  await this.commonService.errorMessage(
            [],
            CONSTANT_MSG.INTERNAL_SERVER_ERR,
            HttpStatus.INTERNAL_SERVER_ERROR
          )
    }
  }

  async getDetailsFromRid(rid:any){
    try{
      console.log("rid",rid)
      // let getRid = await this.farmerRepository.findOne({
      //   where:{rid:rid}
      // })
      // console.log("getRid",getRid)

      let getDetail = await this.farmerRepository.find({where:{rid:rid}})
      console.log("getDetail",getDetail)

      if(getDetail.length === 0){
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.RID_DOES_NOT_EXIST,
          HttpStatus.NOT_FOUND
        )
      }
      else if(getDetail.length>0){
        return this.commonService.successMessage(
          [],
          CONSTANT_MSG.RID_EXIST,
          HttpStatus.CONFLICT
        )
      }
      else{
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FETCH_ERROR,
          HttpStatus.BAD_REQUEST
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

  async getProject(){
    try{
      let resp = await this.farmerRepository.find()
      if(resp.length>0){
        return this.commonService.successMessage(
          resp,
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

  async getProjectById(id:number){
    try{
     let resp = await this.farmerRepository.find({where:{ref_id:id}})
     if(resp.length > 0){
       return this.commonService.successMessage(
        resp,
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
    }catch{
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.INTERNAL_SERVER_ERR,
          HttpStatus.INTERNAL_SERVER_ERROR
        )
    }

  }

  async updateProject(id:number,body:any){
    try{
      // let respo= await this.farmerRepository.createQueryBuilder()
      // .update()
      // .set(body)
      // .where('ref_id =:id',{id})
      // .execute()

      // console.log("respo",respo)
      // let exist = await this.farmerRepository.get
       console.log("id-update",id)
      let exist = await this.farmerRepository.find({where:{ref_id:id}})
      console.log("exist",exist)
      if(exist.length){
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.REF_ID_DOES_NOT_PRESENT,
          HttpStatus.NOT_FOUND
        )
      }
     let resp = await this.farmerRepository.update(
      {ref_id:id},
      body
     )
     console.log("resp",resp)
     if(resp.affected >0){
      return this.commonService.successMessage(
        [],
        CONSTANT_MSG.PROJECT_DETAILS_UPDATED_SUCCESSFULLY,
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

  async deleteProject(id:number){
    try{
      let exist = await this.farmerRepository.find({where:{ref_id:id}})
      if(exist.length){
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.REF_ID_DOES_NOT_PRESENT,
          HttpStatus.NOT_FOUND
        )
      } 
    let resp = await this.farmerRepository.delete({ref_id:id})
    console.log("resp",resp)
    if(resp.affected > 0){
      return this.commonService.successMessage(
        [],
        CONSTANT_MSG.PROJECT_DELETED_SUCCESSFULLY,
        HttpStatus.OK
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
       return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR
       )
    }
  }
}