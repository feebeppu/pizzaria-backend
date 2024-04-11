import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dtos/create-user-dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserEntity } from 'src/database/entities/user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('create')
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Create a new user in the database',
  })
  async createUser(@Body() createUser: CreateUserDTO) {
    return await this.userService.createUser(createUser);
  }

  @Get('detail')
  @UseGuards(JwtAuthGuard)
  async detailCurrentUser(@CurrentUser() currentUser: UserEntity) {
    return await this.userService.detailCurrentUser(currentUser);
  }
}
