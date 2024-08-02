import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { StatusUser } from './entities/status-user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  let userRepository: Repository<User>;
  let statusUserRepository: Repository<StatusUser>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn().mockResolvedValue({}),
            find: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            save: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue({}),
          },
        },
        {
          provide: getRepositoryToken(StatusUser),
          useValue: {
            findOneBy: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    statusUserRepository = module.get<Repository<StatusUser>>(
      getRepositoryToken(StatusUser),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const dto: CreateUserDto = {
        userName: 'Test User',
        age: 25,
        statusId: 1,
      };
      jest.spyOn(service, 'create').mockResolvedValue({} as any);
      expect(await controller.create(dto)).toEqual({});
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);
      expect(await controller.findAll()).toEqual([]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const id = '1';
      jest.spyOn(service, 'findOne').mockResolvedValue({} as any);
      expect(await controller.findOne(id)).toEqual({});
      expect(service.findOne).toHaveBeenCalledWith(+id);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const id = '1';
      const dto: UpdateUserDto = {
        userName: 'Updated User',
        age: 30,
        statusId: 2,
      };
      jest.spyOn(service, 'update').mockResolvedValue({} as any);
      expect(await controller.update(id, dto)).toEqual({});
      expect(service.update).toHaveBeenCalledWith(+id, dto);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const id = '1';
      jest.spyOn(service, 'remove').mockResolvedValue({} as any);
      expect(await controller.remove(id)).toEqual({});
      expect(service.remove).toHaveBeenCalledWith(+id);
    });
  });
});
