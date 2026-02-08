import { Injectable } from '@nestjs/common';
import { CreateAcceptanceDto } from './dto/create-acceptance.dto';
import { UpdateAcceptanceDto } from './dto/update-acceptance.dto';

@Injectable()
export class AcceptanceService {
  create(createAcceptanceDto: CreateAcceptanceDto) {
    return 'This action adds a new acceptance';
  }

  findAll() {
    return `This action returns all acceptance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} acceptance`;
  }

  update(id: number, updateAcceptanceDto: UpdateAcceptanceDto) {
    return `This action updates a #${id} acceptance`;
  }

  remove(id: number) {
    return `This action removes a #${id} acceptance`;
  }
}
