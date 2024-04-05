import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @ApiProperty()
  name: string;

  @IsEmail(undefined, { message: 'Invalid email' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @ApiProperty()
  email: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{6,30}$/, {
    message:
      'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito, um caractere especial e ter entre 8 e 30 caracteres',
  })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @ApiProperty()
  password: string;
}
