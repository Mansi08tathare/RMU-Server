import {Body,Controller,HttpStatus,Post,Res,Req,ValidationPipe,Get,Param, Query, Put, Delete,
} from '@nestjs/common';
import { DeviceService } from '../services/device.service';
import { CONSTANT_MSG } from 'src/common-dto/const';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeviceDto } from '../dtos/device.dto';

@Controller()
@ApiTags('Device')

export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  
  @Post('register')
  @ApiOperation({ summary: 'Register a device' })
  @ApiBody({ type: DeviceDto }) 
  @ApiResponse({ status: HttpStatus.OK, description: 'Device registered successfully' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  async registerdevice(
    @Body(new ValidationPipe()) body: DeviceDto,
    @Res() res: any,
   // @Req() req: any,
  ) {
    try {
      const device = await this.deviceService.registerDevice(body);

      console.log("res",res)
      //console.log("gc",device)
      if (device.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'device MicroService ECONNREFUSED' });
      } else {
        console.log('gateway');
        console.log(device.statusCode, device.message);
        res.status(device.statusCode).send({ message: device.message });
      }
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }

  @Get('channel/:CHANNELID/messages')
  @ApiOperation({ summary: 'Get messages from a channel' })
  @ApiParam({ name: 'CHANNELID', description: 'ID of the channel' })
  @ApiQuery({ name: 'subtopic', required: false, description: 'Subtopic filter' })
  async getChannel(@Param() param: any, @Query() query: any) {
    try {
      console.log('channel', param.CHANNELID);
      console.log('ps', query.subtopic);
      console.log('from', query.from);
      console.log('to', query.to);
      let channel = param.CHANNELID;
      const get = await this.deviceService.getDevice(channel);
    } catch (err) {
      console.log(err);
    }
  }

  @Get('regDevice')
  @ApiOperation({ summary: 'Get registered devices' })
  async getRegisteredDevice(@Req() req: any, @Res() res: any) {
    try{
    console.log('req.user', req.query);
    let limit = 100;
    let offset = 0;
    if (req.query?.limit && req.query?.offset) {
      limit = req.query.limit;
      offset = req.query.offset;
    }

    let resp = await this.deviceService.getRegisteredDevice(limit, offset);
    if (resp.code == 'ECONNREFUSED') {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: 'device MicroService ECONNREFUSED' });
    } else {
      console.log('getRegisteredDevice');
      console.log(resp.statusCode, resp.message);
      res
        .status(resp.statusCode)
        .send({ message: resp.message, data: resp.data });
    }
  }catch(err){
    console.log("gc",err)
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
      statusCode: false,
    });
  }
  }

  @Get('regDevice/:ref_id')
  @ApiParam({name:'ref_id'})
  @ApiOperation({ summary: 'Get device by ref_id' })
  async getRegDeviceById(@Res() res: any, @Param() param: any) {
    console.log('ref_id', param.ref_id);

    let ref_id = param.ref_id;
    let resp = await this.deviceService.getRegDeviceById(ref_id);
    if (resp.code == 'ECONNREFUSED') {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: 'device MicroService ECONNREFUSED' });
    } else {
      console.log('getRegisteredDeviceById');
      console.log(resp.statusCode, resp.message);
      res
        .status(resp.statusCode)
        .send({ message: resp.message, data: resp.data });
    }
  }

  @Get('regDevice/imei/:imei')
  @ApiOperation({ summary: 'Get device by IMEI' })
  async getRegDeviceByImei(@Res() res: any, @Param() param: any) {
    // console.log("res",res)
   
    console.log('imei', param.imei);
    let imei = param.imei;
    let resp = await this.deviceService.getRegDeviceByImei(imei);
    if (resp.code == 'ECONNREFUSED') {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: 'device MicroService ECONNREFUSED' });
    } else {
      console.log('getRegisteredDeviceById');
      console.log(resp.statusCode, resp.message);
      res
        .status(resp.statusCode)
        .send({ message: resp.message, data: resp.data });
    }
  }

  //no working
  // @Get('refid/:deviceRefId')
  // async getRefId(@Param() param:any){
  //   try{
  //     let deviceRefId = param.deviceRefId
  //     let resp = await this.deviceService.getRefId(deviceRefId);
  //     return resp
  //   }catch(err)
  //   {
  //     console.log(err)
  //     return "error"
  //   }
  // }

  @Put('/register')
  @ApiOperation({ summary: 'Update a registered device' })
  async updateDevice(@Req() req:any,@Res() res:any){
    try{
    let params:any = req.body;
    const id = req.query.id;
    console.log("update reg",params,id)
    let resp = await this.deviceService.updateRegisteredDevices(params,id);
    if (resp.code == 'ECONNREFUSED') {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: 'device MicroService ECONNREFUSED' });
    } else {
      console.log('getRegisteredDevice');
      console.log(resp.statusCode, resp.message);
      res
        .status(resp.statusCode)
        .send({ message: resp.message, data: resp.data });
    }
    // console.log('update reg resp',resp)
    // res.status(resp.status).send(resp);
  }catch(err){
    console.log("gc",err)
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
      statusCode: false,
    });
  }
}

@Delete('/reg/:id')
@ApiOperation({ summary: 'Delete a registered device' })
async deleteSimDetail(@Param() param:any,@Req() req:any ,@Res() res:any){
  try{
  console.log('delete device param',param);
  let resp = await this.deviceService.deleteDevice(param.id);
  console.log('delete device resp',resp);
  if (resp.code == 'ECONNREFUSED') {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ error: 'device MicroService ECONNREFUSED' });
  } else if(resp.statusCode === HttpStatus.NO_CONTENT) {
   
    console.log(resp.statusCode, resp.message);
    res
      .status(resp.statusCode)
      .send({ message: resp.message});
  } else{
    res.status(resp.statusCode).send({error:resp.message});
  }
}catch(err){
  console.log(err)
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
    message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
    statusCode: false,
  });
}

}

@Post('/reg/:rid/reassign/:id')
@ApiOperation({ summary: 'Reassign RID for a device' })
async reassignRidDevice(@Param() param:any ,@Res() res:any){
  console.log('reassign rid device param',param);
  let resp = await this.deviceService.reassignRID(Number(param.rid),Number(param.id))
  console.log('reassign rid reps',resp)
  res.status(resp.status).send()
}
}