import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { CONSTANT_MSG } from "src/common-dto/const";

@Controller('project')
export class ProjectController{
    constructor(
        private readonly projectService:ProjectService
    ){}

    @Get('')
    async getProject(@Res() res:any){
        try{
            
         let resp = await this.projectService.getProject()
        //  console.log("resp",resp)
         if (resp.code == 'ECONNREFUSED') {
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .send({ error: 'Device Microservice ECONNREFUSED' });
          } else if (resp.statusCode === HttpStatus.OK) {
            res
              .status(resp.statusCode)
              .send({ success: resp.message, data: resp.data });
          } else {
            res.status(resp.statusCode).send({ error: resp.message });
          }

        }catch(err){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
                statusCode: false,
              });

        }
    }

    @Get('/:id')
    async getProjectById(@Param('id')id:number,@Res() res:any){
        try{
            let resp = await this.projectService.getProjectById(id)
            if (resp.code == 'ECONNREFUSED') {
                res
                  .status(HttpStatus.INTERNAL_SERVER_ERROR)
                  .send({ error: 'Device Microservice ECONNREFUSED' });
              } else if (resp.statusCode === HttpStatus.OK) {
                res
                  .status(resp.statusCode)
                  .send({ success: resp.message, data: resp.data });
              } else {
                res.status(resp.statusCode).send({ error: resp.message });
              }

        }catch(err){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
                statusCode: false,
              });
        }
    }

    @Post('')
    async addProject(@Body() body:any,@Res() res:any){
        try{
           let resp = await this.projectService.addProject(body)
           if (resp.code == 'ECONNREFUSED') {
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .send({ error: 'Device Microservice ECONNREFUSED' });
          } else if (resp.statusCode === HttpStatus.CREATED) {
            res
              .status(resp.statusCode)
              .send({ success: resp.message });
          } else {
            res.status(resp.statusCode).send({ error: resp.message });
          }

        }catch(err){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
                statusCode: false,
              });
            
        }
    }

    @Put('/:id')
    async updateProject(
      @Res() res: any,
      @Body() body: any,
      @Param('id') id: number,
    ) {
      try {
        let resp = await this.projectService.updateProject(body, id);
        if (resp.code == 'ECONNREFUSED') {
          res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({ error: 'Device Microservice ECONNREFUSED' });
        } else if (resp.statusCode === HttpStatus.ACCEPTED) {
          res.status(resp.statusCode).send({ success: resp.message });
        } else {
          res.status(resp.statusCode).send({ error: resp.message });
        }
      } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
          statusCode: false,
        });
      }
    }
    @Delete('/:id')
    async deleteProject(@Param('id') id: number, @Res() res: any) {
      try {
        let resp = await this.projectService.deleteProject(id);
        if (resp.code == 'ECONNREFUSED') {
          res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({ error: 'Device Microservice ECONNREFUSED' });
        } else if (resp.statusCode === HttpStatus.NO_CONTENT) {
          res.status(resp.statusCode).send({ success: resp.message });
        } else {
          res.status(resp.statusCode).send({ error: resp.message });
        }
      } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
          statusCode: false,
        });
      }
    }
}