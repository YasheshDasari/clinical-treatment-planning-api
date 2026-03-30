import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dataTransferObject/create-user.dto';

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
      email: dto.email,
      password: '$2b$10$hashedpassword',
    };

    mockRepository.create.mockImplementation((data) => data);
    mockRepository.save.mockResolvedValue(savedUser);

    const result = await service.create(dto);

    const callArg = (repository.create as jest.Mock).mock.calls[0][0];
    expect(callArg.email).toBe(dto.email);
    expect(callArg.password).not.toBe(dto.password);
    expect(callArg.password).toMatch(/^\$2b\$/);

    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(result).not.toHaveProperty('password');
  });

  it('should hash the password before saving', async () => {
    const dto: CreateUserDto = {
      email: 'hash@test.com',
      password: 'plaintext123',
    };

    mockRepository.create.mockImplementation((data) => data);
    mockRepository.save.mockResolvedValue({
      id: 2,
      email: dto.email,
      password: '$2b$10$hashedvalue',
    });

    await service.create(dto);

    const callArg = (repository.create as jest.Mock).mock.calls[0][0];
    expect(callArg.password).not.toBe('plaintext123');
    expect(callArg.password).toMatch(/^\$2b\$/);
  });

  it('should strip password from returned user', async () => {
    const dto: CreateUserDto = {
      email: 'strip@test.com',
      password: 'password123',
    };

    mockRepository.create.mockImplementation((data) => data);
    mockRepository.save.mockResolvedValue({
      id: 3,
      email: dto.email,
      password: '$2b$10$hashedvalue',
    });

    const result = await service.create(dto);

    expect(result).not.toHaveProperty('password');
    expect(result.email).toBe(dto.email);
  });

  it('should throw an error if repository.save fails', async () => {
    const dto: CreateUserDto = {
      email: 'fail@test.com',
      password: 'password123',
    };

    mockRepository.create.mockImplementation((data) => data);
    mockRepository.save.mockRejectedValue(new Error('DB error'));

    await expect(service.create(dto)).rejects.toThrow('DB error');
    expect(repository.save).toHaveBeenCalledTimes(1);
  });
});