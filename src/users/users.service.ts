import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dtos/create-user-dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUser: CreateUserDTO) {
    const emailAlreadyExists = await this.findByEmail(createUser.email);

    if (emailAlreadyExists) {
      throw new BadRequestException(`Email: ${createUser.email}, already exists.`);
    }

    const passwordHash = await hash(createUser.password, 10);

    const user = await this.userRepository.save({
      name: createUser.name,
      email: createUser.email,
      password: passwordHash,
    });

    return {
      id: user.id,
      user: user.name,
      email: user.email,
    };
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findById(id: string) {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async detailCurrentUser(currentUser: UserEntity) {
    const user = await this.userRepository.findOne({
      where: {
        id: currentUser.id,
      },
    });

    return user;
  }
}
