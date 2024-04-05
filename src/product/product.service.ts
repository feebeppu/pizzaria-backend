import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/database/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dtos/create-product-dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(createProduct: CreateProductDTO) {
    const createdProduct = await this.productRepository.save({
      name: createProduct.name,
      price: createProduct.price,
      description: createProduct.description,
      banner: createProduct.banner,
      categoryId: createProduct.categoryId,
    });

    return createdProduct;
  }

  async findProductByCategory(categoryId: string) {
    const products = await this.productRepository.find({
      where: {
        categoryId: categoryId,
      },
    });

    return products;
  }
}
