import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';



import { CreateInstallationStatusHistoryDto } from './dto/create-installation_status_history.dto';
import { UpdateInstallationStatusHistoryDto } from './dto/update-installation_status_history.dto';
import { Installation, InstallationStatus } from 'src/installation/entities/installation.entity';
import { InstallationStatusHistory } from './entities/installation_status_history.entity';

@Injectable()
export class InstallationStatusHistoryService {
  constructor(
    @InjectRepository(Installation)
    private readonly installationRepo: Repository<Installation>,

    @InjectRepository(InstallationStatusHistory)
    private readonly statusHistoryRepo: Repository<InstallationStatusHistory>,
  ) {}

  /**
   * 🔁 Changer le statut d'une installation + historiser
   */
  async changeInstallationStatus(
    installationId: string,
    status: InstallationStatus,
    userId: string,
  ): Promise<void> {
    const installation = await this.installationRepo.findOne({
      where: { id: installationId },
    });

    if (!installation) {
      throw new NotFoundException('Installation not found');
    }

    if (installation.status === status) {
      throw new BadRequestException('Installation already in this status');
    }

    // 1️⃣ Mise à jour du statut courant
    installation.status = status;
    await this.installationRepo.save(installation);

    // 2️⃣ Historisation
    const history = this.statusHistoryRepo.create({
      installation,
      status,
      createdBy: userId,
    });

    await this.statusHistoryRepo.save(history);
  }

  /**
   * 📜 Historique complet d'une installation
   */
  async findByInstallation(installationId: string) {
    return this.statusHistoryRepo.find({
      where: { installation: { id: installationId } },
      order: { createdAt: 'ASC' },
    });
  }

  /**
   * 📄 Tous les statuts (admin / audit)
   */
  async findAll() {
    return this.statusHistoryRepo.find({
      relations: ['installation'],
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * ❌ (Optionnel) suppression logique
   */
  async remove(id: string) {
    const history = await this.statusHistoryRepo.findOneBy({ id });

    if (!history) {
      throw new NotFoundException('Status history not found');
    }

    await this.statusHistoryRepo.softDelete(id);
  }
}
