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
  ) {
    //this.getControllers()
  }

  async getControllers() {
    try {
      console.log("enter in cont")
      let resp = await this.controllerRepository.find();
      console.log("resppp",resp)
      if (!resp || resp.length === 0) {
        console.log("enter in not")
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FETCH_ERROR,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        console.log("enter in ok")
        return this.commonService.successMessage(
          resp,
          CONSTANT_MSG.FETCH_SUCCESSFULLY,
          HttpStatus.OK,
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

  async addController(body:any):Promise<any>{
    try{

      let getP = await this.getControllerByCode(body.code);

      console.log("getP",getP)
      if(getP.statusCode === HttpStatus.OK && getP.data.length > 0){
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.CONTROLLER_ALREADY_EXIST,
          HttpStatus.BAD_REQUEST
        )
      }
      let resp = await this.controllerRepository.save(body)
      if(!resp || resp.length === 0){
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.ERROR_SAVING,
          HttpStatus.BAD_REQUEST
        )
      } else{
        return this.commonService.successMessage(
          [],
          CONSTANT_MSG.CONTROLLER_SAVED_SUCESSFULLY,
          HttpStatus.CREATED
        )
      }
     }catch(err){
      console.log("err",err)
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    }
  }

  async getControllerByCode(code:any){
    try{
    
      let query = await this.controllerRepository.find({
        where:{code}
      })

      if(!query || query.length === 0){
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.CONTROLLER_NOT_FOUND,
          HttpStatus.BAD_REQUEST
        )
      }else{
        return this.commonService.successMessage(
          query,
          CONSTANT_MSG.CONTROLLER_ALREADY_EXIST,
          HttpStatus.OK
        )
      }
    }catch(err){
      console.log("err",err)
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    }
  }

  async getController(id:number){
    try{
      // console.log("enter in query")
      let resp = await this.controllerRepository.findOne({
        where:{ref_id:id}
      })

      if(!resp || Object.keys(resp).length === 0){
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FETCH_ERROR,
          HttpStatus.BAD_REQUEST
        )
      }else {
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
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    }
  }

  async updateController(body:any,id:number){
    try{
     let resp = await this.controllerRepository.update(
      {ref_id:id},
      body
     )

     if(resp.affected>0){
      return this.commonService.successMessage(
        [],
        CONSTANT_MSG.CONTROLLER_UPDATED_SUCCESSFULLY,
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
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
 
  async deleteController(id:number){
    try{
      let resp = await this.controllerRepository.delete({ref_id:id})

      if(resp.affected>0){
        return this.commonService.successMessage(
          [],
          CONSTANT_MSG.ID_DELETED_SUCCESSFULLY,
          HttpStatus.NO_CONTENT
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
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    }
  }
}
