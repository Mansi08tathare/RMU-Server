import { Controller, Get, HttpStatus, Inject, Res } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { VendorService } from "src/portals/vendors/vendor.service";

@Controller('vendor')
export class VendorController{
    constructor(
        private readonly vendorService:VendorService
    ){}

   @MessagePattern({cmd:'getVendors'})
   async getVendors(){
    try{
     let vendor = await this.vendorService.getVendors()
     return vendor
    }catch(err){
    console.log(err)
    return err;
    }
   }

   @MessagePattern({cmd:'getVendorByID'})
   async getVendorByID(ref_id:number){
    try{
     let vendor = await this.vendorService.getVendorByID(ref_id)
     return vendor
    }catch(err){
        console.log(err)
        return err
    }
   }

   @MessagePattern({cmd:'addVendor'})
   async addVendor(body:any){
    try{
     let vendor = await this.vendorService.addVendor(body)
     return vendor
    }catch(err){
        console.log(err)
        return err;
    }
   }

   @MessagePattern({cmd:'updateVendor'})
   async updateVendor(data:{body:any,id:number}){
    try{
        const{body,id}=data
        let vendor =await this.vendorService.updateVendor(body,id)
        return vendor

    }catch(err){
        console.log(err)
        return err
    }
   }

   @MessagePattern({cmd:'deleteVendor'})
   async deleteVendor(ref_id:number){
    try{
     let vendor = await this.vendorService.deleteVendor(ref_id)
     return vendor;
    }catch(err){
     console.log(err)
     return err
    }
   }
}