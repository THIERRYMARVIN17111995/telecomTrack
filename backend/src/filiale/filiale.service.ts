import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFilialeDto } from './dto/create-filiale.dto';
import { UpdateFilialeDto } from './dto/update-filiale.dto';
import { Society } from 'src/society/entities/society.entity';
import { Filiale } from './entities/filiale.entity';

@Injectable()
export class FilialeService {
    constructor(
        @InjectRepository(Filiale)
        private readonly filialeRepository: Repository<Filiale>,

        @InjectRepository(Society)
        private readonly societyRepository: Repository<Society>,
    ) {}

    async create(dto: CreateFilialeDto): Promise<Filiale> {
        const society = await this.societyRepository.findOne({
            where: { id: dto.societyId },
        });

        if (!society) {
            throw new NotFoundException('Society not found');
        }

        const filiale = this.filialeRepository.create({
            country: dto.country,
            society,
        });

        return this.filialeRepository.save(filiale);
    }

    async findAll(): Promise<Filiale[]> {
        return this.filialeRepository.find({
            relations: ['society'],
        });
    }

    async findOne(id: string): Promise<Filiale> {
        const filiale = await this.filialeRepository.findOne({
            where: { id },
            relations: ['society'],
        });

        if (!filiale) {
            throw new NotFoundException('Filiale not found');
        }

        return filiale;
    }

    async update(id: string, dto: UpdateFilialeDto): Promise<Filiale> {
        const filiale = await this.findOne(id);

        if (dto.societyId) {
            const society = await this.societyRepository.findOne({
                where: { id: dto.societyId },
            });

            if (!society) {
                throw new NotFoundException('Society not found');
            }

            filiale.society = society;
        }

        if (dto.country) {
            filiale.country = dto.country;
        }

        return this.filialeRepository.save(filiale);
    }

    async remove(id: string): Promise<void> {
        const filiale = await this.findOne(id);
        await this.filialeRepository.remove(filiale);
    }
}
