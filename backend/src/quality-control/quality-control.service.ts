import { Injectable } from '@nestjs/common';
import { CreateQualityControlDto } from './dto/create-quality-control.dto';
import { UpdateQualityControlDto } from './dto/update-quality-control.dto';

@Injectable()
export class QualityControlService {
  create(createQualityControlDto: CreateQualityControlDto) {
    return 'This action adds a new qualityControl';
  }

  findAll() {
    return `This action returns all qualityControl`;
  }

  findOne(id: number) {
    return `This action returns a #${id} qualityControl`;
  }

  update(id: number, updateQualityControlDto: UpdateQualityControlDto) {
    return `This action updates a #${id} qualityControl`;
  }

  remove(id: number) {
    return `This action removes a #${id} qualityControl`;
  }
}
