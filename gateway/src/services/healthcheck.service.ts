import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, timeout } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class HealthCheckMicroservicesService {
  constructor(
    @Inject('DEVICE_SERVICE') private readonly serviceAProxy: ClientProxy,
  ) {}

  async onModuleInit() {
    console.log(
      (await this.healthCheckReport())
        ? 'Device Module is Online'
        : 'Device Module is Offline',
    );
  }

  onModuleDestroy() {
    this.serviceAProxy.close();
  }

  async healthCheckReport(): Promise<any> {
    const deviceMicroService = await this.serviceAProxy
      .send({ cmd: 'test_microservice' }, {})
      .pipe(
        timeout(1000),
        catchError((val) => {
          return of({ success: false });
        }),
      )
      .toPromise();
    return deviceMicroService.success;
  }
}
