import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CommonService } from 'src/device/services/common-service';
import { CONSTANT_MSG } from 'src/common-dto/const';
import { compare } from 'bcrypt';
import { Permission } from './entities/permission.entity';
import { Rid } from 'src/device/entities/rid.entity';
import { UserRid } from './entities/users_rid.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly commonService: CommonService,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    @InjectRepository(Rid)
    private readonly ridRepository: Repository<Rid>,
    @InjectRepository(UserRid)
    private readonly userRidRespository: Repository<UserRid>
  ) {
    // this.findOneWithEmail('akshay@gmail.com');
    // this.getUser()
    //this.getUserById(121);
    this.getUserRids(16);
  }

  async addUser(body: any) {
    try {
      let exist = await this.findOneWithEmail(body.email);
      console.log('exist', exist);
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
      } else {
        return await this.commonService.errorMessage(
          [],
          exist.message,
          exist.statusCode,
        );
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
        // }
        console.log('enter in null');
        console.log('queryn', queryn);
        // query = queryn;
        if (Object.keys(queryn).length === 0) {
          return this.commonService.errorMessage(
            [],
            CONSTANT_MSG.ID_NOT_FOUND,
            HttpStatus.NOT_FOUND,
          );
        }
      } else if (Object.keys(query).length > 0 || query) {
        console.log('enter in successfull');
        return this.commonService.successMessage(
          query,
          CONSTANT_MSG.EMAIL_ALREADY_EXIST,
          HttpStatus.CONFLICT,
        );
      } else {
        console.log('enter in fetch error');
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
        .getRawMany();

      console.log('user', user);
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

  async getUserById(id: number) {
    try {
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
        .getRawOne();
      console.log('user', user);
      let usr;
      if (user === undefined) {
        usr = 0;
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.USER_DOES_NOT_EXIST,
          HttpStatus.NOT_FOUND,
        );
      }
      user = usr;
      console.log('USE', Object.keys(user).length);
      // console.log("user",user.length)
      if (Object.keys(user).length > 0) {
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

  async deleteUser(id: number) {
    try {
      // console.log("idd",id)
      let exist = await this.userRepository.find({ where: { ref_id: id } });
      if (exist.length === 0) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.USER_DOES_NOT_EXIST,
          HttpStatus.NOT_FOUND,
        );
      }
      let resp = await this.userRepository.delete({ ref_id: id });
      //console.log("resp",resp)
      if (resp.affected > 0) {
        return this.commonService.successMessage(
          [],
          CONSTANT_MSG.DELETED_USER_SUCCSSFULLY,
          HttpStatus.OK,
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

  async updateUser(id: number, body: any) {
    try {
      let exist = await this.userRepository.find({ where: { ref_id: id } });
      if (exist.length === 0) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.USER_DOES_NOT_EXIST,
          HttpStatus.NOT_FOUND,
        );
      }
      let resp = await this.userRepository.update({ ref_id: id }, body);
      if (resp.affected > 0) {
        return this.commonService.successMessage(
          [],
          CONSTANT_MSG.USER_UPDATED_SUCCESSFULLY,
          HttpStatus.ACCEPTED,
        );
      } else {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FAILED_TO_UPDATE,
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

  async login(data: { email: string; password: string }) {
    try {
      const { email, password } = data;

      // let user = await this.userRepository.findOne({ where: { email: email } });
      let user = await this.userRepository
        .createQueryBuilder('a')
        .select([
          'a.ref_id as ref_id',
          'a.name as name',
          'a.password as password',
          'a.email as email',
          'a.department as department',
          'b.role as role',
        ])
        .innerJoin(Role, 'b', 'a.role = b.ref_id')
        .where('a.email = :email', { email })
        .getRawOne();
      console.log('user', user);
      console.log('Data received in login method:', data);

      if (!user) {
        // return { loggedIn: false, user: null, password, role: null };
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.USER_DOES_NOT_EXIST,
          HttpStatus.NOT_FOUND,
        );
      }
      //.trim() to remove space
      // const isPasswordValid = await compare(password, user.password);
      console.log('Stored Password:', user.password);
      console.log('Provided Password:', password);

      const isPasswordValid = password === user.password;
      console.log('Password Comparison Result:', isPasswordValid);

      console.log(isPasswordValid, 'passvalid');
      if (!isPasswordValid) {
        // return { loggedIn: false, user: null, password, role: null };
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.PASSWORD_DOES_NOT_MATCH,
          HttpStatus.BAD_REQUEST,
        );
      }

      let permissions = await this.getUserPermission(user.ref_id);

      let user_rids = await this.getUserRids(user.ref_id);

      return this.commonService.successMessage(
        user,
        CONSTANT_MSG.FETCH_SUCCESSFULLY,
        HttpStatus.OK,
      );
      // return { loggedIn: true, user, password, role: user.role,id:user.id };
      //return { loggedIn: true, user };
    } catch (err) {
      console.log('err', err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserPermission(user_id: any) {
    try {
      let query = await this.permissionRepository.find({
        where: { user_id: user_id },
      });
      if (query.length > 0) {
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
    } catch (err) {
      console.log('err', err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserRids(user_id: any) {
    try {
      console.log('user_id', user_id);
      //let query = await this.userRidRespository.find({ where: user_id })
      //console.log("query", query)

      // let results1 = await this.userRidRespository
      //   .createQueryBuilder('userRid')
      //   .select('rid.*')  
      //   .innerJoin('userRid.user', 'user')
      //   .innerJoin('userRid.rid', 'rid')
      //   .where('user.id = :user_id', { user_id })  
      //   .getRawMany();

      // console.log("result1",results1)


      let results = await this.userRidRespository
        // .createQueryBuilder('rid')
        // .select('rid.*')
        // .innerJoin('rid.users', 'userRid', 'rid.rid = userRid.rid')
        // // .where('userRid.user_id = :user_id', { user_id: user_id })
        // .where('userRid.user = :user_id', { user_id })
        // .getRawMany();
      .createQueryBuilder('userRid')
      .select('rid.*')
      .innerJoin('userRid.rid', 'rid')
      .innerJoin('userRid.user', 'user')
      .where('user.ref_id = :user_id', { user_id }) 
      .getRawMany();

      console.log('Result', results);
    } catch (err) {
      console.log(err, 'err');
    }
  }
}
