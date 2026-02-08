import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Users } from './types/user.type';
import { CreateUserDto } from './dto/create.dto';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }
    async findUserByName(username: string): Promise<User | null> {
       return this.usersRepository.findOne({
        where: {username}
       });  
    }

    async createUser(user:CreateUserDto): Promise<User>{
        return this.usersRepository.save(user);
    }
}
