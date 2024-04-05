import { Body, Controller, Delete, Get, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateOrderDTO } from './dtos/create-order-dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('order')
@ApiTags('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(@Body() createOrder: CreateOrderDTO) {
    return await this.orderService.createOrder(createOrder);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listOrders() {
    return await this.orderService.listOrders();
  }

  @Get('detail')
  @ApiQuery({
    name: 'id',
    required: true,
  })
  @UseGuards(JwtAuthGuard)
  async detailOrder(@Query('id') orderId: string) {
    return await this.orderService.detailOrder(orderId);
  }

  @Patch('send')
  @UseGuards(JwtAuthGuard)
  async sendOrder(@Query('id') orderId: string) {
    const sendedOrder = await this.orderService.sendOrder(orderId);

    return {
      order: sendedOrder,
      message: 'Order sended with sucess',
    };
  }

  @Patch('finished')
  @UseGuards(JwtAuthGuard)
  async finishedOrder(@Query('id') orderId: string) {
    const finishedOrder = await this.orderService.finishOrder(orderId);

    return {
      order: finishedOrder,
      message: 'Order finished with sucess',
    };
  }

  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  async deleteOrder(@Query('id') orderId: string) {
    const deletedOrder = await this.orderService.deleteOrder(orderId);

    return {
      order: deletedOrder,
      message: 'Order deleted with sucess',
    };
  }
}
