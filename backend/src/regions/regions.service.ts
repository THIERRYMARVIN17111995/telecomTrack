import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Filiale } from 'src/filiale/entities/filiale.entity';
import { Region } from './entities/region.entity';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region)
    private readonly regionRepo: Repository<Region>,

    @InjectRepository(Filiale)
    private readonly filialeRepo: Repository<Filiale>,
  ) {}

  async create(dto: CreateRegionDto): Promise<Region> {
    const filiale = await this.filialeRepo.findOneBy({ id: dto.subsidiaryId });
    if (!filiale) throw new NotFoundException(`Filiale #${dto.subsidiaryId} not found`);

    const region = this.regionRepo.create({
      name: dto.name,
      subsidiary: filiale,
    });
    return this.regionRepo.save(region);
  }

  async findAll(): Promise<Region[]> {
    return this.regionRepo.find({ relations: ['subsidiary'] });
  }

  async findOne(id: string): Promise<Region> {
    const region = await this.regionRepo.findOne({
      where: { id },
      relations: ['subsidiary'],
    });
    if (!region) throw new NotFoundException(`Region #${id} not found`);
    return region;
  }

  async update(id: string, dto: Partial<CreateRegionDto>): Promise<Region> {
    const region = await this.findOne(id);

    if (dto.name) region.name = dto.name;
    if (dto.subsidiaryId) {
      const filiale = await this.filialeRepo.findOneBy({ id: dto.subsidiaryId });
      if (!filiale) throw new NotFoundException(`Filiale #${dto.subsidiaryId} not found`);
      region.subsidiary = filiale;
    }

    return this.regionRepo.save(region);
  }

  async remove(id: string): Promise<void> {
    const region = await this.findOne(id);
    await this.regionRepo.remove(region);
  }
}
