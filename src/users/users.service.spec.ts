import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import {CreateUserDto} from "./dataTransferObject/create-user.dto";

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create and return a user successfully', async () => {
    const dto: CreateUserDto = {
      email: 'test@test.com',
      password: 'password123',
    };

    const savedUser = {
      id: 1,
      ...dto,
    };

    mockRepository.create.mockReturnValue(dto);
    mockRepository.save.mockResolvedValue(savedUser);

    const result = await service.create(dto);

    expect(repository.create).toHaveBeenCalledWith(dto);
    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(result).toEqual(savedUser);
  });

  it('should throw an error if repository.save fails', async () => {
    const dto: CreateUserDto = {
      email: 'fail@test.com',
      password: 'password123',
    };

    mockRepository.create.mockReturnValue(dto);
    mockRepository.save.mockRejectedValue(new Error('DB error'));

    await expect(service.create(dto)).rejects.toThrow('DB error');

    expect(repository.save).toHaveBeenCalledTimes(1);
  });

  it('should pass the correct DTO to repository.create', async () => {
    const dto: CreateUserDto = {
      email: 'payload@test.com',
      password: 'abc123',
    };

    mockRepository.create.mockReturnValue(dto);
    mockRepository.save.mockResolvedValue({ id: 2, ...dto });

    await service.create(dto);

    expect(repository.create).toHaveBeenCalledWith({
      email: dto.email,
      password: dto.password,
    });
  });
});