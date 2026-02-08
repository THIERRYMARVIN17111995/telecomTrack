import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TeamMemberService } from './team-member.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';

@Controller('team-member')
export class TeamMemberController {
  constructor(private readonly teamMemberService: TeamMemberService) { }

  @Post('create')
  create(@Body() createTeamMemberDto: CreateTeamMemberDto[]) {
    return this.teamMemberService.create(createTeamMemberDto);
  }

  @Get('list')
  findAll() {
    return this.teamMemberService.findAll();
  }

  @Get('selectById/:id')
  findOne(@Param('id') id: string) {
    return this.teamMemberService.findOne(id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateTeamMemberDto: CreateTeamMemberDto[]) {
    return this.teamMemberService.updateTeamMembersSimple(id, updateTeamMemberDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.teamMemberService.remove(id);
  }
}
