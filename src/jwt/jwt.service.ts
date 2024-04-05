import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { AuthLoginPayload } from 'src/auth/interfaces/auth-login-payload';

@Injectable()
export class JWTService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async getToken(tokenPayload: AuthLoginPayload, expires?: string): Promise<string> {
    try {
      const token: string = await this.jwtService.signAsync(tokenPayload, {
        expiresIn: expires || this.configService.get<number>('JWT_EXPIRATION'),
      });

      return `Bearer ${token}`;
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }
}
