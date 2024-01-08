import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agency } from './agency.entity';
import { Repository } from 'typeorm';
import { CommonService } from 'src/device/services/common-service';
import { CONSTANT_MSG } from 'src/common-dto/const';

@Injectable()
export class AgencyMasterService {
  constructor(
    @InjectRepository(Agency)
    private readonly agencyRepository: Repository<Agency>,
    private readonly commonService: CommonService,
  ) {}

  async getAgencys() {
    try {
      let resp = await this.agencyRepository.find();
      if (!resp || resp.length === 0) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FETCH_ERROR,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          resp,
          CONSTANT_MSG.ID_OK,
          HttpStatus.OK,
        );
      }
    } catch (err) {
      console.log('err', err);
      return this.commonService.errorMessage(
        {},
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAgency(id: number) {
    try {
      let resp = await this.agencyRepository.findOne({ where: { ref_id: id } });
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
          HttpStatus.CREATED,
        );
      }
    } catch {
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addAgency(body: any) {
    try {
      let exist = await this.getAgencyByName(body.name);
      if (exist.statusCode === HttpStatus.OK) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.ID_EXIST,
          HttpStatus.CONFLICT,
        );
      } else {
        let resp = await this.agencyRepository.save(body);
        console.log('resp', resp);
        if (!resp || Object.keys(resp).length === 0) {
          return this.commonService.errorMessage(
            [],
            CONSTANT_MSG.UNABLE_TO_ADD,
            HttpStatus.BAD_REQUEST,
          );
        } else {
          return this.commonService.successMessage(
            resp,
            CONSTANT_MSG.AGENCY_ADDED_SUCCESSFULLY,
            HttpStatus.CREATED,
          );
        }
      }
    } catch (err) {
      console.log('err', err);
      return this.commonService.errorMessage(
        {},
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAgencyByName(name: string) {
    try {
      let exist = await this.agencyRepository.findOne({ where: { name } });
      if (!exist || Object.keys(exist).length === 0) {
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

  async updateAgency(body: any, id: number) {
    try {

      let ref_id = await this.agencyRepository.find({where:{ref_id:id}})
            //console.log("ref_id",ref_id)
            if(ref_id.length===0){
              return this.commonService.errorMessage(
                [],
                CONSTANT_MSG.REF_ID_DOES_NOT_PRESENT,
                HttpStatus.NOT_FOUND
              )
            }
      let resp = await this.agencyRepository
        .createQueryBuilder()
        .update(Agency)
        .set(body)
        .where('ref_id=:id', { id })
        .execute();
      if (resp.affected > 0) {
        return this.commonService.successMessage(
          [],
          CONSTANT_MSG.SUCCESSFULLY_UPDATED_AGENCY,
          HttpStatus.ACCEPTED,
        );
      } else {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.UNABLE_TO_UPDATE,
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

    async deleteAgency(id:number){
    try{

        let resp = await this.agencyRepository.delete({ref_id:id})
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
        return this.commonService.errorMessage(
            [],
            CONSTANT_MSG.INTERNAL_SERVER_ERR,
            HttpStatus.INTERNAL_SERVER_ERROR
        )

    }
  }
}
