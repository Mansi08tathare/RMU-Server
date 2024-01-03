import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @MessagePattern({ cmd: 'test' })
  getTask(): string {
    return 'From DEVICE Service';
  }

  //health
  @MessagePattern({ cmd: 'test_microservice' })
  healthCheck(): { success: boolean } {
    console.log('Device microservice is online');
    return { success: true };
  }
}
