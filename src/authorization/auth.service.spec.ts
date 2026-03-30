import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
    compare: jest.fn(),
    hash: jest.fn(),
}));

const mockUser = {
    id: 1,
    email: 'test@example.com',
    password: 'hashedpassword',
};

const mockUsersService = {
    findByEmail: jest.fn(),
};

const mockJwtService = {
    sign: jest.fn().mockReturnValue('signed-token'),
};

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: UsersService, useValue: mockUsersService },
                { provide: JwtService, useValue: mockJwtService },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        jest.clearAllMocks();
    });

    describe('validateUser', () => {
        it('should return user without password when credentials are valid', async () => {
            mockUsersService.findByEmail.mockResolvedValue(mockUser);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);

            const result = await service.validateUser('test@example.com', 'password123');

            expect(result).toBeDefined();
            expect(result).not.toBeNull();
            expect(result).not.toHaveProperty('password');
            expect(result!.email).toBe('test@example.com');
        });

        it('should return null when user is not found', async () => {
            mockUsersService.findByEmail.mockResolvedValue(null);

            const result = await service.validateUser('unknown@example.com', 'password123');

            expect(result).toBeNull();
        });

        it('should return null when password does not match', async () => {
            mockUsersService.findByEmail.mockResolvedValue(mockUser);
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);

            const result = await service.validateUser('test@example.com', 'wrongpassword');

            expect(result).toBeNull();
        });
    });

    describe('login', () => {
        it('should return an access_token', async () => {
            const { password, ...userWithoutPassword } = mockUser;
            const result = await service.login(userWithoutPassword);

            expect(result).toHaveProperty('access_token');
            expect(result.access_token).toBe('signed-token');
        });
    });
});