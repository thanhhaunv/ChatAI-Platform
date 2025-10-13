import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { InviteMemberDto } from './dto/invite-member.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  async create(@Request() req, @Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(req.user.id, createProjectDto);
  }

  @Get()
  async getUserProjects(@Request() req) {
    return this.projectsService.getUserProjects(req.user.id);
  }

  @Get(':id')
  async getProjectById(@Request() req, @Param('id', ParseIntPipe) projectId: number) {
    return this.projectsService.getProjectById(projectId, req.user.id);
  }

  @Post(':id/members')
  async inviteMember(
    @Request() req,
    @Param('id', ParseIntPipe) projectId: number,
    @Body() inviteMemberDto: InviteMemberDto,
  ) {
    return this.projectsService.inviteMember(projectId, req.user.id, inviteMemberDto);
  }

  @Delete(':id/members/:memberId')
  async removeMember(
    @Request() req,
    @Param('id', ParseIntPipe) projectId: number,
    @Param('memberId', ParseIntPipe) memberId: number,
  ) {
    return this.projectsService.removeMember(projectId, req.user.id, memberId);
  }
}
