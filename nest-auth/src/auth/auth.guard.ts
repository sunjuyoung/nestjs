import { CanActivate, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  // CanActivate는 메서드 구현
  async canActivate(context: any): Promise<boolean> {
    //컨텍스트에서 request 객체를 가져옴
    const request = context.switchToHttp().getRequest();

    //쿠키 확인
    if (request.cookies['login']) {
      return true;
    }

    if (!request.body.email || !request.body.password) {
      return false;
    }

    //authservice의 validateUser 메서드를 통해 유저 정보 확인
    const user = await this.authService.validateUser(
      request.body.email,
      request.body.password,
    );

    if (!user) {
      return false;
    }

    //유저 정보가 있다면 쿠키에 유저 정보를 담아서 true를 반환
    request.user = user;
    return true;
  }
}
