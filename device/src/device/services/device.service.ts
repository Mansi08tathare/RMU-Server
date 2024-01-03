import { HttpStatus, Injectable } from '@nestjs/common';
import { cDevice } from 'src/device/interfaces/device.interface';
import { CommonService } from './common-service';
import { CONSTANT_MSG } from 'src/common-dto/const';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from 'src/device/entities/device.entity';
import { Repository, Equal } from 'typeorm';
import { RidService } from 'src/rid/services/rid.service';
//import { RidDeviceTableEntity } from 'src/device/entities/rid.device.entity';
import { ConfigTable } from '../entities/config.entity';
import { RidConfig } from '../entities/rid_config.entity';
import { ReconfigurationDetail } from '../entities/reconfiguration_details';
import { ConfigService } from './config.service';
import { StateService } from '../../portals/states/state.service';
import { VendorService } from '../../portals/vendors/vendor.service';
import { FluxCloud } from '../enums/enum';
import { FluxService } from './flux.service';
import { Invalid } from '../entities/invalids.entity';
import { Rid } from '../entities/rid.entity';
import { error } from 'console';
import { State } from '../entities/state.entity';
import { Vendor } from '../entities/vendor.entity';
import { MessagePattern } from '@nestjs/microservices';
import { DeviceRid } from '../entities/rid.device.entity';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
    @InjectRepository(DeviceRid)
    private readonly ridDeviceRepository: Repository<DeviceRid>,
    @InjectRepository(ConfigTable)
    private readonly configRepository: Repository<ConfigTable>,
    @InjectRepository(RidConfig)
    private readonly ridConfigRepository: Repository<RidConfig>,
    @InjectRepository(Invalid)
    private readonly invalidRepository: Repository<Invalid>,
    private readonly commonService: CommonService,
    private readonly ridService: RidService,
    @InjectRepository(ReconfigurationDetail)
    private readonly reconfigurationRepository: Repository<ReconfigurationDetail>,
    private readonly configService: ConfigService,
    private readonly stateService: StateService,
    private readonly vendorService: VendorService,
    private readonly flux: FluxService,
    @InjectRepository(Rid)
    private readonly ridRepository: Repository<Rid>,
  ) {
    //this.ridService.addRID('XI30837','1165')
    // this.getRID(1165);
    //this.vendorService.addVendorStateIfNotExist('solex',2)
    // this.getDeviceRidEntry(1165)
    // this.updateRidToDevice(7989,7000,7654326754128888)
    //this.deleteRidDevice(106);
  }

  getHello(): string {
    return 'Hello World!';
  }

  async registerDevice(configD: cDevice) {
    try {
      // console.log("config",configD)
      let device = await this.getRegisteredDeviceByImei(configD.IMEI);
      console.log('deviceee', device.data);
      if (device.statusCode === HttpStatus.OK) {
        if (device.data.length === 0) {
          console.log('New Registration');
          return await this.newRegistration(configD);
        } else {
          console.log('Already Registered');
          console.log(configD, 'de', device.data[0]);
          //console.log(Device.ref_id)
          return await this.updateAlreadyRegistered(configD, device.data[0]);
          // return this.commonService.successMessage(
          //   '',
          //   CONSTANT_MSG.DEVICE_ALREADY_EXISTS,
          //   HttpStatus.BAD_REQUEST,
          // );
        }
      } else {
        return this.commonService.errorMessage(
          '',
          CONSTANT_MSG.FAILED_TO_GET_DETAIL,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      return this.commonService.errorMessage(
        '',
        CONSTANT_MSG.UNABLE_TO_REGISTERED_DEVICE,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getRegisteredDeviceByImei(imei: string) {
    try {
      console.log('imei', imei);
      let query = await this.deviceRepository.find({ where: { imei } });
      console.log('query', query);
      //query.length===0
      if (!query) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.UNABLE_TO_REGISTERED_DEVICE,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          query,
          CONSTANT_MSG.ID_OK,
          HttpStatus.OK,
        );
      }
    } catch (err) {
      console.log(err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.UNABLE_TO_REGISTERED_DEVICE,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async newRegistration(config: cDevice): Promise<any> {
    try {
      console.log('new registration');
      console.log('config', config.RID_no, config.CONT_MFR);
      let r1 = await this.ridService.addRID(config.RID_no, config.CONT_MFR);
      let rid_ref_id = r1.id;
      let _rid = r1.rid;

      console.log('r1', r1);

      console.log('r1', r1.data);
      // console.log('status', r1.statusCode);
      //console.log("r1abc", r1.data[0]?.ref_id);
      if (
        r1.statusCode === HttpStatus.CREATED ||
        r1.statusCode === HttpStatus.CONFLICT
      ) {
        console.log('enter with status conflict ');
        let ridConnExist = await this.getDeviceRidEntry(r1.data);
        console.log('ridConnExist', ridConnExist);
        if (ridConnExist.statusCode === HttpStatus.OK) {
          let c_ref_id;
          if (ridConnExist.data.length === 0) {
            console.log('addupdate');
            let c = await this.addUpdateConfiguration(config, r1.data);
            console.log('c', c);
            console.log('c.data', c.data.ref_id);
            if (c.statusCode === HttpStatus.OK) {
              //id
              c_ref_id = c.data.ref_id;
            } else {
              return await this.commonService.errorMessage(
                [],
                CONSTANT_MSG.FAILED_TO_ADD_CONFIG,
                HttpStatus.BAD_REQUEST,
              );
            }
          } else {
            //device_reg_ref_id
            let device_ref_id = ridConnExist.data[0].device_reg_ref_id;
            let c = await this.reconfigure(
              config,
              rid_ref_id,
              device_ref_id,
              _rid,
            );
            console.log('rec c', c);
            if (c.statusCode === HttpStatus.OK) {
              c_ref_id = c.data;
            } else {
              return this.commonService.errorMessage(
                [],
                CONSTANT_MSG.FAILED_TO_RECONFIGURE,
                HttpStatus.BAD_REQUEST,
              );
            }
          }
          //add flow formulaa
          let ff = await this.configService.addFlowFormula(
            config.Fcode,
            config.D_op,
          );
          console.log('ff', ff);
          if (ff.statusCode === HttpStatus.CONFLICT) {
            await this.configService.updateFlowFormula(
              config.Fcode,
              config.D_op,
              //needto pass ref_id or id confirm
              ff.data.id,
            );
          }

          //update /add state and vendor
          let s = await this.stateService.addStateIfNotExist(
            config.State.toLowerCase(),
          );
          console.log('state', s);
          let v = await this.vendorService.addVendorStateIfNotExist(
            config.Vendor.toLowerCase(),
            s.data,
          );
          console.log('name', config.Vendor.toLowerCase());
          console.log('vendor_ds', v);
          console.log(v.data.ref_id);
          console.log('device_pl');

          let device_pl = {
            state: s.data,
            vendor: v.data.ref_id,
            rid: r1.data,
            config: c_ref_id,
            flux_t_id: '',
            flux_t_key: '',
            flux_c_id: '',
            cloud_username: config.cloud_username ? config.cloud_username : '',
            cloud_password: config.cloud_password ? config.cloud_password : '',
            cloud_client_id: config.cloud_client_id
              ? config.cloud_client_id
              : '',
            imei: config.IMEI.toString(),
            // flux_status: false,
            // cloud_status: false, // based on whether cloud credentials exist or not
            flux_status: false,
            cloud_status: false,
            fwv_ver: '',
            broker_url: config.broker_url ? config.broker_url : '',
            port: config.port ? config.port : '',
            topic: config.topic ? config.topic : '',
            registeredTime: config.Dt + ' ' + config.Time,
            usercode: config.U_code ? config.U_code : '',
            username: config.U_name ? config.U_name : '',
          };
          console.log('device_pl', device_pl);

          let credentials = await this.generateFluxcredentials(device_pl.imei);

          console.log('cred', credentials);
          if (credentials.statusCode === HttpStatus.ACCEPTED) {
            device_pl.flux_t_id = credentials.data.flux_t_id;
            device_pl.flux_t_key = credentials.data.flux_t_key;
            // device_pl.flux_c_id = credentials.data.flux_c_id;
            device_pl.flux_c_id = '';

            device_pl.flux_status = true;
            let rid_ref_id = r1.data;
            console.log('channel', credentials.data.flux_c_id);
            console.log('generation of flux successfully');
            let d = await this.insertDevice(device_pl, rid_ref_id);
            // check d.id
            if (d.statusCode === HttpStatus.CREATED) {
              //check data.id once
              console.log('check', d.data, device_pl.rid);
              let devRidConn = await this.ridToDevice(d.data, device_pl.rid);
              if (devRidConn.statusCode === HttpStatus.OK) {
                await this.removeFromInvalids(device_pl.imei);
                return this.commonService.successMessage(
                  '',
                  CONSTANT_MSG.SUCCESSFULLY_DEVICE_REGISTERED,
                  HttpStatus.CREATED,
                );
              } else {
                ///d.data takn but empty return
                let r = await this.removeDeviceByID(d.data.id);
                if (r.statusCode === HttpStatus.NO_CONTENT) {
                  await this.removefromFlux(
                    device_pl.flux_t_id,
                    device_pl.flux_c_id,
                  );
                }
                return this.commonService.errorMessage(
                  '',
                  CONSTANT_MSG.FAILED_TO_CONNECT_DEVICE,
                  HttpStatus.BAD_REQUEST,
                );
              }
            } else {
              let r = await this.removeDeviceByID(d.data.id);
              if (r.statusCode === HttpStatus.NO_CONTENT) {
                await this.removefromFlux(
                  device_pl.flux_t_id,
                  device_pl.flux_c_id,
                );
              }
              return this.commonService.errorMessage(
                '',
                CONSTANT_MSG.FAILED_TO_ADD_DEVICE,
                HttpStatus.BAD_REQUEST,
              );
            }
          } else {
            return this.commonService.errorMessage(
              '',
              CONSTANT_MSG.FAILED_TO_GENERATE_FLUX_CREDENTIALS,
              HttpStatus.BAD_REQUEST,
            );
          }
        } else {
          return this.commonService.errorMessage(
            '',
            CONSTANT_MSG.FAILED_TO_GET_RID_DEVICE_CONNECTION_DETAILS,
            HttpStatus.BAD_REQUEST,
          );
        }
      } else {
        return this.commonService.errorMessage(
          '',
          CONSTANT_MSG.FAILED_TO_ADD_RID_no,
          HttpStatus.BAD_REQUEST,
        );
      }

      //  else{
      //   let device_ref_id = ridConnExist.data[0]
      //  }
    } catch (error) {
      console.log('newREg', error.message);
      return this.commonService.errorMessage(
        '',
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  ////// working

  async getDeviceRidEntry(rid_ref_id: any) {
    try {
      console.log('getDeviceRid', rid_ref_id);
      // let qresp = await this.ridDeviceRepository.find({
      //   where: { rids:rid_ref_id } ,
      // });
      //workinggg..............................................................
      // let qresp = await this.ridDeviceRepository.find({
      //   where: { rids: { ref_id: rid_ref_id } },
      let qresp = await this.ridDeviceRepository.find({
        where: { rid: { ref_id: rid_ref_id } },
      });
      console.log('qresp', qresp);

      if (!qresp) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FETCH_ERROR,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          qresp,
          CONSTANT_MSG.ID_OK,
          HttpStatus.OK,
        );
      }
    } catch (err) {
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // async getDeviceRidEntry(rid_ref_id: any,config:any) {
  //   try {
  //     console.log('getDeviceRid', rid_ref_id);

  //     let qresp = await this.ridDeviceRepository.find({
  //       where: { rids: { ref_id: rid_ref_id } },
  //     });
  //     console.log('qresp', qresp);

  //     if(!qresp && qresp.length == 0){
  //       return this.commonService.errorMessage(
  //         [],
  //         CONSTANT_MSG.ID_NOT_FOUND,
  //         HttpStatus.NOT_FOUND
  //       )
  //     }else{
  //       return this.commonService.successMessage(
  //         qresp,
  //         CONSTANT_MSG.ID_OK,
  //         HttpStatus.OK
  //       )
  //     }
  //     let qresp = await this.ridService.checkDeviceRidExist(rid_ref_id);
  //     console.log('checkdeviceridexist',qresp);

  //     if(qresp.statusCode === HttpStatus.OK){
  //       return this.commonService.successMessage(
  //         qresp,
  //         CONSTANT_MSG.ID_OK,
  //         HttpStatus.OK
  //       )
  //     }else if(qresp.statusCode === HttpStatus.NOT_FOUND){
  //       let deviceResp= await this.insertDeviceRid(rid_ref_id,)
  //     }

  //   } catch (err) {
  //     return this.commonService.errorMessage(
  //       [],
  //       CONSTANT_MSG.INTERNAL_SERVER_ERR,
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  async addUpdateConfiguration(config: cDevice, rid_ref_id: any) {
    try {
      // return configuration ref_id
      let c_ref_id;
      //tested
      console.log('addUpdateConfiguration');
      console.log('addupdate', rid_ref_id);
      let checkRidConfig =
        await this.ridService.checkConfigRidExist(rid_ref_id);
      console.log('checkRidConfig', checkRidConfig);

      if (checkRidConfig.statusCode === HttpStatus.OK) {
        await this.updateConfig(config, checkRidConfig.data.config_ref_id);
        c_ref_id = checkRidConfig.data.config_ref_id;
        return this.commonService.successMessage(
          c_ref_id,
          CONSTANT_MSG.CONFIG_UPDATED,
          HttpStatus.OK,
        );
      } else if (checkRidConfig.statusCode === HttpStatus.NOT_FOUND) {
        // console.log("enter to insert config")
        let configResp = await this.insertConfig(config);
        console.log('Add config', configResp);
        if (configResp.statusCode === HttpStatus.CREATED) {
          console.log('enter to add rid', configResp.data.ref_id);
          c_ref_id = configResp.data.ref_id; //id
          console.log('config_ref_id', c_ref_id);
          let addRidConfig = await this.addRIDConfig(rid_ref_id, c_ref_id);
          console.log('addRidConfig', addRidConfig);
          return addRidConfig;
        } else {
          console.log('unable to insertConfig');
        }
      } else {
        console.log(error, 'else block');
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.ERROR_WHLE_ADDUPDATECONFIGURATION,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      console.log(err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateConfig(d: cDevice, id: any) {
    //let cr= await this.configRepository.update()
    try {
      const result = await this.configRepository
        .createQueryBuilder()
        .update('config_tbl')
        .set({
          FCODE: d.Fcode,
          Motor_type: d.M_type,
          PCNTRMODE1: d.pcntrmode1,
          PCID: d.Cont_no,
          SPCLPREFFREQ1: d.spclpreffreq1,
          PDCVOC1: d.PDCVOC1,
          PMAXDCV1: d.PMAXDCV1,
          PMAXDCI1: d.PMAXDCI1,
          PDCISC: d.PDCISC,
          PHEAD: d.R_head,
          STINTERVAL: d.sinterval,
          PFREQHSP1: d.PFREQHSP1,
          PMAXFREQ1: d.PMAXFREQ1,
          PFREQLSP1: d.PFREQLSP1,
          POWER0: d.P0,
          POWER1: d.P1,
          POWER2: d.P2,
          POWER3: d.P3,
          POWER4: d.P4,
          POWER5: d.P5,
          FLOW1: d.F1,
          FLOW2: d.F2,
          FLOW3: d.F3,
          FLOW4: d.F4,
          FLOW5: d.F5,
          PMAXFLW1: d.PMAXFLW1,
          PMAXKW1: d.PMAXKW1,
          PREFFREQ1: d.PREFFREQ1,
          Pump_type: d.P_type,
          HP: d.HP,
          Panel_wp: d.P_wp,
          rmu_ver: d.rmu_ver,
          rmu_rev: d.rmu_rev,
          rmu_srno: d.rmu_srno,
          Board_ver: d.Brd_ver,
          Board_rev: d.Brd_rev,
          Board_date: d.Brd_date,
          Board_pcbno: d.Brd_pcbno,
          Head1: d.H1,
          Head2: d.H2,
          Head3: d.H3,
          Head4: d.H4,
          DFactor1: d.DF1,
          DFactor2: d.DF2,
          DFactor3: d.DF3,
          DFactor4: d.DF4,
        })
        .where('ref_id = :id', { id })
        .execute();
      if (!result) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FAILED_TO_UPDATE_CONFIG,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          result,
          CONSTANT_MSG.CONFIG_UPDATED,
          HttpStatus.OK,
        );
      }
    } catch (error) {
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async insertConfig(d: cDevice) {
    try {
      const result = await this.configRepository.save(d);
      console.log('result', result);
      if (!result) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FAILED_TO_ADD_CONFIG,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          result,
          // CONSTANT_MSG.FAILED_TO_ADD_CONFIG,
          // HttpStatus.BAD_REQUEST,
          CONSTANT_MSG.ADDED_CONFIG,
          HttpStatus.CREATED,
        );
      }
    } catch (error) {
      console.log('config_inserterr', error);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addRIDConfig(rid_ref_id: any, config_ref_id: any): Promise<any> {
    try {
      console.log('rid_ref', rid_ref_id, 'config', config_ref_id);
      let result = await this.ridConfigRepository.save({
        rid: rid_ref_id,
        config: config_ref_id,
      });
      console.log('adad', result);
      if (!result) {
        console.log('not eql to result');
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FAILED_TO_ADD_CONNECTION,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        console.log('eql to result');
        // return Promise.resolve(result);
        return this.commonService.successMessage(
          result,
          CONSTANT_MSG.CONNECTION_ADDED_SUCCESSFULLY,
          HttpStatus.OK,
        );
      }
    } catch (err) {
      console.log(err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async reconfigure(
    config: cDevice,
    rid_ref_id: any,
    device_ref_id: any,
    rid: any,
  ) {
    try {
      let c_ref_id;
      let c = await this.addUpdateConfiguration(config, rid_ref_id);
      console.log('c', c);
      if (c.statusCode === HttpStatus.OK) {
        c_ref_id = c.data.id;
      } else {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FAILED_TO_ADD_CONFIG,
          HttpStatus.BAD_REQUEST,
        );
      }
      let delinkRidDevice = await this.removeRidDeviceConnection(
        rid_ref_id,
        device_ref_id,
      );
      console.log('removeRidDeviceConnection', delinkRidDevice);
      if (delinkRidDevice.statusCode === HttpStatus.OK) {
        let d = await this.getDeviceByID(device_ref_id);
        console.log('getDeviceByID', d);
        if (d.statusCode === HttpStatus.OK && d.data.length > 0) {
          let recnfd = await this.addReconfigurationDetails(
            rid,
            d.data[0].imei,
            config,
          );
          let recnf = await this.addReconfigurationConfig(
            rid,
            d.data[0].imei,
            c_ref_id,
          );
          console.log('addReconfigurationDetails', recnfd, recnf);
          if (
            recnf.statusCode === HttpStatus.OK &&
            recnfd.statusCode === HttpStatus.OK
          ) {
            return this.commonService.successMessage(
              [],
              CONSTANT_MSG.SUCCESSFULLY_RECONFIG,
              HttpStatus.OK,
            );
          } else {
            return this.commonService.successMessage(
              [],
              CONSTANT_MSG.FAILED_TO_ADD_RECONFIG_DETAILS,
              HttpStatus.BAD_REQUEST,
            );
          }
        } else {
          let recnfd = await this.addReconfigurationDetails(
            rid,
            config.IMEI,
            config,
          );
          let recnf = await this.addReconfigurationConfig(
            rid,
            config.IMEI,
            c_ref_id,
          );
          if (
            recnf.statusCode === HttpStatus.OK &&
            recnfd.statusCode === HttpStatus.OK
          ) {
            return this.commonService.successMessage(
              c_ref_id,
              CONSTANT_MSG.SUCCESSFULLY_RECONFIG,
              HttpStatus.OK,
            );
          } else {
            return this.commonService.errorMessage(
              '',
              CONSTANT_MSG.FAILED_TO_ADD_RECONFIG_DETAILS,
              HttpStatus.BAD_REQUEST,
            );
          }
        }
      } else {
        return this.commonService.errorMessage(
          '',
          CONSTANT_MSG.FAILED_TO_DELINK_RID_AND_DEVICE,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      return this.commonService.errorMessage(
        '',
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeRidDeviceConnection(rid_ref_id: any, device_ref_id: any) {
    try {
      //  await this.ridDeviceRepository.delete({ rid_ref_id, device_reg_ref_id: device_ref_id });
      // await this.ridDeviceRepository.delete({
      //   rid_ref_id: rid_ref_id as number,
      //   device_reg_ref_id: device_ref_id as number,
      let r = await this.ridDeviceRepository
        .createQueryBuilder()
        .delete()
        .from(DeviceRid)
        .where(
          'rid_ref_id = :rid_ref_id AND device_reg_ref_id = :device_ref_id',
          {
            rid_ref_id,
            device_ref_id,
          },
        )
        .execute();
      console.log('Delete CONN', r);
      if (!r) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FAILED_TO_REMOVE_DEVICE_CONNECTION,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          ' ',
          CONSTANT_MSG.SUCCESFULLY_REMOVED_DEVICE_CONNECTION,
          HttpStatus.OK,
        );
      }
    } catch (err) {
      return this.commonService.errorMessage(
        '',
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getDeviceByID(id: any) {
    try {
      let query = await this.deviceRepository.find({ where: { ref_id: id } });
      if (!query) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FETCH_ERROR,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          query,
          CONSTANT_MSG.ID_OK,
          HttpStatus.OK,
        );
      }
    } catch (err) {
      return this.commonService.errorMessage(
        '',
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addReconfigurationDetails(rid: any, imei: any, config: cDevice) {
    try {
      let r_time = config.Dt + ' ' + config.Time;
      console.log('r_time', r_time);
      // let query= await this.reconfigurationRepository.save({})
      ////............need to test
      const reconfigurationDetail = new ReconfigurationDetail();
      reconfigurationDetail.rid = rid;
      reconfigurationDetail.imei = imei;
      reconfigurationDetail.updated_entity = config.RID_no + '_' + config.IMEI;
      reconfigurationDetail.username = config.U_name;
      reconfigurationDetail.userid = config.U_code;
      reconfigurationDetail.request_time = r_time;
      reconfigurationDetail.server_time = new Date();

      let r = await this.reconfigurationRepository.save(reconfigurationDetail);
      if (!r) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FAILED_TO_ADD_CONFIGURATAION_DETAILS,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          [],
          CONSTANT_MSG.SUCCESSFULLY_ADDED_RECONFIGURATION_DETAILS,
          HttpStatus.OK,
        );
      }
    } catch (err) {
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addReconfigurationConfig(rid: any, imei: any, config_ref_id: any) {
    try {
      const configData = await this.getConfigData(config_ref_id);
      //...........use map
      const query = configData.map((config) => ({
        FCODE: config.FCODE,
        Motor_type: config.Motor_type,
        PCNTRMODE1: config.PCNTRMODE1,
        PCID: config.PCID,
        SPCLPREFFREQ1: config.SPCLPREFFREQ1,
        PDCVOC1: config.PDCVOC1,
        PMAXDCV1: config.PMAXDCV1,
        PMAXDCI1: config.PMAXDCI1,
        PDCISC: config.PDCISC,
        PHEAD: config.PHEAD,
        STINTERVAL: config.STINTERVAL,
        PFREQHSP1: config.PFREQHSP1,
        PMAXFREQ1: config.PMAXFREQ1,
        PFREQLSP1: config.PFREQLSP1,
        POWER0: config.POWER0,
        POWER1: config.POWER1,
        POWER2: config.POWER2,
        POWER3: config.POWER3,
        POWER4: config.POWER4,
        POWER5: config.POWER5,
        FLOW1: config.FLOW1,
        FLOW2: config.FLOW2,
        FLOW3: config.FLOW3,
        FLOW4: config.FLOW4,
        FLOW5: config.FLOW5,
        PMAXFLW1: config.PMAXFLW1,
        PMAXKW1: config.PMAXKW1,
        PREFFREQ1: config.PREFFREQ1,
        Pump_type: config.Pump_type,
        HP: config.HP,
        Panel_wp: config.Panel_wp,
        rid: rid,
        imei: imei,
      }));

      let queryresp = await this.reconfigurationRepository.save(query);

      if (!queryresp) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FAILED_TO_ADD_RECONFIG_DETAILS,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          [],
          CONSTANT_MSG.ADDED_RECONFIG_DETAILS,
          HttpStatus.OK,
        );
      }
    } catch (err) {
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getConfigData(config_ref_id: number): Promise<ConfigTable[]> {
    try {
      return this.configRepository.find({ where: { ref_id: config_ref_id } });
    } catch (err) {
      return err;
    }
  }

  //commented for testing purpose
  async generateFluxcredentials(imei: string) {
    try {
      console.log('generateFlux');
      let device_pl: any = {
        imei: imei.toString(),
        flux_t_id: '',
        flux_t_key: '',
        flux_c_id: '',
      };

      let auth = await this.flux.GetAuthKey(FluxCloud.EMAIL, FluxCloud.PWD);
      console.log('Token', auth);
      console.log('Token', auth.data);
      if (auth.statusCode === HttpStatus.CREATED) {
        let t = await this.flux.AddThing(device_pl.imei, auth.data);
        console.log('auth.data', auth.data);
        console.log('thing', t);
        if (t.statusCode === HttpStatus.CREATED) {
          device_pl.flux_t_id = t.data.thingid;
          device_pl.flux_t_key = t.data.thingkey;
          // device_pl.flux_t_id = t.data.things[0].id;
          // device_pl.flux_t_key = t.data.things[0].key;

          let c = await this.flux.AddChannel(device_pl.imei, auth.token);
          console.log('newChannel', c.data);
          console.log('channel', c);
          // if(c.statusCode === HttpStatus.OK){
          //   return this.commonService.successMessage(device_pl,
          //     CONSTANT_MSG.SUCCESSFULLY_CONNECTED_CHANNEL_TO_THINGS,
          //     HttpStatus.ACCEPTED)
          // }
          if (c.statusCode === HttpStatus.CREATED) {
            console.log('enter in flux');
            console.log('flux_c_id', device_pl.flux_c_id);
            console.log('data.channelId', c.data);
            device_pl.flux_c_id = c.data.channelId;
            let tc = await this.flux.ConnectThingToChannel(
              device_pl.flux_c_id,
              device_pl.flux_t_id,
              auth.token,
            );
            console.log('connect thing and channel', tc);
            if (tc.statusCode === HttpStatus.OK) {
              return this.commonService.successMessage(
                device_pl,
                CONSTANT_MSG.CONNECTED,
                HttpStatus.ACCEPTED,
                //error
              );
            } else {
              //give a try
              //fail to connect
              await this.removefromFlux(
                device_pl.flux_t_id,
                device_pl.flux_c_id,
              );
              return this.commonService.errorMessage(
                device_pl,
                CONSTANT_MSG.UNSUCCESSFULL,
                HttpStatus.BAD_REQUEST,
              );
            }
          } else {
            //try
            //fail to add channel
            await this.flux.RemoveThing(device_pl.flux_t_id, auth.token);
            return this.commonService.errorMessage(
              device_pl,
              CONSTANT_MSG.UNSUCCESSFULL,
              HttpStatus.BAD_REQUEST,
            );
          }
        } else {
          //fail to login
          return this.commonService.errorMessage(
            device_pl,
            CONSTANT_MSG.UNSUCCESSFULL,
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    } catch (err) {
      console.log('err in newReg', err);
      return this.commonService.errorMessage(
        '',
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removefromFlux(flux_id: any, flux_cid: any) {
    try {
      // let auth = await this.flux.GetAuthKey(FluxCloud.EMAIL, FluxCloud.PWD);
      // await this.flux.RemoveThing(flux_id, auth.token);
      // await this.flux.RemoveChannel(flux_cid, auth.token);
      // return this.commonService.errorMessage(
      //   '',
      //   CONSTANT_MSG.NO_CONTENT,
      //   HttpStatus.NO_CONTENT,
      // );

      // returning success
      return this.commonService.successMessage(
        '',
        CONSTANT_MSG.SUCCESSFULL,
        HttpStatus.NO_CONTENT,
      );
    } catch (err) {
      console.log('err', err);
      return this.commonService.errorMessage(
        '',
        err.response.status,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async insertDevice(device_pl: any, rid_ref_id: any) {
    try {
      console.log('insert device', device_pl);

      let remark1 = 'Successfully Registered';
      let flux_status = 0;
      let cloud_status = 0;
      let status = 1;
      const newDeviceReg = new Device();
      newDeviceReg.imei = device_pl.imei;
      newDeviceReg.state = device_pl.state_id
      // newDeviceReg.state_id = device_pl.state;
      // newDeviceReg.vendor_id = device_pl.vendor;
      newDeviceReg.vendor=device_pl.vendor_id
      newDeviceReg.flux_username = device_pl.flux_t_id;
      newDeviceReg.flux_password = device_pl.flux_t_key;
      newDeviceReg.flux_clientid = device_pl.flux_c_id
        ? device_pl.flux_c_id
        : '';

      newDeviceReg.cloud_username = device_pl.cloud_username;
      newDeviceReg.cloud_password = device_pl.cloud_password;
      newDeviceReg.cloud_clientid = device_pl.cloud_client_id;
      // newDeviceReg.flux_status = device_pl.flux_status;
      // newDeviceReg.cloud_status = device_pl.cloud_status;
      newDeviceReg.flux_status = flux_status;
      newDeviceReg.cloud_status = cloud_status;
      newDeviceReg.status = status;
      newDeviceReg.remarks = remark1;
      newDeviceReg.creationDate = new Date();
      newDeviceReg.broker_url = device_pl.broker_url;
      newDeviceReg.port = device_pl.port;
      newDeviceReg.info_topic = device_pl.topic;
      newDeviceReg.registeredTime = device_pl.registeredTime;
      newDeviceReg.usercode = device_pl.usercode;
      newDeviceReg.username = device_pl.username;

      console.log('newDeviceReg:', newDeviceReg);

      let dq = await this.deviceRepository.save(newDeviceReg);

      //       // Create a new RidDeviceTableEntity
      // const ridDeviceEntity = new RidDeviceTableEntity();
      // ridDeviceEntity.deviceRegistration = dq; // Associate with the saved Device entity
      // ridDeviceEntity.rids = rid_ref_id; // Assuming r1.data is a valid Rid entity

      // console.log('ridDevice', ridDeviceEntity);

      // // Save the RidDeviceTableEntity
      // const savedRidDevice = await this.ridDeviceRepository.save(ridDeviceEntity);
      // console.log('Saved RidDevice:', savedRidDevice);

      console.log('dq:', dq);

      //check for insertID
      let insertedId = dq.ref_id;

      if (!dq) {
        return this.commonService.errorMessage(
          '',
          CONSTANT_MSG.FAILED_TO_ADD_DEVICE,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          insertedId,
          //  newDeviceReg.ref_id,
          CONSTANT_MSG.SUCCESSFULLY_ADDED_DEVICE,
          HttpStatus.CREATED,
        );
      }
    } catch (err) {
      console.error('Error in insertDevice:', err);
      return this.commonService.errorMessage(
        '',
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  ////..................../////chang accordinly
  async ridToDevice(device_ref_id: any, rid_ref_id: any) {
    try {
      let eresp = await this.getRidDeviceEntry(device_ref_id);
      console.log(device_ref_id, rid_ref_id);
      console.log(eresp.data.length, 'len');
      if (eresp.data.length != 0) {
        await this.updateDeviceRidEntry(device_ref_id, rid_ref_id);
        return this.commonService.successMessage(
          '',
          CONSTANT_MSG.SUCCESSFULLY_UPDATED_RID_DEVICE_ENTRY,
          HttpStatus.OK,
        );
      }
      console.log(device_ref_id, rid_ref_id, 'log');
      let query = await this.ridDeviceRepository.save({
        device: device_ref_id,
        rid: rid_ref_id,
      });

      if (!query) {
        return this.commonService.errorMessage(
          '',
          CONSTANT_MSG.FETCH_ERROR,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          '',
          CONSTANT_MSG.SUCCESSFULLY_INSERT_RID_DEVICE_ENTRY,
          HttpStatus.OK,
        );
      }
    } catch (err) {
      return this.commonService.errorMessage(
        '',
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getRidDeviceEntry(device_ref_id: any) {
    try {
      // let query = await this.ridDeviceRepository.find({where:{device_reg_rf_id:device_ref_id}})
      // const query = await this.ridDeviceRepository.find({
      //   where: {
      //     device: { ref_id: device_ref_id },
      //   },
      // });

      const query = await this.ridDeviceRepository
        .createQueryBuilder('deviceRid')
        .select([
          'deviceRid.ref_id as ref_id',
          'device.ref_id as device_reg_ref_id',
          'rid.ref_id as rid_ref_id',
        ])
        .leftJoin('deviceRid.device', 'device')
        .leftJoin('deviceRid.rid', 'rid')
        .where('device.ref_id = :device_ref_id', {
          device_ref_id: device_ref_id,
        })
        .getRawOne();

      console.log('getRid', query);

      if (!query || query.length === 0) {
        // console.log("lenfth")
        return this.commonService.errorMessage(
          '',
          CONSTANT_MSG.FETCH_ERROR,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          query,
          CONSTANT_MSG.ID_OK,
          HttpStatus.OK,
        );
      }
    } catch (err) {
      return this.commonService.errorMessage(
        '',
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateDeviceRidEntry(device_reg_ref_id: any, rid_ref_id: any) {
    try {
      let query = await this.ridDeviceRepository
        .createQueryBuilder()
        .update(DeviceRid)
        .set({ rid: rid_ref_id })
        .where('device = :device_reg_ref_id', { device_reg_ref_id })
        .execute();

      console.log('query', query);
      if (!query) {
        return this.commonService.errorMessage(
          '',
          CONSTANT_MSG.FETCH_ERROR,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          '',
          CONSTANT_MSG.ID_OK,
          HttpStatus.OK,
        );
      }
    } catch (err) {
      return this.commonService.errorMessage(
        '',
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeFromInvalids(imei: string) {
    try {
      let imeiExist = await this.getInvalidEntry(imei);
      if (imeiExist.statusCode === HttpStatus.OK && imeiExist.data.length > 0) {
        let query = await this.invalidRepository.delete(imei);
        if (!query) {
          return this.commonService.errorMessage(
            '',
            CONSTANT_MSG.FAILED_TO_REMOVED,
            HttpStatus.BAD_REQUEST,
          );
        } else {
          return this.commonService.successMessage(
            '',
            CONSTANT_MSG.SUCCESSFULLY_REMOVED,
            HttpStatus.OK,
          );
        }
      } else {
        return this.commonService.errorMessage(
          '',
          CONSTANT_MSG.ID_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (err) {
      return this.commonService.errorMessage(
        '',
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getInvalidEntry(imei: string) {
    try {
      let query = await this.invalidRepository.find({ where: { imei } });
      if (!query) {
        return this.commonService.errorMessage(
          query,
          CONSTANT_MSG.FETCH_ERROR,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          query,
          CONSTANT_MSG.ID_OK,
          HttpStatus.OK,
        );
      }
    } catch (err) {
      return this.commonService.errorMessage(
        '',
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeDeviceByID(id: any) {
    try {
      // let query = await this.deviceRepository.delete({ where: { ref_id: id } });
      const query = await this.deviceRepository
        .createQueryBuilder()
        .delete()
        .from('device_reg_tbl')
        .where('ref_id = :id', { id: id })
        .execute();

      console.log('query', query);
      if (!query) {
        return this.commonService.errorMessage(
          '',
          CONSTANT_MSG.FETCH_ERROR,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          '',
          CONSTANT_MSG.SUCCESFULLY_REMOVED_DEVICE,
          HttpStatus.NO_CONTENT,
        );
      }
    } catch (err) {
      return this.commonService.errorMessage(
        '',
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateAlreadyRegistered(config: any, registeredDevice: any) {
    try {
      // console.log("update",config,"r",registeredDevice)
      // console.log("update")
      //console.log("registeredDevice",registeredDevice)
      let r1 = await this.ridService.addRID(config.RID_no, config.CONT_MFR);
      console.log('r1', r1);
      //  console.log("rid",r1)
      //console.log('update already registered');
      if (
        r1.statusCode === HttpStatus.CREATED ||
        r1.statusCode === HttpStatus.CONFLICT
      ) {
        let _rid = '';

        console.log('ref_id', registeredDevice.ref_id);

        let getRid = await this.getRID(registeredDevice.ref_id);
        console.log('getRid', getRid);
        console.log('len', getRid.data.length);
        // if (getRid.data.length > 0) {
        if (getRid.data.length > 0) {
          _rid = getRid.data[0].rid;
        }
        let rid_ref_id = r1.data;
        // console.log(r1.ref_id)
        console.log(rid_ref_id, 'rid_ref_id');
        let ridImeiConnExist = await this.getDeviceAndRidEntry(
          registeredDevice.ref_id,
          rid_ref_id,
        );

        console.log('ridImeiConnExist', ridImeiConnExist);
        if (ridImeiConnExist.statusCode === HttpStatus.OK) {
          let c_ref_id;
          if (ridImeiConnExist.data.length <= 1) {
            if (ridImeiConnExist.data.length === 0) {
              let c = await this.addUpdateConfiguration(config, r1.id);
              console.log('cc', c);
              if (c.statusCode === HttpStatus.OK) {
                c_ref_id = c.data.id;
              } else {
                return this.commonService.errorMessage(
                  '',
                  CONSTANT_MSG.FAILED_TO_ADD_CONFIGURATAION,
                  HttpStatus.BAD_REQUEST,
                );
              }
            } else {
              let device_ref_id = ridImeiConnExist.data[0].device_reg_ref_id;
              let c = await this.reconfigure(
                config,
                rid_ref_id,
                device_ref_id,
                _rid,
              );
              console.log('rcc', c);
              if (c.statusCode === HttpStatus.OK) {
                c_ref_id = c.data.id;
              } else {
                return this.commonService.errorMessage(
                  '',
                  CONSTANT_MSG.FAILED_TO_CONFIGURE_DEVICE,
                  HttpStatus.BAD_REQUEST,
                );
              }
            }
          } else {
            await this.addReconfigurationDetails(
              _rid,
              registeredDevice.imei,
              config,
            );

            //  await this.saveForEmailNotification(config);
            //  return this.commonService.errorMessage('',
            //  CONSTANT_MSG.CANNOT_ASSIGN,
            //  HttpStatus.BAD_REQUEST)
          }
          // add Flow Formulaa
          let ff = await this.configService.addFlowFormula(
            config.Fcode,
            config.Days_output,
          );
          if (ff.statusCode === HttpStatus.CONFLICT) {
            await this.configService.updateFlowFormula(
              config.Fcode,
              config.Days_output,
              ff.data.id,
            );
          } else {
            return this.commonService.errorMessage(
              '',
              CONSTANT_MSG.FAIL_TO_ADD_FLOW_FORMULA,
              HttpStatus.BAD_REQUEST,
            );
          }

          let s = await this.stateService.addStateIfNotExist(
            config.State.toLowerCase(),
          );
          console.log('s', s);

          let v = await this.vendorService.addVendorStateIfNotExist(
            config.Vendor.toLowerCase(),
            s.data,
          );
          console.log('v', v);

          console.log('device_pl');
          console.log(s.data);
          console.log(v.data);
          console.log(r1.id);
          let device_pl = {
            state: s.data,
            vendor: v.data,
            rid: r1.id,
            imei: config.IMEI.toString(),
          };

          await this.updateDevice(device_pl, registeredDevice.ref_id);
          console.log('updateDevice');
          await this.ridToDevice(registeredDevice.ref_id, device_pl.rid);

          await this.removeFromInvalids(device_pl.imei);

          return this.commonService.successMessage(
            '',
            CONSTANT_MSG.SUCCESSFULLY_RECONFIGURED,
            HttpStatus.OK,
          );
        } else {
          return this.commonService.errorMessage(
            '',
            CONSTANT_MSG.FAILED_TO_GET_RID_DEVICE_CONNECTION_DETAILS,
            HttpStatus.BAD_REQUEST,
          );
        }
      } else {
        return this.commonService.errorMessage(
          '',
          CONSTANT_MSG.FAILED_TO_ADD_RID_no,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      console.log(err);
      return this.commonService.errorMessage(
        '',
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getDeviceAndRidEntry(device_reg_ref_id: any, rid_ref_id: any) {
    try {
      // let query = await this.ridDeviceRepository.find({where:{rid_ref_id,device_reg_ref_id}})
      console.log('get', device_reg_ref_id, rid_ref_id);
      let query = await this.ridDeviceRepository
        .createQueryBuilder('rid_device_tbl')
        .where(
          'rid_device_tbl.device_reg_ref_id = :device_reg_ref_id OR rid_device_tbl.rid_ref_id = :rid_ref_id',
          {
            device_reg_ref_id,
            rid_ref_id,
          },
        )
        .getOne();
      console.log('q1 ', query);
      if (!query) {
        return this.commonService.errorMessage(
          0,
          CONSTANT_MSG.UNSUCCESSFULL,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          query.ref_id,
          CONSTANT_MSG.SUCCESSFULL,
          HttpStatus.OK,
        );
      }
    } catch (err) {
      return this.commonService.errorMessage(
        0,
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateDevice(device_pl: any, ref_id: any) {
    try {
      console.log('updateDevice', device_pl, ref_id);
      let query = await this.deviceRepository.update(ref_id, {
          state:device_pl.state.ref_id,
        // state_id: device_pl.state,
        // vendor_id: device_pl.vendor.ref_id,
        vendor:device_pl.vendor.ref_id
      });
      if (!query) {
        return this.commonService.errorMessage(
          '',
          CONSTANT_MSG.FAIL_TO_UPDATE_DEVICE,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          query,
          CONSTANT_MSG.SUCCESSFULLY_UPDATED,
          HttpStatus.OK,
        );
      }
    } catch (err) {
      console.log(err);
      return this.commonService.errorMessage(
        '',
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //check query

  async getRID(device_ref_id: any) {
    try {
      console.log('device_ref_id', device_ref_id);
      let query = await this.ridRepository
        .createQueryBuilder('a')
        .innerJoin('rid_device_tbl', 'b', 'a.ref_id = b.rid_ref_id')
        .where('b.device_reg_ref_id = :device_ref_id', { device_ref_id })
       // .getOne();
      .getRawOne()
      console.log('querrry', query);
      // console.log('qy', query.rid);
      // console.log('length', query.rid.length);
      if (!query) {
        return this.commonService.errorMessage(
          0,
          CONSTANT_MSG.FETCH_ERROR,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          query,
          CONSTANT_MSG.ID_OK,
          HttpStatus.OK,
        );
      }
    } catch (err) {
      console.log('error', err);
      return this.commonService.errorMessage(
        0,
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //////.......................get code

  async getRegisteredDevice(limit: number, offset: number) {
    try {
      const queryBuilder = await this.deviceRepository
        .createQueryBuilder('a')
        .leftJoin(DeviceRid, 'b', 'a.ref_id = b.device_reg_ref_id')
        .leftJoin(Rid, 'c', 'b.rid_ref_id = c.ref_id')
        .leftJoin(RidConfig, 'f', 'b.rid_ref_id = f.rid_ref_id')
        .leftJoin(State, 'd', 'a.state_id = d.ref_id')
        .leftJoin(Vendor, 'e', 'a.vendor_id = e.ref_id')
        .select([
          'a.*',
          'c.rid',
          'd.name as statename',
          'e.name as vendorname',
          'f.config_ref_id as config',
        ]);

      if (limit && offset) {
        queryBuilder.skip(offset).take(limit);
      }

      // const finalQuery = queryBuilder.getSql();

      // console.log('Generated SQL Query:', finalQuery);

      const resp = await queryBuilder.getRawMany();
      console.log('resp', resp);

      console.log('resp', resp);
      if (resp || resp.length !== 0) {
        return this.commonService.successMessage(
          resp,
          CONSTANT_MSG.SUCCESSFULL,
          HttpStatus.OK,
        );
      } else {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.UNSUCCESSFULL,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      console.log('err', err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getRegDeviceById(ref_id: number) {
    try {
      const resp = await this.deviceRepository
        .createQueryBuilder('a')
        .leftJoin(DeviceRid, 'b', 'a.ref_id = b.device_reg_ref_id')
        .leftJoin(Rid, 'c', 'b.rid_ref_id = c.ref_id')
        .leftJoin(RidConfig, 'f', 'b.rid_ref_id = f.rid_ref_id')
        .leftJoin(State, 'd', 'a.state_id = d.ref_id')
        .leftJoin(Vendor, 'e', 'a.vendor_id = e.ref_id')
        .select([
          'a.*',
          'c.rid',
          'd.name as statename',
          'e.name as vendorname',
          'f.config_ref_id as config',
        ])
        .where('a.ref_id=:ref_id', { ref_id })
        .getRawOne();

      // const resp = await queryBuilder.getRawOne();
      // console.log('resp', resp);

      console.log('resp', resp);
      // if (resp || resp.length!==0 ) {
      //   return this.commonService.successMessage(
      //     resp,
      //     CONSTANT_MSG.SUCCESSFULL,
      //     HttpStatus.OK,
      //   );
      // } else {
      //   return this.commonService.errorMessage(
      //     [],
      //     CONSTANT_MSG.UNSUCCESSFULL,
      //     HttpStatus.BAD_REQUEST,
      //   );
      // }
      if (resp && typeof resp === 'object' && Object.keys(resp).length > 0) {
        return this.commonService.successMessage(
          resp,
          CONSTANT_MSG.ID_OK,
          HttpStatus.OK,
        );
      } else {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.ID_NOT_FOUND,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      console.log('err', err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getRegDeviceByImei(imei: number) {
    try {
      const resp = await this.deviceRepository
        .createQueryBuilder('a')
        .leftJoin(DeviceRid, 'b', 'a.ref_id = b.device_reg_ref_id')
        .leftJoin(Rid, 'c', 'b.rid_ref_id = c.ref_id')
        .leftJoin(RidConfig, 'f', 'b.rid_ref_id = f.rid_ref_id')
        .leftJoin(State, 'd', 'a.state_id = d.ref_id')
        .leftJoin(Vendor, 'e', 'a.vendor_id = e.ref_id')
        .select([
          'a.*',
          'c.rid',
          'd.name as statename',
          'e.name as vendorname',
          'f.config_ref_id as config',
        ])
        .where('a.imei=:imei', { imei })
        .getRawOne();

      console.log('resp', resp);

      if (resp && typeof resp === 'object' && Object.keys(resp).length > 0) {
        return this.commonService.successMessage(
          resp,
          CONSTANT_MSG.IMEI_OK,
          HttpStatus.OK,
        );
      } else {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.IMEI_NOT_FOUND,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      console.log('err', err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateRegisteredDevice(id: number, data: any) {
    try {
      console.log(data.rid, data.imei, id);
      let reassignRidCheck = await this.updateRidToDevice(
        id,
        data.rid,
        data.imei,
      );
      console.log('reassign', reassignRidCheck);
      if (reassignRidCheck.statusCode != HttpStatus.OK) {
        return reassignRidCheck;
      }
      console.log('id', id, 'data', data);
      let cloud_status = false;
      if (
        data.cloud_username != '' &&
        data.cloud_password != '' &&
        data.cloud_clientid != ''
      ) {
        cloud_status = true;

        console.log('update');

        let query = await this.deviceRepository
          .createQueryBuilder()
          .update('device_reg_tbl')
          .set({
            state_id: data.state,
            vendor_id: data.vendor,
            cloud_username: data.cloud_username,
            cloud_password: data.cloud_password,
            cloud_clientid: data.cloud_clientid,
            cloud_status: data.cloud_status,
            broker_url: data.broker_url,
            port: data.port,
            info_topic: data.topic,
            remarks: 'Successfully updated',
          })
          .where('ref_id = :id', { id: id })
          .execute();

        console.log('update query', query);

        if (!query) {
          return this.commonService.errorMessage(
            [],
            CONSTANT_MSG.FAILED_TO_UPDATE,
            HttpStatus.BAD_REQUEST,
          );
        } else {
          return this.commonService.successMessage(
            [],
            CONSTANT_MSG.SUCCESSFULLY_DEVICE_UPDATED,
            HttpStatus.ACCEPTED,
          );
        }
      }
    } catch (err) {
      console.log(err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateRidToDevice(device_ref_id: any, rid_ref_id: any, imei: any) {
    try {
      console.log('ids', device_ref_id, rid_ref_id, imei);
      let eresp = await this.getRidDeviceEntry(device_ref_id);
      console.log('eresp', eresp);

      if (typeof eresp === 'object' && Object.keys(eresp).length > 0) {
        console.log('enter in if');
        console.log('eresp', eresp.data.rid_ref_id);
        console.log('rid_ref_id', rid_ref_id);

        if (eresp.data.rid_ref_id === rid_ref_id) {
          return this.commonService.successMessage(
            [],
            CONSTANT_MSG.SAME_RID,
            HttpStatus.OK,
          );
        } else {
          console.log('enter in else');
          return this.commonService.errorMessage(
            [],
            CONSTANT_MSG.TRIED_TO_UPDATE_DEVICE_WITH_NEW_RID,
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      console.log('query..');
      let query = await this.ridDeviceRepository.save({
        device: device_ref_id,
        rid: rid_ref_id,
      });

      if (!query) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FAILED_TO_INSERT_RID_DEVICE_ENTRY,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          [],
          CONSTANT_MSG.SUCCESSFULLY_INSERT_RID_DEVICE_ENTRY,
          HttpStatus.OK,
        );
      }
    } catch (error) {
      console.log('catch', error.message);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteDevice(id: any): Promise<any> {
    try {
      let dev = await this.getDeviceByID(id);
      console.log('delete dev', dev);
      if (dev.statusCode === HttpStatus.OK) {
        if (dev.data.length === 0) {
          return this.commonService.errorMessage(
            [],
            CONSTANT_MSG.ID_NOT_FOUND,
            HttpStatus.NOT_FOUND,
          );
        } else {
          console.log('enter in to remove');
          if (!dev.data[0].flux_username || dev.data[0].flux_username == '') {
            console.log('block removeDevicefromDB');
            return await this.removeDeviceFromDB(id);
          }
          let fr = await this.removefromFlux(
            dev.data[0].flux_username,
            dev.data[0].flux_clientid,
          );
          console.log('flux remove', fr);
          return await this.removeDeviceFromDB(id);
        }
      } else {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.UNSUCCESSFULL,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      console.log('err', err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeDeviceFromDB(id: any) {
    try {
      let drd = await this.deleteRidDevice(id);
      console.log('drd', drd.statusCode);
      if (drd.statusCode === HttpStatus.NO_CONTENT) {
        //remove device
        let rd = await this.removeDeviceByID(id);
        if (rd.statusCode === HttpStatus.NO_CONTENT) {
          return this.commonService.errorMessage(
            [],
            CONSTANT_MSG.SUCCESFULLY_REMOVED_DEVICE,
            HttpStatus.NO_CONTENT,
          );
        } else {
          console.log("update")
          await this.updateDeviceStatus(
            id,
            'Flux Removed, Fail to remove from DB',
            0,
            0,
          );
          return this.commonService.errorMessage(
            [],
            CONSTANT_MSG.UNSUCCESSFULL,
            HttpStatus.BAD_REQUEST,
          );
        }
      } else {
        await this.updateDeviceStatus(
          id,
          'Flux Removed,Fail to remove from DB',
          0,
          0,
        );
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.UNSUCCESSFULL,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      console.log(err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //tested
  async deleteRidDevice(device_ref_id: any): Promise<any> {
    try {
      let query1 = await this.ridDeviceRepository.delete({
        device: { ref_id: device_ref_id },
      });

      console.log('query', query1);
      if (!query1) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.UNSUCCESSFULL,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          [],
          CONSTANT_MSG.SUCCESFULLY_REMOVED_RID_DEVICE,
          HttpStatus.NO_CONTENT,
        );
      }
    } catch (err) {
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  ///remaining
  async updateDeviceStatus(
    ref_id: any,
    remark: string,
    status: any,
    flux_status: any,
  ) {
    try {
      let q = await this.deviceRepository
        .createQueryBuilder()
        .update('device_reg_tbl')
        .set({
          status: status,
          remarks: remark,
          flux_status: flux_status,
        })
        .where('ref_id = :ref_id', { ref_id: ref_id })
        .execute();

        console.log("q",q)

      if (!q) {
        console.log("enter in not")
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.UNSUCCESSFULL,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        console.log("enter in ok")
        return this.commonService.successMessage(
          [],
          CONSTANT_MSG.SUCCESSFULL,
          HttpStatus.OK,
        );
      }
    } catch (err) {
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async reassignRID(rid:number,id:number):Promise<any>{
    try{
    // let ridCheck = await this.getDeviceRidEntry(rid_ref_id);
     //if(ridCheck.statusCode === HttpStatus.OK && ridCheck.data.length>0)
    }catch(err){
     console.log(err)
    }
  }
}
