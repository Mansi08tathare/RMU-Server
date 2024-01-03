import { HttpStatus, Injectable } from '@nestjs/common';
import { cDevice } from 'src/device/interfaces/device.interface';
import { CommonService } from './common-service';
import { CONSTANT_MSG } from 'src/common-dto/const';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FlowFormula } from '../entities/flow_formula.entity';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(FlowFormula)
    private readonly flowFormulaRepository: Repository<FlowFormula>,
    private readonly commonService: CommonService,
  ){}


  async addFlowFormula(fcode:any,days_output:any){
    try{

        let f_check = await this.getFlowFormulaByFcode(fcode);
        if(f_check.statusCode === HttpStatus.OK && f_check.data.length!=0){
            return this.commonService.errorMessage('',
            CONSTANT_MSG.F_CODE_ALREADY_EXIST,
            HttpStatus.CONFLICT
            )
        }

        let query = await this.flowFormulaRepository.save({ FCODE: fcode,
        do: days_output,})

        console.log(query)

        if(!query){
            return this.commonService.errorMessage(
                '',
                CONSTANT_MSG.FLOW_FORMULA_NOT_ADDED,
                HttpStatus.BAD_REQUEST
            )
        }else{
            return this.commonService.successMessage(
             query,
             CONSTANT_MSG.SUCCESSFULLY_FLOW_FORMULA_ADDED,
             HttpStatus.CREATED,   

            )
        }
        

    }catch(err){
        return this.commonService.errorMessage(
            '',
            CONSTANT_MSG.INTERNAL_SERVER_ERR,
            HttpStatus.INTERNAL_SERVER_ERROR
        )
    }
  }

  async getFlowFormulaByFcode(fcode:any){
    try{

        //test it
    let query = await this.flowFormulaRepository.find({where:{FCODE:fcode}})
    if(!query){
        return this.commonService.errorMessage(
            '',
            CONSTANT_MSG.FETCH_ERROR,
            HttpStatus.BAD_REQUEST
        )
    }  else{
        return this.commonService.successMessage(
            query,
            CONSTANT_MSG.ID_OK,
            HttpStatus.OK
        )
    }
    }catch(err){
        return this.commonService.errorMessage('',
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR
        )
    }
  }


  async updateFlowFormula(fcode:any,days_output:any,id:any){
    try{
    //  let query =
    // Use the update method to perform the update in one query
    ///see for id
    const updateResult = await this.flowFormulaRepository.update(id, {
        FCODE: fcode,
        do: days_output,
      });
  
      console.log(updateResult.affected)

      // Check if the update was successful
      if (updateResult.affected === 0) {
        return this.commonService.errorMessage(
          '',
          CONSTANT_MSG.FLOW_FORMULA_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }else{
        return this.commonService.successMessage(
            updateResult,
            CONSTANT_MSG.SUCCESSFULLY_UPDATED,
            HttpStatus.OK
        )
      }

    }catch(err){
        return this.commonService.errorMessage(
            '',
            CONSTANT_MSG.FAILED_TO_GET_FLOW_FORMULA,
            HttpStatus.INTERNAL_SERVER_ERROR
        )

    }
  }
}