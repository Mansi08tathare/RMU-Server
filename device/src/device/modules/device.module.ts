import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceController } from 'src/device/controllers/device.controller';
import { Device } from 'src/device/entities/device.entity';
import { DeviceRid } from 'src/device/entities/rid.device.entity';
import { Rid } from 'src/device/entities/rid.entity';
import { RidConfig } from 'src/device/entities/rid_config.entity';
import { RidService } from 'src/rid/services/rid.service';
import { CommonService } from 'src/device/services/common-service';
import { DeviceService } from 'src/device/services/device.service';

import { FluxService } from '../services/flux.service';
import { StateService } from '../../portals/states/state.service';
import { VendorService } from '../../portals/vendors/vendor.service';
import { State } from '../entities/state.entity';
import { Vendor } from '../entities/vendor.entity';
import { FlowFormula } from '../entities/flow_formula.entity';
import { Invalid } from '../entities/invalids.entity';
import { ReconfigurationDetail } from '../entities/reconfiguration_details';
import { ReconfigurationOldConfig } from '../entities/reconfiguration_old_config.entity';
import { ConfigTable } from '../entities/config.entity';
import { ConfigService } from '../services/config.service';
import { DeviceStatusService } from '../services/device.status.service';
import { YearMonth } from '../entities/year_month.entity';
import { DateEntity } from '../entities/date.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Device,Rid,RidConfig,DeviceRid,ConfigTable,FlowFormula,Invalid,ReconfigurationDetail,ReconfigurationOldConfig,State,Vendor,YearMonth,DateEntity]),

    ClientsModule.register([
      {
        name: 'DEVICE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      },
    ]),
    // RidService
  ],
  controllers: [DeviceController],
  providers: [DeviceService,CommonService,RidService,FluxService,StateService,VendorService,ConfigService,DeviceStatusService],
})
export class DeviceModule {}
