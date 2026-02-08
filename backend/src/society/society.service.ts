import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateSocietyDto } from './dto/create-society.dto'
import { UpdateSocietyDto } from './dto/update-society.dto'
import { User } from 'src/users/entities/user.entity'
import { Society } from './entities/society.entity'

@Injectable()
export class SocietyService {
  constructor(
    @InjectRepository(Society)
    private readonly societyRepository: Repository<Society>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async create(createSocietyDto: CreateSocietyDto): Promise<Society> {
    try {
      // Find user
      const user = await this.userRepository.findOne({
        where: { userId: createSocietyDto.userId }
      })

      if (!user) {
        throw new NotFoundException(`User with ID ${createSocietyDto.userId} not found`)
      }

      // Create society
      const society = this.societyRepository.create({
        nomSociete: createSocietyDto.nomSociete,
        rccm: createSocietyDto.rccm,
        nui: createSocietyDto.nui,
        user,
      })

      return await this.societyRepository.save(society)
    } catch (error) {
      // Handle duplicate entry errors
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('RCCM or NUI already exists')
      }
      throw error
    }
  }

  async findAll(): Promise<Society[]> {
    return await this.societyRepository.find({
      relations: ['user'],
      select: {
        user: {
          userId: true,
          email: true,
          role: true,
          // Don't include password
        }
      }
    })
  }

  async findOne(id: string): Promise<Society> { // ✅ Changed from number to string
    const society = await this.societyRepository.findOne({
      where: { id }, // ✅ Fixed: was { user } which is wrong
      relations: ['user'],
      select: {
        user: {
          userId: true,
          email: true,
          role: true,
        }
      }
    })

    if (!society) {
      throw new NotFoundException(`Society with ID ${id} not found`)
    }

    return society
  }

  async findByUser(userId: string): Promise<Society[]> {
    return await this.societyRepository.find({
      where: { user: { userId } },
      relations: ['user'],
    })
  }

  async update(id: string, updateSocietyDto: UpdateSocietyDto): Promise<Society> {
    const society = await this.findOne(id)

    // Update basic fields
    if (updateSocietyDto.nomSociete) {
      society.nomSociete = updateSocietyDto.nomSociete
    }
    if (updateSocietyDto.rccm !== undefined) {
      society.rccm = updateSocietyDto.rccm
    }
    if (updateSocietyDto.nui !== undefined) {
      society.nui = updateSocietyDto.nui
    }

    // Update user if provided
    if (updateSocietyDto.userId) {
      const user = await this.userRepository.findOne({
        where: { userId: updateSocietyDto.userId }
      })

      if (!user) {
        throw new NotFoundException(`User with ID ${updateSocietyDto.userId} not found`)
      }

      society.user = user
    }
    console.log(society)
    return await this.societyRepository.save(society)
    try {

    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('RCCM or NUI already exists')
      }
      throw error
    }
  }

  async remove(id: string): Promise<void> {
    const society = await this.findOne(id)
    await this.societyRepository.remove(society)
  }
}