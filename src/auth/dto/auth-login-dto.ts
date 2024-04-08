import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthLoginDTO {
  @IsEmail(undefined)
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;
}
