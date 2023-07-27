import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Get, Post, Body, Param, Put, Delete } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/getUsers')
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Post('/create')
  createUser(@Body() user: User) {
    return this.userService.createUser(user);
  }

  @Get('/getUser/:email')
  async getUserByEmail(@Param('email') email: string) {
    const user = await this.userService.getUserByEmail(email);
    return user;
  }

  @Put('/update/:email')
  updateUser(@Param('email') email: string, @Body() user: User) {
    return this.userService.updateUser(email, user);
  }

  @Delete('/delete/:email')
  deleteUser(@Param('email') email: string) {
    return this.userService.deleteUser(email);
  }
}
