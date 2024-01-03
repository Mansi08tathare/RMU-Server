import { HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CommonService } from './common-service';
import { CONSTANT_MSG } from 'src/common-dto/const';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FluxService {
  private readonly fountFluxUrl: string;
  constructor(
    // private readonly fountFluxUrl: string = FluxCloud.HOST,
    private readonly configService: ConfigService,
    private readonly commonService: CommonService,
  ) {
    this.fountFluxUrl = this.configService.get<string>('FLX_HOST');
  }
  // fountFluxUrl = "FLX_HOST";

  //testing purpose
  async GetAuthKey(email: string, password: string): Promise<any> {
    let defaultToken = 'yourDefaultToken';

    try {
      return this.commonService.successMessage(
        defaultToken,
        CONSTANT_MSG.RECEIVED_TOKEN_SUCCESSFULLY,
        201,
      );
    } catch (err) {
      console.log(err);
      return this.commonService.errorMessage(
        'null',
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // async GetAuthKey(email: string, password: string): Promise<any> {
  //   let data = { email, password };
  //   //let defaultToken = 'yourDefaultToken'
  //   try {
  //     const resp = await axios.post(this.fountFluxUrl + '/tokens', data, {
  //       headers: { 'Content-Type': 'application/json' },
  //     });

  //     if (resp.status === 201) {
  //       return this.commonService.successMessage(
  //         resp.data.token,
  //         CONSTANT_MSG.RECEIVED_TOKEN_SUCCESSFULLY,
  //         resp.status,
  //       );
  //     } else {
  //       return this.commonService.errorMessage(
  //         'null',
  //         CONSTANT_MSG.UNSUCCESSFULLY_TOKEN,
  //         resp.status,
  //       );
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     return this.commonService.errorMessage(
  //       'null',
  //       CONSTANT_MSG.INTERNAL_SERVER_ERR,
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  async AddThing(name: string, token: string) {
    let data = [{ name }];
    try {
      // const resp = await axios.post(this.fountFluxUrl + '/things', data, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: 'Bearer ' + token,
      //   },
      // });
      let resp={
        status : 201
      }

      if (resp.status === 201) {
        // return this.commonService.successMessage(resp.data,
        //     CONSTANT_MSG.ADDED_THING_SUCCESSFULLY,
        //     resp.status)
        
        let thingid
        let thingkey
      
        return this.commonService.successMessage(
          // {
          //   thingid: resp.data.things[0].id,
          //   thingkey: resp.data.things[0].key,
          // },
          {
             thingid:'Mansi',
             thingkey:'Mansi@12'
          },
          CONSTANT_MSG.ADDED_THING_SUCCESSFULLY,
          resp.status,
        );
      } else {
        return this.commonService.errorMessage(
          '',
          CONSTANT_MSG.UNADDED_THINGS,
          resp.status,
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

  async AddChannel(name: string, token: string) {
    let data = [{ name }];
    try {
      // const resp = await axios.post(this.fountFluxUrl + '/channels', data, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: 'Bearer ' + token,
      //   },
      // });

      let resp = {
        status:201
      } 

      if (resp.status === 201) {
        return this.commonService.successMessage(
          213,
          // { channelId: resp.data.channels[0].id },
          CONSTANT_MSG.ADDED_CHANNEL_SUCCESSFULLY,
          resp.status,
        );
      } else {
        return this.commonService.errorMessage(
          '',
          CONSTANT_MSG.UNABLE_TO_ADD,
          resp.status,
        );
      }
    } catch (err) {
      console.log(err.response);
      return this.commonService.errorMessage(
        '',
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //......connections................................//

  async ConnectThingToChannel(
    channelId: string,
    thingId: string,
    token: string,
  ) {
    // const resp = await axios.put(
    //   this.fountFluxUrl + '/channels/' + channelId + '/things/' + thingId,
    //   null,
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: 'Bearer ' + token,
    //     },
    //   },
    // );
    try {

      let resp={
        status:200
      }
      let result={
        channelId:213,
        thingId:'Mansi',
        token

      }

      if (resp.status === 200) {
        return this.commonService.successMessage(
          result,//''
          CONSTANT_MSG.SUCCESSFULL,
          resp.status,
        );
      } else {
        return this.commonService.errorMessage(
          '',
          CONSTANT_MSG.UNSUCCESSFULL,
          resp.status,
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

  async RemoveThing(thingId: string, token: string) {
    const resp = await axios.delete(this.fountFluxUrl + '/things/' + thingId, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    try {
      if (resp.status === 204) {
        return this.commonService.successMessage(
          '',
          CONSTANT_MSG.SUCCESSFULL,
          resp.status,
        );
      } else {
        return this.commonService.errorMessage(
          '',
          CONSTANT_MSG.UNSUCCESSFULL,
          resp.status,
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

  async RemoveChannel(id: string, token: string) {
    try {
      const resp = await axios.delete(this.fountFluxUrl + '/channels/' + id, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      if (resp.status === 204) {
        return this.commonService.successMessage(
          '',
          CONSTANT_MSG.SUCCESSFULL,
          resp.status,
        );
      } else {
        return this.commonService.errorMessage(
          '',
          CONSTANT_MSG.UNSUCCESSFULL,
          resp.status,
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
}
