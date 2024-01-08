import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CONSTANT_MSG } from 'src/common-dto/const';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  async addUser(@Res() res: any, @Body() body: any) {
    try {
      let resp = await this.userService.addUser(body);
      if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.CREATED) {
        res.status(resp.statusCode).send({ success: resp.message});
      } else {
        res.status(resp.statusCode).send({ error: resp.message });
      }
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }

  @Get('')
  async getUser(@Res() res:any){
    try{
        let resp = await this.userService.getUser()
        // console.log("gw resp",resp)
        if (resp.code == 'ECONNREFUSED') {
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .send({ error: 'Device Microservice ECONNREFUSED' });
          } else if (resp.statusCode === HttpStatus.OK) {
            res.status(resp.statusCode).send({ success: resp.message ,data:resp.data });
          } else {
            res.status(resp.statusCode).send({ error: resp.message });
          }

    }catch(err){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
            statusCode: false,
          });
    }
  }

  @Get('/:id')
  async getUserById(@Res() res:any ,@Param('id') id:number){
    try{
      let resp = await this.userService.getUserById(id)
      if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.OK) {
        res.status(resp.statusCode).send({ success: resp.message ,data:resp.data });
      } else {
        res.status(resp.statusCode).send({ error: resp.message });
      }
    }catch(err){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
            statusCode: false,
          });
    }
  }
}
