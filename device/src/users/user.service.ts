import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { CommonService } from 'src/device/services/common-service';
import { CONSTANT_MSG } from 'src/common-dto/const';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly commonService: CommonService,
  ) {
    // this.findOneWithEmail('akshay@gmail.com');
   // this.getUser()
   this.getUserById(16)
  }

  async addUser(body: any) {
    try {
      let exist = await this.findOneWithEmail(body.email);
      console.log('exist');
      if (exist.statusCode === HttpStatus.NOT_FOUND) {
        let user = await this.userRepository.save(body);

        console.log('user', user);
        // console.log("length",user.data.length)
        if (Object.keys(user).length === 0 || !user) {
          return this.commonService.errorMessage(
            [],
            CONSTANT_MSG.UNABLE_TO_ADD_USER,
            HttpStatus.BAD_REQUEST,
          );
        } else {
          return this.commonService.successMessage(
            [],
            CONSTANT_MSG.ADDED_USER_SUCCESSFULLY,
            HttpStatus.CREATED,
          );
        }
      }
    } catch (err) {
      console.log('Err', err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneWithEmail(email: string) {
    try {
      let query = await this.userRepository
        .createQueryBuilder('a')
        .select([
          'a.ref_id',
          'a.name',
          'a.password',
          'a.email',
          'a.department',
          'b.role',
        ])
        .innerJoin(Role, 'b', 'a.role = b.ref_id')
        .where('a.email = :email', { email })
        .getOne();
      console.log('qu', query);

      let queryn;
      if (query === null) {
        queryn = 0;
      }
      console.log('queryn', queryn);
      query = queryn;
      if (Object.keys(query).length === 0) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.ID_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      } else if (Object.keys(query).length > 0 || query) {
        return this.commonService.successMessage(
          query,
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

      // return query
    } catch (err) {
      console.log('err', err);
      // return err
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUser() {
    try {
    //   let user = await this.userRepository.find();
    let user = await this.userRepository .createQueryBuilder('a')
    .select([
      'a.ref_id as ref_id',
      'a.name as name',
      'a.password as password',
      'a.email as email',
      'a.mobile as mobile',
      'a.department as department',
      'b.role as role',
      'c.name as agency',
    ])
    .innerJoin('roles_tbl', 'b', 'a.role = b.ref_id')
    .leftJoin('agency_master_tbl', 'c', 'a.agency = c.ref_id')
     .getRawMany();
    
      console.log("user",user)
    //   console.log("length",user.length)
      if (user.length > 0) {
        return this.commonService.successMessage(
          user,
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

  async getUserById(id:number){
    try{
    //   let user = await this.userRepository.find({where:{ref_id:id}})
    let user = await this.userRepository
    .createQueryBuilder('a')
    .select([
      'a.ref_id as ref_id',
      'a.name as name',
      'a.password as password',
      'a.email as email',
      'a.mobile as mobile',
      'a.department as department',
      'b.role as role',
      'c.name as agency',
    ])
    .innerJoin('roles_tbl', 'b', 'a.role = b.ref_id')
    .leftJoin('agency_master_tbl', 'c', 'a.agency = c.ref_id')
    .where('a.ref_id = :id', { id })
    
    .getRawOne()
    console.log("USE",user)

      if (user.length > 0) {
        return this.commonService.successMessage(
          user,
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
    }catch(err){
        return this.commonService.errorMessage(
            [],
            CONSTANT_MSG.INTERNAL_SERVER_ERR,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
    }
  }

