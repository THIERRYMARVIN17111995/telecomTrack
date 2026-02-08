import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectStatus } from 'src/types/projectStatus';
import { Customer } from 'src/customers/entities/customer.entity';
import { Filiale } from 'src/filiale/entities/filiale.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,

    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,

    @InjectRepository(Filiale)
    private readonly filialeRepo: Repository<Filiale>,
  ) { }

  // CREATE
  async create(dto: CreateProjectDto): Promise<Project> {
    const customer = await this.customerRepo.findOne({
      where: { id: dto.customerId },
    });

    const filiale = await this.filialeRepo.findOneBy({ id: dto.subsidiaryId });
    if (!filiale) throw new NotFoundException(`Filiale #${dto.subsidiaryId} not found`);

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    // Règle métier dates
    if (dto.startDate && dto.endDate && dto.endDate < dto.startDate) {
      throw new BadRequestException(
        'endDate cannot be earlier than startDate',
      );
    }

    const project = this.projectRepo.create({
      code: dto.code,
      name: dto.name,
      customer,
      startDate: dto.startDate,
      endDate: dto.endDate,
      status: dto.status ?? ProjectStatus.PLANNED,
      subsidiary: filiale
    });

    return this.projectRepo.save(project);
  }

  // READ ALL
  async findAll(): Promise<Project[]> {
    return this.projectRepo.find({
      relations: ['customer','subsidiary'],
      order: { createdAt: 'DESC' },
    });
  }

  // READ ONE
  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepo.findOne({
      where: { id },
      relations: ['customer'],
    });

    if (!project) {
      throw new NotFoundException(`Project ${id} not found`);
    }

    return project;
  }

  // UPDATE
  async update(id: string, dto: UpdateProjectDto): Promise<Project> {
    const project = await this.findOne(id);

    if (dto.customerId) {
      const customer = await this.customerRepo.findOne({
        where: { id: dto.customerId },
      });
      if (!customer) {
        throw new NotFoundException('Customer not found');
      }
      project.customer = customer;
    }

    const filiale = await this.filialeRepo.findOneBy({ id: dto.subsidiaryId });
    if (!filiale) throw new NotFoundException(`Filiale #${dto.subsidiaryId} not found`);
    project.subsidiary = filiale;

    if (dto.startDate && dto.endDate && dto.endDate < dto.startDate) {
      throw new BadRequestException(
        'endDate cannot be earlier than startDate',
      );
    }

    Object.assign(project, dto);

    // Auto status (optionnel)
    if (dto.startDate && !project.endDate) {
      project.status = ProjectStatus.IN_PROGRESS;
    }
    if (dto.endDate && project.status === ProjectStatus.IN_PROGRESS) {
      project.status = ProjectStatus.COMPLETED;
    }

    return this.projectRepo.save(project);
  }

  // SOFT DELETE
  async remove(id: number): Promise<void> {
    const res = await this.projectRepo.softDelete(id);
    if (!res.affected) {
      throw new NotFoundException(`Project ${id} not found`);
    }
  }

  // RESTORE
  async restore(id: number): Promise<void> {
    const res = await this.projectRepo.restore(id);
    if (!res.affected) {
      throw new NotFoundException(`Project ${id} not found`);
    }
  }

  // FILTERS
  async findByStatus(status: ProjectStatus): Promise<Project[]> {
    return this.projectRepo.find({
      where: { status },
      relations: ['customer'],
    });
  }

  async findByCustomer(customerId: string): Promise<Project[]> {
    return this.projectRepo.find({
      where: { customer: { id: customerId } },
      relations: ['customer'],
    });
  }
}
