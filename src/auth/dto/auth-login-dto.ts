import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthLoginDTO {
  @IsEmail(undefined)
  email: string;

  @IsNotEmpty()
  password: string;
}
