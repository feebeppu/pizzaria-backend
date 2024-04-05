import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { AuthLoginPayload } from './interfaces/auth-login-payload';
import { JWTService } from 'src/jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JWTService,
  ) {}

  async login(email: string, password: string) {
    const userLogin = await this.userService.findByEmail(email);

    const passwordLogin = await bcrypt.compare(password, userLogin.password);

    if (!passwordLogin) {
      throw new BadRequestException('Email or password are incorrect');
    }

    const payload: AuthLoginPayload = {
      id: userLogin.id,
      email: userLogin.email,
    };

    const token = await this.jwtService.getToken(payload);

    return {
      message: `Welcome back ${userLogin.name}!`,
      user: userLogin,
      token: token,
    };
  }
}
