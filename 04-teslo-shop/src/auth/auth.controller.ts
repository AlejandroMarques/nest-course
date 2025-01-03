import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { GetUser, Auth} from './decorators';
import { User } from './entities/user.entity';
import { LoginUserResponseDto } from './dto/login-user-response.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({status: 201, description: 'User created successfully', type: User})
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @ApiResponse({status: 201, description: 'Login successfully', type: LoginUserResponseDto})
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  @ApiBearerAuth()
  @ApiResponse({status: 201, description: 'Token Renewed', type: User})
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user)
  }
}
