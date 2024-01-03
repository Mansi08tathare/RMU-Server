import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CONSTANT_MSG } from 'src/common-dto/const';
import { Rid } from 'src/device/entities/rid.entity';
import { RidConfig } from 'src/device/entities/rid_config.entity';
import { CommonService } from 'src/device/services/common-service';
import { Repository } from 'typeorm';

@Injectable()
export class RidService {
  constructor(
    private readonly commonService: CommonService,
    @InjectRepository(Rid)
    private readonly ridRepository: Repository<Rid>,
    @InjectRepository(RidConfig)
    private readonly ridConfigRepository: Repository<RidConfig>,
  ) {
    // this.checkConfigRidExist(164)
    //this.checkConfigRidExist(7853)
    // this.getallRids()
  }

  async addRID(rid: string, cont_mfr: string): Promise<any> {
    try {
      console.log(rid, cont_mfr);
      if (rid === undefined || rid == 'undefined' || rid == '') {
        //console.log(rid)
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.RID_NOT_DEFINED,
          HttpStatus.BAD_REQUEST,
        );
      }

      console.log('rid', rid);
      let r = await this.getRIDbyID(rid);
      console.log('getRIDbyID', r);
      // console.log(rid)
      // console.log(r.insertedid)
      // let insertId= r.insertedid
      //console.log('rl', r.data.length);

      if (r.statusCode === HttpStatus.OK) {
        console.log('enter to query');
        if (r.data.length === 0) {
          console.log('enter to length');

          let query = await this.ridRepository.save({ rid, cont_mfr });
          // INSERT INTO rid_tbl (rid,cont_mfr) VALUS('rid','mfr') RETURNING ref_id;

          console.log('QUery ', query);
          //.........insertedid remain
          if (!query) {
            return this.commonService.errorMessage(
              [],
              CONSTANT_MSG.ERROR_SAVING,
              HttpStatus.BAD_REQUEST,
            );
          } else {
            return this.commonService.successMessage(
              query.ref_id,
              CONSTANT_MSG.DEVICE_REGISTERED_SUCCESSFULLY,
              HttpStatus.CREATED,
            );
          }
        } else {
          console.log('r.data', r.data);
          console.log('enter in the');
          return this.commonService.errorMessage(
            //  r[0].rid_ref_id,
            // r[0].rid,
            r.data,
            CONSTANT_MSG.RID_EXIST,
            HttpStatus.CONFLICT,
          );
        }
      } else {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FAILED_TO_ADD_RID,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      console.log('err', err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.FAILED_TO_ADD_RID,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getRIDbyID(id: any): Promise<any> {
    try {
      console.log('s', id);
      let query = await this.ridRepository.find({ where: { rid: id } });
      console.log('querry', query);
      // console.log('q', query[0].ref_id);
      // console.log('qu',query)
      // if (!query ) {
      if (!query) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FETCH_ERROR,
          HttpStatus.OK,
        );
      } else if (query.length === 0) {
        return this.commonService.successMessage(
          query,
          CONSTANT_MSG.ID_OK,
          HttpStatus.OK,
        );
      } else {
        // console.log("query.ref_id",query[0].ref_id)
        return this.commonService.successMessage(
          query[0].ref_id,
          // query,
          CONSTANT_MSG.ID_OK,
          HttpStatus.OK,
        );
      }
    } catch (err) {
      console.log('err', err);
      return this.commonService.errorMessage(
        0,
        CONSTANT_MSG.FETCH_LIST_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // working
  // async checkConfigRidExist(rid_ref_id: number): Promise<any> {
  //   try {
  //     console.log('s', rid_ref_id);
  //     // console.log('ref_id',rid_ref_id.ref)
  //     console.log("checkConfigRidExist")
  //     let qresp = await this.ridConfigRepository
  //       .createQueryBuilder('user')
  //       .select(
  //         'user.ref_id as ref_id, user.rid_ref_id as rid, user.config_ref_id as config_ref_id',
  //       )
  //       .where('user.rid_ref_id = :rid_ref_id', { rid_ref_id })
  //       .getRawOne();

  //     console.log(
  //       'Quer2 ',
  //       qresp,
  //       qresp.rid,
  //       qresp.ref_id,
  //       qresp.config_ref_id,
  //     );

  //     // console.log('result', result);
  //     //more to add ccon
  //     if (qresp.status===true) {
  //       console.log('enter in qresp condition');
  //       // if(qresp.length>0){
  //       return this.commonService.successMessage(
  //         qresp,
  //         CONSTANT_MSG.ID_OK,
  //         HttpStatus.OK,
  //       );
  //     } else {
  //       console.log("Enter in not found")
  //       return this.commonService.errorMessage(
  //         [],
  //         CONSTANT_MSG.ID_NOT_FOUND,
  //         HttpStatus.NOT_FOUND,
  //       );
  //     }
  //   } catch (err) {
  //     // else{
  //     //   return this.commonService.errorMessage(
  //     //     [],
  //     //     CONSTANT_MSG.FAILED_TO_ADD_CONFIG,
  //     //     HttpStatus.BAD_REQUEST
  //     //   )
  //     // }}
  //     console.log("enter in err")
  //     console.log('err', err);
  //     return this.commonService.errorMessage(
  //       [],
  //       CONSTANT_MSG.INTERNAL_SERVER_ERR,
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }
  async checkConfigRidExist(rid_ref_id: number): Promise<any> {
    try {
      console.log('s', rid_ref_id);
      console.log('checkConfigRidExist');
      let qresp = await this.ridConfigRepository
        .createQueryBuilder('user')
        .select(
          'user.ref_id as ref_id, user.rid_ref_id as rid, user.config_ref_id as config_ref_id',
        )
        .where('user.rid_ref_id = :rid_ref_id', { rid_ref_id })
        .getRawOne();

      // console.log('Query2',qresp);
      console.log('Query', qresp);

      if (qresp && qresp.rid !== undefined) {
        // Check if qresp is defined and if 'rid' is defined
        console.log('enter in qresp condition');
        return this.commonService.successMessage(
          qresp,
          CONSTANT_MSG.ID_OK,
          HttpStatus.OK,
        );
      } else {
        console.log('Enter in not found');
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.ID_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (err) {
      console.log('enter in err');
      console.log('err', err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getRIDByRefID(id: number) {
    try {
      let query = await this.ridRepository.find({ where: { ref_id: id } });
      if (!query || query.length == 0) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.ID_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      } else {
        return this.commonService.successMessage(
          query,
          CONSTANT_MSG.ID_OK,
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

  async deleteRid(id: number) {
    try {
      console.log('ds id', id);
      let query = await this.ridRepository.delete({ ref_id: id });
      console.log('query', query);
      if (!query || query[0].length > 0) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.UNSUCCESSFULL,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          [],
          CONSTANT_MSG.ID_DELETED_SUCCESSFULLY,
          HttpStatus.NO_CONTENT,
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

  async updateRid(id: number, params: any) {
    try {
      console.log('update', id, params);
      // let formatUpdateData = '';
      // Object.keys(params).map((val,index)=>{
      //   formatUpdateData = formatUpdateData + (index === 0 ? " ":" ,") + val + " = '" + params[val] + "'"
      // });
      let query = await this.ridRepository
        .createQueryBuilder()
        .update()
        .set(params)
        .where('ref_id = :id', { id })
        .execute();

      if (!query) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FAILED_TO_UPDATE,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          [],
          CONSTANT_MSG.RID_UPDATED_SUCCESSFULLY,
          HttpStatus.ACCEPTED,
        );
      }
    } catch (err) {
      console.log(err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getallRids() {
    try {
      let device = await this.ridRepository.find();
      console.log('device', device);
      if (!device || device.length === 0) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FETCH_ERROR,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          device,
          CONSTANT_MSG.FETCH_SUCCESSFULLY,
          HttpStatus.OK,
        );
      }
    } catch (err) {
      console.log(err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  ////change in query first pass only ref_id not passing config_ref_id for config service
  async getConfigRidEntry(rid_ref_id: any) {
    try {
      console.log('rid_ref_id', rid_ref_id);
      //  let query = await this.ridConfigRepository.find({where:{rid:{ref_id:rid_ref_id}}})
      const query = await this.ridConfigRepository
        .createQueryBuilder('RidConfig')
        .select([
          'RidConfig.ref_id',
          'RidConfig.rid_ref_id',
          'RidConfig.config_ref_id',
        ])
        .where({ rid: { ref_id: rid_ref_id } })
        .getRawOne();
      console.log('query', query);
      if (!query || query.length === 0) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FETCH_ERROR,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          query,
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

  async deleteConfigRidEntry(id: number) {
    try {
      let query = await this.ridConfigRepository.delete({
        config: { ref_id: id },
      });

      console.log('query', query);

      if (query.affected > 0) {
        return this.commonService.successMessage(
          [],
          CONSTANT_MSG.ID_DELETED_SUCCESSFULLY,
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
      console.log('err', err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
