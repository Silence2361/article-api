import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { CreateUserResponseRto } from './rto/create-user-response-rto';
import { FindAllUsersResponseRto } from './rto/find-all-users-response-rto';
import { FindUserByIdResponseRto } from './rto/find-user-by-id-response-rto';
import { UpdateUserByIdDto } from './dto/update-user-by-id-dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({
    status: 201,
    description: 'User created',
    type: CreateUserResponseRto,
  })
  @ApiResponse({
    status: 409,
    description: 'User with such email already exists',
  })
  @ApiBody({ type: CreateUserDto })
  async createUser(
    @Body() user: CreateUserDto,
  ): Promise<CreateUserResponseRto> {
    return this.usersService.createUser(user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Users found',
    type: [FindAllUsersResponseRto],
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findAllUsers(): Promise<FindAllUsersResponseRto[]> {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: FindUserByIdResponseRto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findUserById(
    @Param('id') id: number,
  ): Promise<FindUserByIdResponseRto> {
    return this.usersService.findUserById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateUserByIdDto })
  @ApiResponse({ status: 200, description: 'User updated' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateUserById(
    @Param('id') id: number,
    @Body() user: UpdateUserByIdDto,
  ): Promise<void> {
    return this.usersService.updateUserById(id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'User deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async deleteUserById(@Param('id') id: number): Promise<void> {
    return this.usersService.deleteUserById(id);
  }
}
