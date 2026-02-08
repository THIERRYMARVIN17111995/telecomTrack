import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common'
import { SocietyService } from './society.service'
import { CreateSocietyDto } from './dto/create-society.dto'
import { UpdateSocietyDto } from './dto/update-society.dto'

@Controller('society')
export class SocietyController {
  constructor(private readonly societyService: SocietyService) {}

  @Post('create')
  create(@Body() createSocietyDto: CreateSocietyDto) {
    return this.societyService.create(createSocietyDto)
  }

  @Get('list')
  findAll() {
    return this.societyService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {  
    return this.societyService.findOne(id)
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.societyService.findByUser(userId)
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateSocietyDto: UpdateSocietyDto) { // ✅ Changed
    return this.societyService.update(id, updateSocietyDto)
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) { 
    return this.societyService.remove(id)
  }
}