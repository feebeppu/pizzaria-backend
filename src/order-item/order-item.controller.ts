import { Body, Controller, Delete, Get, Post, Query, UseGuards } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateOrderItemDTO } from './dtos/create-order-item-dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('order-item')
@ApiTags('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async addOrderItem(@Body() createOrderItem: CreateOrderItemDTO) {
    return await this.orderItemService.addOrderItem(createOrderItem);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteOrderItem(@Query('id') orderItemId: string) {
    const deletedOrderItem = await this.orderItemService.deleteOrderItem(orderItemId);

    return {
      order: deletedOrderItem,
      message: 'Order item deleted with sucess',
    };
  }
}
