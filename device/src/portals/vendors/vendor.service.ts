import { HttpStatus, Injectable } from '@nestjs/common';
import { State } from '../../device/entities/state.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonService } from '../../device/services/common-service';
import { CONSTANT_MSG } from 'src/common-dto/const';
import { Vendor } from '../../device/entities/vendor.entity';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
    private readonly commonService: CommonService,
  ) {
    //this.addVendorStateIfNotExist('pci_wires',11)
    // this.addVendorStateIfNotExist('solex',2)
   // this.deleteVendor(95)
  }

  async addVendorStateIfNotExist(name: string, state_id: number): Promise<any> {
    try {
      // let vendor = await this.vendorRepository.find({where:{
      //   name,
      //   state:state_id
      // }})
      let vendor = await this.vendorRepository.find({
        where: {
          name,
          state: { ref_id: state_id },
        },
      });

      //console.log("vendors",vendor)

      if (!vendor) {
        return this.commonService.errorMessage(
          0,
          CONSTANT_MSG.ID_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      } else {
        if (vendor.length === 0) {
          // let vendor1 = await this.vendorRepository.save({name, state_id});
          let newState = await this.stateRepository.findOne({
            where: { ref_id: state_id },
          });
          let vendor1 = await this.vendorRepository.save({
            name,
            state: newState,
          });

          // console.log('vendor1', vendor1);
          // console.log('vendor_ref_id', vendor1.ref_id);
          if (!vendor1) {
            return this.commonService.errorMessage(
              0,
              CONSTANT_MSG.VENDOR_SAVED_UNSUCCESSFULLY,
              HttpStatus.BAD_REQUEST,
            );
          } else {
            // console.log("vendor_ref_id",vendor1[0].ref_id)
            return this.commonService.successMessage(
              vendor1,
              CONSTANT_MSG.VENDOR_SAVED_SUCCESSFULLY,
              HttpStatus.OK,
            );
          }
        } else {
          //  console.log(vendor[0].ref_id)
          console.log(vendor[0]);
          return this.commonService.successMessage(
            vendor[0],
            CONSTANT_MSG.FETCH_SUCCESSFULLY,
            HttpStatus.OK,
          );
        }
      }
    } catch (err) {
      //console.log('ven err', err);
      return this.commonService.errorMessage(
        0,
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getVendors(): Promise<any> {
    try {
      // let vendors = await this.vendorRepository.find(
      //   // {relations:{state:true}}
      //   { relations: ['state'], 
      //   loadRelationIds: true ,
      //   },
      // );

      const vendors = await this.vendorRepository.createQueryBuilder('vendor')
      .leftJoinAndSelect('vendor.state', 'state')
      .select([
        'vendor.ref_id As ref_id',
        'vendor.name As name' ,
        'vendor.username As username',
        'vendor.password As password',
        'state.ref_id AS state_id',
      ])
      .getRawMany();

      if (!vendors || vendors.length === 0) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FETCH_ERROR,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          vendors,
          CONSTANT_MSG.RETRIEVE_SUCCESSFULLY,
          HttpStatus.OK,
        );
      }
    } catch (err) {
     // console.log(err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getVendorByID(ref_id: number): Promise<any> {
    try {
      // let vendor = await this.vendorRepository.findOne({
      //   where: { ref_id },
      //   relations: ['state'],
      //   // loadEagerRelations:true
      //   loadRelationIds: true,
      // });

      let vendor = await this.vendorRepository.createQueryBuilder('vendor')
      .leftJoinAndSelect('vendor.state','state')
      .select([
        'vendor.ref_id As ref_id',
         'vendor.name As name',
         'vendor.username As username',
         'vendor.password As password',
         'state.ref_id As state_id'
      ])
      .getRawOne();

      if (!vendor) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FETCH_ERROR,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          vendor,
          CONSTANT_MSG.ID_OK,
          HttpStatus.OK,
        );
      }
    } catch (err) {
      //console.log(err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addVendor(body: any) {
    try {
      let name = body.name;
      name = name.toLowerCase();
      //const{name,body.username,body.password}=data
      let exist = await this.IsVendorExist(name, body.state_id);
      console.log('exist', exist);
      //need test
      if (exist.statusCode === HttpStatus.OK) {
        if (exist.data.length === 0) {
          let query = await this.vendorRepository.save({
            name: name,
            username: body.username,
            password: body.password,
            state: { ref_id: body.state_id },
          });
          console.log('query', query);
          if (!query || Object.keys(query).length === 0) {
            return this.commonService.errorMessage(
              [],
              CONSTANT_MSG.VENDOR_SAVED_UNSUCCESSFULLY,
              HttpStatus.BAD_REQUEST,
            );
          } else {
            return this.commonService.successMessage(
              [],

              CONSTANT_MSG.VENDOR_SAVED_SUCCESSFULLY,
              HttpStatus.CREATED,
            );
          }
        } else {
          return this.commonService.errorMessage(
            [],
            CONSTANT_MSG.VENDOR_ALREADY_EXIST,
            HttpStatus.CONFLICT,
          );
        }
      } else {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.UNABLE_TO_ADD_VENDOR,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      if (err.errno === 1452 || err.code === 'ER_NO_REFERENCED_ROW_2') {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.STATE_DOES_NOT_EXIST,
          HttpStatus.BAD_REQUEST,
        );
      }
      //console.log('err', err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async IsVendorExist(name: string, state_id: number): Promise<any> {
    try {
      let exist = await this.vendorRepository.find({
        where: {
          name,
          state: { ref_id: state_id },
        },
      });
      console.log('in exist', exist);
      if (!exist) {
        console.log('return if');
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.ID_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      } else {
        console.log('return else');
        return this.commonService.successMessage(
          exist,
          CONSTANT_MSG.ID_OK,
          HttpStatus.OK,
        );
      }
    } catch (err) {
      //console.log(err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateVendor(body:any,id:number){
    try{
      
     let name = body.name;
     name = name.toLowerCase();
    //  let id=body.id;
     let exist = await this.vendorRepository.find({where:{ref_id:id}})
     if(exist.length===0){
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.REF_ID_DOES_NOT_PRESENT,
        HttpStatus.NOT_FOUND
      )
     }

     let query = await this.vendorRepository.createQueryBuilder()
     .update(Vendor)
     .set(
      {
        name:body.name,
        username:body.username,
        password:body.password
      }
     )
     .where('ref_id = :id',{id:id})
     .execute()

     console.log(query)
     if(!query || query.affected === 0){

      return this.commonService.errorMessage([],
        CONSTANT_MSG.UNABLE_TO_UPDATE,
        HttpStatus.BAD_REQUEST
        )
     }else{
      return this.commonService.successMessage([],
        CONSTANT_MSG.VENDOR_UPDATED_SUCCESSFULLY,
        HttpStatus.ACCEPTED)
     }
    }catch(err){
      console.log(err)
      return this.commonService.errorMessage([],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async deleteVendor(ref_id:number):Promise<any>{
    try{

      let exist = await this.vendorRepository.find({where:{ref_id:ref_id}})
      if(exist.length===0){
       return this.commonService.errorMessage(
         [],
         CONSTANT_MSG.REF_ID_DOES_NOT_PRESENT,
         HttpStatus.NOT_FOUND
       )
      }
 
    let vendor = await this.vendorRepository.delete(ref_id)
    console.log("vendor",vendor)
    if(!vendor || 
      //Object.keys(vendor).length !==0
      vendor.affected ===0){
     return this.commonService.errorMessage(
      [],
      CONSTANT_MSG.ERROR_WHILE_DELETING,
      HttpStatus.BAD_REQUEST
     )
    }else{
     return this.commonService.successMessage(
      [],
      CONSTANT_MSG.ID_DELETED_SUCCESSFULLY,
      HttpStatus.NO_CONTENT
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
