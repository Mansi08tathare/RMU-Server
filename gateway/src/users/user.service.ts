import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { JwtService } from '@nestjs/jwt';
import { CommonService } from "src/common-service/common-service";
import { CONSTANT_MSG } from "src/common-dto/const";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('DEVICE_SERVICE')
    private readonly deviceProxy: ClientProxy,
    private readonly commonService: CommonService,
    private readonly configService: ConfigService

  ) { }


  async addUser(body: any) {
    try {
      let resp = await this.deviceProxy.send({ cmd: 'addUser' }, body).toPromise()
      return resp;
    } catch (err) {
      console.log("err", err)
      return err;
    }
  }

  async getUser() {
    try {
      let resp = await this.deviceProxy.send({ cmd: 'getUser' }, '').toPromise()
      return resp;
    } catch (err) {
      console.log("err", err)
      return err;
    }
  }

  async getUserById(id: number) {
    try {
      let resp = await this.deviceProxy.send({ cmd: 'getUserById' }, id).toPromise()
      console.log("resp gw",resp)
      return resp
    } catch (err) {
      console.log("err", err)
      return err;
    }
  }

  async deleteUser(id: number) {
    try {
      //console.log("id s",id)
      let resp = await this.deviceProxy.send({ cmd: 'deleteUser' }, id).toPromise()
      return resp
    } catch (err) {
      console.log("err", err)
      return err;
    }
  }

  async updateUser(id: number, body: any) {
    try {
      let resp = await this.deviceProxy.send({ cmd: 'updateUser' }, { id, body }).toPromise()
      return resp;
    } catch (err) {
      console.log("err", err)
      return err;
    }
  }

  async loginUser(userDto: { email: string; password: string }) {
    const { email, password } = userDto;

    try {

      const response = await this.deviceProxy.send({ cmd: 'login' }, { email, password }).toPromise();
      console.log("gw data ", response)
      // console.log("response", response.data.user_rids)
      // console.log('permission', response.data.permission)

     
       
      if (response && response.statusCode === HttpStatus.OK) {
        let jwtPl = {
          username: email,
          role: response.data.user.role,

        }

        let rids = response.data.user_rids.data;
        console.log("per", response.data.per)
  
        console.log("permission", response.data.per == 0 ? [] : response.data.per[0])
            
        let permission = response.data.per == 0 ? [] : response.data.per[0]
          
        
        console.log(response.role, "role", response.data.user.role)
        console.log("expires", this.configService.get('JWT_EXPIRES_IN'))
        const token = this.generateToken(jwtPl);
        console.log("token:", token)
        return this.commonService.successMessage(
          {
            access_token: token, rids: rids, permission: permission, expiresIn: this.configService.get('JWT_EXPIRES_IN')
          },
          CONSTANT_MSG.TOKEN_GENERATED_SUCCESSFULLY,
          HttpStatus.OK
        )
        // return { access_token: token };
      } else {
        console.log("enter in err", response.message, response.statusCode)
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.INVALID_CREDENTIALS,
          // HttpStatus.UNAUTHORIZED
          // response.message,
          response.statusCode
        )

      }
    } catch (err) {
      console.log("err", err)

      return err;
      // return this.commonService.errorMessage(
      //     [],
      //     CONSTANT_MSG.INTERNAL_SERVER_ERR,
      //     HttpStatus.INTERNAL_SERVER_ERROR,
      //   );
    }
  }

  generateToken(payload: { username: string, role: string }): string {
    try {

      return this.jwtService.sign(payload);
    } catch (err) {
      console.log(err)
      return err
    }
  }

}