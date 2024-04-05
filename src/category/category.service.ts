import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/database/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDTO } from './dtos/create-category-dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async createCategory(createCategory: CreateCategoryDTO) {
    const { categories } = await this.findAllCategories();

    const categoryExists = categories.some((category) => category.name === createCategory.name);

    if (categoryExists) {
      throw new BadRequestException('Category already exists');
    }

    const createdCategory = await this.categoryRepository.save({
      name: createCategory.name,
    });

    return {
      id: createdCategory.id,
      name: createdCategory.name,
    };
  }

  async findAllCategories() {
    const categories = await this.categoryRepository.find({
      order: { name: 'ASC' },
      select: {
        id: true,
        name: true,
      },
    });

    return {
      categories,
    };
  }
}
