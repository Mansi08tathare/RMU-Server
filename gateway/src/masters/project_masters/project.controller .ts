import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { CONSTANT_MSG } from "src/common-dto/const";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from "@nestjs/swagger";
import { ProjectDto } from "./dtos/project.dto";
import { UpdatProjectDto } from "./dtos/updateProject.dto";


@ApiTags('Project')
@Controller('project')
export class ProjectController{
    constructor(
        private readonly projectService:ProjectService
    ){}

    @Get('')
    @ApiOperation({ summary: 'Get all projects' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'All projects retrieved successfully',
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
    })
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
    @ApiOperation({ summary: 'Get a project by ID' })
    @ApiParam({ name: 'id', description: 'ID of the project' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Project retrieved successfully',
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
    })
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
    @ApiOperation({ summary: 'Add a new project' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Project added successfully',
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
    })
    @ApiBody({type:ProjectDto})
    async addProject(@Body() body:ProjectDto,@Res() res:any){
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
    @ApiBody({type:UpdatProjectDto})
    @ApiOperation({ summary: 'Update a project by ID' })
    @ApiResponse({
        status: HttpStatus.ACCEPTED,
        description: 'Project updated successfully',
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
    })
    async updateProject(
      @Res() res: any,
      @Body() body: UpdatProjectDto,
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
    @ApiOperation({ summary: 'Delete a project by ID' })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'Project deleted successfully',
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
    })
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