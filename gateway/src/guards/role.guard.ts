import {
    ExecutionContext,
    Injectable,
    HttpException, HttpStatus, CanActivate
  } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/enums/enum';
import { JwtPayload } from 'src/payload/jwt.payload';
  
@Injectable()
  export class RolesGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) { }
    canActivate(context: ExecutionContext) {
        //  try{
      console.log("User ")
      const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());

      console.log("roles",roles)
      if(!roles || roles.length === 0) {
        return true;
      }
      
      const request = context.switchToHttp().getRequest();
      console.log("request",request.user)
      const user:JwtPayload = request.user;
      // const user: JwtPayload = request.user;
    
      console.log('Decoded Token:', user);
      

      const hasRole = () => roles.indexOf(user.role) >= 0;
      // console.log("user",user)
      if(user && user.role && hasRole()) {
        console.log("true")
        return true;
      }
      throw new HttpException('You do not have permission ', HttpStatus.UNAUTHORIZED); 

    // }catch(err){
    //   console.log("err",err)
    // }
  }

  }