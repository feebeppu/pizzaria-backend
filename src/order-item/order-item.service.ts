import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemEntity } from 'src/database/entities/order-item.entity';
import { Repository } from 'typeorm';
import { CreateOrderItemDTO } from './dtos/create-order-item-dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepository: Repository<OrderItemEntity>,
  ) {}

  async addOrderItem(createOrderItem: CreateOrderItemDTO) {
    const item = await this.orderItemRepository.save({
      amount: createOrderItem.amount,
      productId: createOrderItem.productId,
      orderId: createOrderItem.orderId,
    });

    const createdOrderItem = await this.orderItemRepository.findOne({
      where: {
        id: item.id,
      },
      relations: ['product', 'order'],
    });

    return {
      id: createdOrderItem.id,
      product: createdOrderItem.product.name,
      table: createdOrderItem.order.table,
    };
  }

  async deleteOrderItem(orderItemId: string) {
    const result = await this.orderItemRepository.delete(orderItemId);

    if (!result.affected) {
      throw new NotFoundException('Order item not found.');
    }

    const deletedOrderItem = await this.orderItemRepository.findOne({
      where: {
        id: orderItemId,
      },
    });

    return deletedOrderItem;
  }
}
