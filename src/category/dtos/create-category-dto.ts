import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDTO {
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;
}
