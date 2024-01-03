import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sim } from 'src/device/entities/sim.entity';
import { CommonService } from 'src/device/services/common-service';
import { CONSTANT_MSG } from 'src/common-dto/const';
import { RidSim } from 'src/device/entities/rid.sim.entity';

@Injectable()
export class SimService {
  constructor(
    @InjectRepository(Sim)
    private readonly simRepository: Repository<Sim>,
    private readonly commonService: CommonService,
    @InjectRepository(RidSim)
    private readonly ridSimRepository: Repository<RidSim>,
  ) {
    // this.getSims()
    //this.getSimDetail(39);
    // this.deleteSim(42);
    // this.getSimRidEntry(41)
  }

  async getSims(): Promise<any> {
    try {
      let sim = await this.simRepository.find();
      console.log('sim', sim);
      if (!sim || sim.length === 0) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FETCH_ERROR,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          sim,
          CONSTANT_MSG.FETCH_SUCCESSFULLY,
          HttpStatus.OK,
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

  async getSim(id: number): Promise<any> {
    try {
      let sim = await this.simRepository.findOne({
        where: { ref_id: id },
      });
      if (!sim || Object.keys(sim).length === 0) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FETCH_ERROR,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          sim,
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

  //simno: string, operator: string, mobileno: string, rid_ref_id?: string

  
  async addSim(body: any): Promise<any> {
    // async addSim(simno: string, operator: string, mobileno: string, rid_ref_id?: string):Promise<any>{
    try {
     console.log("body",body)
      // const { simno, operator, mobileno, rid } = body;
      // //  let sim = await this.simRepository.save(body);
      // //let rid_ref_id :body.rid_ref_id
       let rid_ref_id = body.body.rid;
       console.log("rid_ref_id",rid_ref_id)
      // const simData = {
      //   simno: body.simno,
      //   operator: body.operator,
      //   mobileno: body.mobileno,
      // };
      // console.log("simData",simData)
      let sim = await this.simRepository.save(body.body);
      console.log("sim",sim)
      //console.log("sim",sim.ref_id)
      if (!sim || Object.keys(sim).length === 0) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.ENABLE_TO_ADD_SIM,
          HttpStatus.BAD_REQUEST,
        );
      } else if (rid_ref_id) {
        let assign = await this.assignRidToSim(rid_ref_id, sim.ref_id);
        // console.log("sim",sim.ref_id)
        // console.log("rid",rid_ref_id)
        if (assign.statusCode === HttpStatus.ACCEPTED) {
          return this.commonService.successMessage(
            [],
            CONSTANT_MSG.SIM_AND_RID_ADDED_SUCCESSFULLY,
            HttpStatus.CREATED,
          );
        }
      }
      //else {
      return this.commonService.successMessage(
        [],
        CONSTANT_MSG.SIM_ADDED_SUCCESSFULLY,
        HttpStatus.CREATED,
      );

      // }  else{
      //     return this.commonService.errorMessage(
      //         [],
      //         CONSTANT_MSG.ACCEPTED,
      //         HttpStatus.BAD_REQUEST
      //     )
      // }
    } catch (err) {
      console.log(err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async assignRidToSim( rid_ref_id: number,sim_ref_id: number) {
    try {

      console.log("rid_ref_id",rid_ref_id),
      console.log("sim_ref_id",sim_ref_id)
      let isExist = await this.ridSimRepository.find({
        where: {
          sim: { ref_id: sim_ref_id },
          
        },
      });
      console.log('isExist', isExist);
      //  if( Object.keys(isExist).length !==0){
      if (isExist.length !== 0) {
        // return this.commonService.errorMessage(
        //     [],
        //     CONSTANT_MSG.FETCH_ERROR,
        //     HttpStatus.BAD_REQUEST
        // )
        console.log("update")
        let update = await this.ridSimRepository
          .createQueryBuilder()
          .update(RidSim)
          .set({
            rid: { ref_id: rid_ref_id },
          })
          .where({ sim: { ref_id: sim_ref_id } })
          .execute();
        console.log('update', update);
        return this.commonService.successMessage(
          [],
          CONSTANT_MSG.ID_EXIST,
          HttpStatus.CONFLICT,
        );
      } else {
        console.log("insert")
        let insert = await this.ridSimRepository.save({
          rid: { ref_id: rid_ref_id },
          sim: { ref_id: sim_ref_id },
        });
        console.log('insert', insert);
        if (!insert || Object.keys(insert).length === 0) {
          return this.commonService.errorMessage(
            [],
            CONSTANT_MSG.UNABLE_TO_ADD_RID_SIM,
            HttpStatus.BAD_REQUEST,
          );
        } else {
          return this.commonService.successMessage(
            [],
            CONSTANT_MSG.FETCH_SUCCESSFULLY,
            HttpStatus.ACCEPTED,
          );
        }
      }
    } catch (err) {
      console.log('assign', err);
      return this.commonService.successMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // async updateSim(body: any, id: number) {
    async updateSim( simno: number, operator: string, mobileno: number, id:number,rid_ref_id?: number){
    try {
      console.log("id inservic",id)
      console.log("rid_ref_id",rid_ref_id)
      // const{simno,operator,mobileno,rid_ref_id}=body
      let sim = await this.getSimDetail(id);
      console.log("sim",sim)
      if(sim.statusCode === HttpStatus.OK){
         if(sim.data.length ===0){
          return this.commonService.errorMessage(
            [],
            CONSTANT_MSG.ID_NOT_FOUND,
            HttpStatus.NOT_FOUND
          )
         }

      let query = await this.simRepository
        .createQueryBuilder()
        .update(Sim)
        .set({simno,operator,mobileno })
        .execute();

        console.log("query",query)

           if(query.affected>0){
            if (rid_ref_id){
              let rs_status = await this.assignRidToSim(id,rid_ref_id)
              console.log(rs_status,"rs_status")
              return this.commonService.successMessage(
                [],
                CONSTANT_MSG.RID_SIM_UPDATED,
                HttpStatus.OK
              ) 
              
            }
            return this.commonService.successMessage(
              [],
              CONSTANT_MSG.SIM_UPDATED,
              HttpStatus.OK
            )
           }else{
            return this.commonService.errorMessage(
              [],
              CONSTANT_MSG.ERROR_WHILE_UPDATING,
              HttpStatus.BAD_REQUEST
            )
           }
      }else{
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.ERROR_WHILE_UPDATING,
          HttpStatus.BAD_REQUEST
        )
      }
  
    } catch (err) {
      console.log('err', err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async getSimDetail(id: number) {
    try {
      console.log("id",id)
      let query = await this.simRepository
        .createQueryBuilder('a')
        .leftJoin('rid_sim_tbl', 'b', 'a.ref_id = b.sim_details_ref_id')
        .where('a.ref_id = :id', { id })
        .select([
          'a.ref_id AS a_ref_id',
          'a.simno AS a_simno',
          'a.operator AS a_operator',
          'a.mobileno AS a_mobileno',
          'b.rid_ref_id AS b_rid_ref_id',
          'b.sim_details_ref_id AS b_sim_details_ref_id',
        ])
        .getRawOne();

      console.log('query', query);

      if(!query||Object.keys(query).length ===0){
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.ID_NOT_FOUND,
          HttpStatus.NOT_FOUND
        )
      }else{
         return this.commonService.successMessage(
          query,
          CONSTANT_MSG.ID_EXIST,
          HttpStatus.OK
         )
      }
    } catch (err) {
      console.log('err', err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async deleteSimDetail(id:number){
    try{
     let e = await this.getSimRidEntry(id);
     console.log("e",e)
     //check statuscode for it
     if(e.statusCode === HttpStatus.OK||e.statusCode===HttpStatus.BAD_REQUEST){
      if(e.data.length === 0){
        console.log("no relation")
        await this.deleteSim(id)
        return this.commonService.successMessage(
          [],
          CONSTANT_MSG.ID_DELETED_SUCCESSFULLY,
          HttpStatus.OK
        )
      } else{
        console.log("relation with rid")
        await this.deleteRidSim(id);
        await this.deleteSim(id);
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.ID_DELETED_SUCCESSFULLY,
          HttpStatus.OK
        )
      }
     }else{
      return this.commonService.errorMessage(
        '',
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

  ///ask return will be in array or objct
  async getSimRidEntry(id:number){
    try{
      let query = await this.ridSimRepository.find({where:{sim:{ref_id:id}}})
      console.log("query",query)
      if(!query || query.length === 0){
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FETCH_ERROR,
          HttpStatus.BAD_REQUEST
        )
      }else{
        return this.commonService.successMessage(
          query,
          CONSTANT_MSG.ID_OK,
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

  async deleteSim(id:number){
    try{
      
    //  let task =await this.ridSimRepository.delete({ sim:{ref_id:id} });
    //  console.log("task",task)
     let query = await this.simRepository.delete({ref_id:id});
     console.log("query",query)

     if(!query || query.affected ===0){
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.ERROR_WHILE_DELETING,
        HttpStatus.NO_CONTENT
      )
     } else {
      return this.commonService.successMessage(
        [],
        CONSTANT_MSG.ID_DELETED_SUCCESSFULLY,
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

  async deleteRidSim(id:number){
    try{
      let task =await this.ridSimRepository.delete({ sim:{ref_id:id} });
      if(task.affected>0){
        return this.commonService.successMessage(
          [],
          CONSTANT_MSG.ID_DELETED_SUCCESSFULLY,
          HttpStatus.NO_CONTENT
        )
      } else {
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
