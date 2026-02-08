import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './types/user.type';
import { CreateUserDto } from './dto/create.dto';


@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Post('create')
    create(@Body() user: CreateUserDto) {
        console.log(user)
        return this.userService.createUser(user);
    }
}
