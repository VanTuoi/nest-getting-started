import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { StatusUser } from './entities/status-user.entity';
import { Logger } from '@nestjs/common';

const logger = new Logger('Bootstrap');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(StatusUser)
    private statusUsersRepository: Repository<StatusUser>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const status = await this.statusUsersRepository.findOneBy({
      id: createUserDto.statusId,
    });

    const existingUser = await this.usersRepository.findOneBy({
      userName: createUserDto.userName,
    });

    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }
    if (!status) {
      throw new NotFoundException('Status not found');
    }

    const user = this.usersRepository.create({ ...createUserDto, status });

    logger.log('Creating a new user', JSON.stringify(createUserDto));

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<Partial<User>[]> {
    return await this.usersRepository.find({
      select: ['iduser', 'userName'],
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ iduser: id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(id, updateUserDto);
    const updatedUser = await this.usersRepository.findOneBy({ iduser: id });
    if (!updatedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return updatedUser;
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
