import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dtos/create-category-dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createCategory(@Body() createCategory: CreateCategoryDTO) {
    return await this.categoryService.createCategory(createCategory);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAllCategories() {
    return await this.categoryService.findAllCategories();
  }
}
