import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto} from "./dataTransferObject/create-user.dto";

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  const mockUsersService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call usersService.create with DTO and return result', async () => {
    const dto: CreateUserDto = {
      email: 'test@test.com',
      password: 'password123',
    };

    const createdUser = { id: 1, ...dto };

    mockUsersService.create.mockResolvedValue(createdUser);

    const result = await controller.create(dto);

    expect(usersService.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(createdUser);
  });

  it('should propagate errors from service', async () => {
    const dto: CreateUserDto = {
      email: 'fail@test.com',
      password: 'password123',
    };

    mockUsersService.create.mockRejectedValue(new Error('Service error'));

    await expect(controller.create(dto)).rejects.toThrow('Service error');
  });
});