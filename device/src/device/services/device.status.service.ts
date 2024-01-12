import { HttpStatus, Injectable } from "@nestjs/common";
import { YearMonth } from "../entities/year_month.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm'
import { DateEntity } from "../entities/date.entity";
import { CommonService } from "./common-service";
import { CONSTANT_MSG } from "src/common-dto/const";

@Injectable()
export class DeviceStatusService {
    constructor(
        @InjectRepository(YearMonth)
        private readonly yearMonthRepository: Repository<YearMonth>,
        @InjectRepository(DateEntity)
        private readonly dateRepository: Repository<DateEntity>,
        private readonly commonService:CommonService

    ) {
        this.addDeviceData({
            "timestamp": "2023-02-15T12:30:00.000Z",
            "imei_id": 89
        }
        )
    }


    async addDeviceData(data: any) {
        try {
            console.log("data", data)
            const timestamp = new Date(data.timestamp)
            const month = timestamp.getMonth() + 1;
            const year = timestamp.getFullYear();
            const date = timestamp.getDate();
            let qresp: any;
            // console.log("month",month)
            // console.log("year",year)
            // console.log("date",date)

            const getYearAndMonth = await this.yearMonthRepository
                .createQueryBuilder('year_month')
                .select(['year_month.id as id'])
                .where('year_month.month = :month', { month })
                .andWhere('year_month.year = :year', { year })
                .andWhere('year_month.imei_id = :imei_id', { imei_id: data.imei_id })
                .getRawMany();

            console.log("ym", getYearAndMonth)

            if (getYearAndMonth && getYearAndMonth.length) {
                console.log("update year_month", getYearAndMonth)

                console.log("re", getYearAndMonth[0].id)

                const ymId = getYearAndMonth[0].id;
                const getDateID = await this.dateRepository
                    .createQueryBuilder()
                    .select('date.id as id')
                    .from(DateEntity, 'date')
                    .where('date.ym_id = :ymId', { ymId })
                    .andWhere('date.date = :date', { date })
                    .getRawOne();
                console.log("getDateId", getDateID)
                console.log("length", Object.keys(getDateID).length)

                if (getDateID && Object.keys(getDateID).length > 0) {
                    console.log("update Date", getDateID.id)
                    console.log("data.ado", data.ado)

                     qresp = await this.dateRepository.createQueryBuilder()
                        .update('DateEntity')
                        .set(data.ado)
                        .where('id = :id', { id: getDateID.id })
                        .execute();

                    console.log("updateQuery", qresp)
                } else {
                    console.log("Add Date", getDateID)
                    let Pl = {
                        month: month.toString(),
                        year: year.toString(),
                        imei_id: data.imei_id,
                    }

                    console.log("pl", Pl)
                    qresp = await this.yearMonthRepository.save(Pl)
                }

            }else{
                console.log("Add Year_Month",getYearAndMonth)
                let Pl = {
                    month: month.toString(),
                    year: year.toString(),
                    imei_id: data.imei_id,
                }
                let getym_id = await this.yearMonthRepository.save(Pl)
                 
                if(getym_id && Object.getOwnPropertyNames(getym_id).length){
                    let Pl ={
                        id:getym_id.id,
                        ado:data.ado,
                        date:date.toString()
                    }
                     qresp = await this.dateRepository.save(Pl)
                }
            }
            if(!qresp){
                return this.commonService.errorMessage(
                    [],
                    CONSTANT_MSG.ERROR_SAVING,
                    HttpStatus.BAD_REQUEST
                )
            }else{
                return this.commonService.successMessage(
                    [],
                    CONSTANT_MSG.SUCCESSFULL,
                    HttpStatus.OK
                )
            }

        } catch (err) {
              return this.commonService.errorMessage(
                [],
                CONSTANT_MSG.INTERNAL_SERVER_ERR,
                HttpStatus.INTERNAL_SERVER_ERROR
              )
        }
    }
}