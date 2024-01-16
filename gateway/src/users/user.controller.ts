import {Body,Controller,Delete,Get,HttpStatus,Param,Post,Put,Res,UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { CONSTANT_MSG } from 'src/common-dto/const';
import { ApiTags, ApiBody, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { UserDto } from './dtos/user.dto';
import { AuthGuard } from '../guards/auth.guard';
import { LoginDto } from './dtos/login.dto';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorator/role.decorator';
import { UserRole } from 'src/enums/enum';


@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  @ApiBody({ type:UserDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User created successfully' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'User creation failed' })
  async addUser(@Res() res: any, @Body() body: UserDto) {
    try {
      let resp = await this.userService.addUser(body);
      if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.CREATED) {
        res.status(resp.statusCode).send({status:resp.statusCode, message: resp.message });
      } else {
        res.status(resp.statusCode).send({status:resp.statusCode, error: resp.message });
      }
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('')
  @ApiResponse({ status: HttpStatus.OK, description: 'User retrieved successfully', type: Object })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'User retrieval failed' })
  async getUser(@Res() res: any) {
    try {
      let resp = await this.userService.getUser();
      // console.log("gw resp",resp)
      if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.OK) {
        res
          .status(resp.statusCode)
          .send({ status:resp.statusCode,message: resp.message, data: resp.data });
      } else {
        res.status(resp.statusCode).send({status:resp.statusCode, error: resp.message });
      }
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }

  
  // @Role(['admin']) 
  //@UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseGuards(RolesGuard,AuthGuard)
  @Roles(UserRole.SUPERADMIN)
  @Get('/:id')
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User retrieved successfully', type: Object })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  async getUserById(@Res() res: any, @Param('id') id: number) {
    try {
      let resp = await this.userService.getUserById(id);
      console.log("resp",resp)
      if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.OK) {
        res
          .status(resp.statusCode)
          .send({ status:resp.statusCode,message:resp.message, data: resp.data });
      } else {
        res.status(resp.statusCode).send({ status:resp.statusCode,error: resp.message });
      }
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }

  @Delete('/:id')
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  async deleteUser(@Res() res: any, @Param('id') id: number) {
    try {
   
      let resp = await this.userService.deleteUser(id);
      console.log('gw resp', resp);
      if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.OK) {
        res.status(resp.statusCode).send({ status:resp.statusCode,message: resp.message });
      } else {
        res.status(resp.statusCode).send({ status:resp.statusCode,error: resp.message });
      }
    } catch (err) {
      console.log('err', err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }

  @Put('/:id')
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({ description: 'User data' })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'User updated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  async updateUser(
    @Param('id') id: number,
    @Res() res: any,
    @Body() body: any,
  ) {
    try {
      console.log('id', id, 'body', body);
      let resp = await this.userService.updateUser(id, body);
      console.log('resp', resp);
      if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.ACCEPTED) {
        res.status(resp.statusCode).send({ status:resp.statusCode,message: resp.message });
      } else {
        res.status(resp.statusCode).send({ status:resp.statusCode,error: resp.message });
      }
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }

  //login

  @Post('/login')
  @ApiBody({ type: LoginDto })
  async loginUser(@Body() userDto: { email: string; password: string },@Res() res:any) {
    try {
      console.log(userDto);
      const resp = await this.userService.loginUser(userDto);

      if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.OK) {
        res
          .status(resp.statusCode)
          .send({ status:resp.statusCode,message: resp.message, data: resp.data });
      } else {
        res.status(resp.statusCode).send({ status:resp.statusCode, error: resp.message });
      }
      console.log("resp",resp)
   
    } catch (err) {
      console.error('Login Error:', err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
   
    }

  }
}
