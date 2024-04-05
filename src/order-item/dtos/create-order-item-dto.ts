import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderItemDTO {
  @IsInt()
  @IsNotEmpty({ message: 'Amount cannot be empty' })
  amount: number;

  @IsString()
  @IsNotEmpty({ message: 'ProductId cannot be empty' })
  productId: string;

  @IsString()
  @IsNotEmpty({ message: 'OrderId cannot be empty' })
  orderId: string;
}
