import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dtos/create-product-dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createProduct(@Body() createProduct: CreateProductDTO) {
    return await this.productService.createProduct(createProduct);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findProductByCategory(@Query('id') categoryId: string) {
    return await this.productService.findProductByCategory(categoryId);
  }
}
