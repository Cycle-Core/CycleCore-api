import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from '@app/contracts';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }


    @Get()
    getAllUsers() {
        return this.userService.getAllUsers({});
    }

    @Get(':id')
    findAUser(@Param('id') id: number) {
        return this.userService.findAUser(id);
    }

    @Post()
    createAUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createAUser(createUserDto);
    }

    @Patch()
    updateAUser(@Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateAUser(updateUserDto);
    }

    @Delete(':id')
    deleteAUser(@Param('id') id: number) {
        return this.userService.deleteAUser(id);
    }
}
