import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @IsInt()
  @IsNotEmpty({ message: 'Price cannot be empty' })
  price: number;

  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;

  @IsNotEmpty({ message: 'Banner cannot be empty' })
  banner: string;

  @IsNotEmpty({ message: 'CategoryId cannot be empty' })
  categoryId: string;
}
