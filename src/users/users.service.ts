import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dataTransferObject/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async create(dto: CreateUserDto): Promise<Omit<User, 'password'>> {
        const hashed = await bcrypt.hash(dto.password, 10);
        const user = this.usersRepository.create({ ...dto, password: hashed });
        const saved = await this.usersRepository.save(user);
        const { password, ...result } = saved;
        return result;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { email } });
    }
}