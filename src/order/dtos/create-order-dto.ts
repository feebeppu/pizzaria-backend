import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOrderDTO {
  @IsInt()
  @IsNotEmpty({ message: 'Table cannot be empty' })
  table: number;

  @IsString()
  @IsOptional()
  name: string;
}
