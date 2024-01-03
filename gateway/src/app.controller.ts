import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject('DEVICE_SERVICE') private readonly deviceProxy: ClientProxy,) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  getDataFromService(): Observable<string> {
    return this.deviceProxy.send<string>({ cmd: 'test' }, '');
  }

}
