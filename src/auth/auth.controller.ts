import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registration-dto';
import { LoginDto } from './dto/login-dto';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginResponseRto } from './rto/login-response-rto';
import { RegistrationResponseRto } from './rto/registration-response-rto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: RegistrationDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data or email already exists',
  })
  async registration(
    @Body() registrationDto: RegistrationDto,
  ): Promise<RegistrationResponseRto> {
    return this.authService.register(registrationDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'Success login, returns JWT token',
    type: LoginResponseRto,
  })
  @ApiBadRequestResponse({ description: 'Invalid email or password' })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseRto> {
    return this.authService.login(loginDto);
  }
}
