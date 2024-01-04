import { Controller } from '@nestjs/common';
import { ProjectService } from './project.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @MessagePattern({ cmd: 'getProject' })
  async getProject() {
    try {
      let resp = await this.projectService.getProject();
      return resp;
    } catch (err) {
      return err;
    }
  }

  @MessagePattern({cmd:'getProjectById'})
  async getProjectById(id:number){
    try{
       let resp = await this.projectService.getProjectById(id)
       return resp
    }catch(err){
        return err;
    }
  }
  //addProject

  @MessagePattern({cmd:'addProject'})
  async addProject(body:any){
    try{
       let resp = await this.projectService.addProject(body)
       return resp
    }catch(err){
        return err
    }
  }

  @MessagePattern({cmd:'updateProject'})
  async updateProject(data:{body:any,id:number}){
      try{
          const{body,id}=data
         let resp = await this.projectService.updateProject(body,id)
         return resp
      }catch(err){
          console.log("err",err)
          return err
      }
  }

  @MessagePattern({cmd:'deleteProject'})
  async deleteProject(id:number){
      try{
          let resp = await this.projectService.deleteProject(id)
          return resp
      }catch(err){
          console.log("err",err)
          return err
      }
  }
 
}
