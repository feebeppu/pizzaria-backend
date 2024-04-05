import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthLoginDTO {
  @IsEmail(undefined, { message: 'Email is invalid' })
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;
}
