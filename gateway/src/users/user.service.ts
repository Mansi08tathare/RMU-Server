import { HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { JwtService } from '@nestjs/jwt';
import { CommonService } from "src/common-service/common-service";
import { CONSTANT_MSG } from "src/common-dto/const";

@Injectable()
export class UserService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject('DEVICE_SERVICE')
        private readonly deviceProxy: ClientProxy,
        private readonly commonService:CommonService
        
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

    async getUser(){
        try{
         let resp = await this.deviceProxy.send({cmd:'getUser'},'').toPromise()
         return resp;
        }catch(err){
          console.log("err",err)
          return err;
        }
    }

    async getUserById(id:number){
        try{
         let resp = await this.deviceProxy.send({cmd:'getUserById'},id).toPromise()
         return resp
        }catch(err){
            console.log("err",err)
            return err;
        }
    }

    async deleteUser(id:number){
        try{
            //console.log("id s",id)
         let resp = await this.deviceProxy.send({cmd:'deleteUser'},id).toPromise()
         return resp
        }catch(err){
           console.log("err",err)
           return err;
        }
    }

    async updateUser(id:number,body:any){
        try{
         let resp = await this.deviceProxy.send({cmd:'updateUser'},{id,body}).toPromise()
         return resp;
        }catch(err){
            console.log("err",err)
            return err;
        }
    }

    async loginUser(userDto: { email: string; password: string }) {
        const { email, password } = userDto;
    
        try {
    
          const response = await this.deviceProxy.send({ cmd: 'login' }, { email, password }).toPromise();
          console.log("gw data ", response)
          console.log("response",response)
        
          // let permissions = await this.deviceProxy.send({cmd:'getUserPermissions'},)
          
          
          //  if (response && response.loggedIn){
         if(response && response.statusCode === HttpStatus.OK) {
            let jwtPl = {
              username: email,
            //   role: response.user.role,
            role: response.data.role,
             
              // id:response.user.id
            }
            console.log(response.role,response.data.role)
            const token = this.generateToken(jwtPl);
            console.log("token:", token)
             return this.commonService.successMessage(
                { access_token: token },
                CONSTANT_MSG.TOKEN_GENERATED_SUCCESSFULLY,
                HttpStatus.OK
             )
           // return { access_token: token };
          } else {
            return this.commonService.errorMessage(
                [],
                // CONSTANT_MSG.INVALID_CREDENTIALS,
                // HttpStatus.UNAUTHORIZED
                response.message,
                response.statusCode
            )
           
          }
        } catch (err) {
          console.log(err)
        
        //   throw new UnauthorizedException('Failed to authenticate user');
        return this.commonService.errorMessage(
            [],
            CONSTANT_MSG.INTERNAL_SERVER_ERR,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    
      generateToken(payload: { username: string, role: string }): string {
        try {
            
          return this.jwtService.sign(payload);
        } catch (err) {
          console.log(err)
        }
      }

}