import {
  Controller,
  Body,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/user.dto';
import { LoginGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() userDto: CreateUserDto) {
    return await this.authService.register(userDto);
  }

  @Post('/login')
  async login(@Request() req, @Response() res) {
    const userInfo = await this.authService.validateUser(
      req.body.email,
      req.body.password,
    );

    if (userInfo) {
      res.cookie('login', JSON.stringify(userInfo), {
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
    }
    return res.send({ message: '로그인 성공' });
  }

  @UseGuards(LoginGuard)
  @Post('/login2')
  async login2(@Request() req, @Response() res) {
    const userInfo = await this.authService.validateUser(
      req.body.email,
      req.body.password,
    );

    if (userInfo) {
      res.cookie('login', JSON.stringify(userInfo), {
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
    }
    return res.send({ message: '로그인2 성공' });
  }

  @UseGuards(LoginGuard)
  @Get('/test-guard')
  testGuard() {
    return '로그인 guard 적용 확인.';
  }
}
