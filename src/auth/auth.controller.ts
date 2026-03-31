import { Controller, Get, Post, Body, UseGuards, Req, SetMetadata } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';

import { User } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

import { UserRoleGuard } from './guards/user-role/user-role.guard';

import { ValidRoles } from './interfaces/valid-roles.interface';

import { Auth, GetUser, GetRowHeaders, RoleProtected } from './decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(
    @GetUser() user: User,
  ) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    //@Req() request: Express.Request
    @GetUser() user: User,
    @GetUser('email') email: string,
    @GetRowHeaders() headers: string[],
  ) {

    // console.log( {user: request.user});

    console.log({ user });

    return {
      ok: true,
      message: 'Ruta privada',
      user,
      email,
      headers,
    }
  }

  //@SetMetadata('roles', ['admin', 'super-user'])

  @Get('private2')
  @RoleProtected(ValidRoles.admin, ValidRoles.superUser)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(
    @GetUser() user: User,
  ) {

    return {
      ok: true,
      message: 'Ruta privada 2',
      user,
    }
  }

  @Get('private3')
  @Auth(ValidRoles.admin)
  privateRoute3(
    @GetUser() user: User,
  ) {

    return {
      ok: true,
      message: 'Ruta privada 2',
      user,
    }
  }

}
