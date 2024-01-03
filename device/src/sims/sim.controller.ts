import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import {SimService} from "./sim.service"
// import { response } from "express";

@Controller()
export class SimController{
    constructor(
        private readonly simService:SimService,
    ){}

    @MessagePattern({cmd:'getSims'})
    async getSims(){
        try{
        let resp = await this.simService.getSims()
        return resp;
        }catch(err){
         console.log("err",err)
         return err;
        }

    }

    @MessagePattern({cmd:'getSim'})
    async getSim(id:number){
        try{
         let resp = await this.simService.getSim(id)
         return resp;
        }catch(err){
          console.log("err",err)
          return err
        }
    }

    @MessagePattern({cmd:'addSim'})
    async addSim(body:any){
        try{
            console.log("mp",body)
            //const { simno, operator, mobileno, rid } = body
         let resp = await this.simService.addSim(body)
         return resp;
        }catch(err){
            console.log("err",err)
            return err;
        }
    }

    @MessagePattern({cmd:'updateSim'})
    async updateSim(data:{simno:number,operator:string,mobileno:number,id:number,rid?:number}){
        try{
            
            const{simno,operator,mobileno,id,rid}=data
            console.log("mp id",id)
            console.log("mp rid",rid)
            console.log("simno",simno)
            console.log("oper",operator),
            console.log("mob",mobileno)
            // const{id,simno,operator,mobileno}=data1
        let resp = await this.simService.updateSim(simno,operator,mobileno,id,rid)
        return resp;
        }catch(err){
            console.log("err",err)
            return err
        }
    }

    @MessagePattern({cmd:'deleteSim'})
    async deleteSim(id:number){
        try{
        let resp = await this.simService.deleteSimDetail(id)
        return resp;
        }catch(err){
         console.log("err",err)
         return err
        }
    }
}