import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from 'src/database/entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDTO } from './dtos/create-order-dto';
import { OrderItemEntity } from 'src/database/entities/order-item.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,

    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepository: Repository<OrderItemEntity>,
  ) {}

  async createOrder(createOrder: CreateOrderDTO) {
    const createdOrder = await this.orderRepository.save({
      table: createOrder.table,
      name: createOrder.name ? createOrder.name : null,
    });

    return createdOrder;
  }

  async sendOrder(orderId: string) {
    await this.orderRepository.update(orderId, {
      draft: false,
    });

    const order = await this.orderRepository.findOne({
      where: {
        id: orderId,
      },
    });

    return order;
  }

  async finishOrder(orderId: string) {
    await this.orderRepository.update(orderId, {
      status: true,
    });

    const finishedOrder = await this.orderRepository.findOne({
      where: {
        id: orderId,
      },
    });

    return finishedOrder;
  }

  async listOrders() {
    const orders = await this.orderRepository.find({
      where: {
        status: false,
        draft: false,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    return orders;
  }

  async detailOrder(orderId: string) {
    const details = await this.orderItemRepository.find({
      where: {
        orderId,
      },
      relations: ['product'],
    });

    return details;
  }

  async deleteOrder(orderId: string) {
    const result = await this.orderRepository.delete(orderId);

    if (!result.affected) {
      throw new NotFoundException('Order not found.');
    }

    const deletedOrder = await this.orderRepository.findOne({
      where: {
        id: orderId,
      },
    });

    return deletedOrder;
  }
}
