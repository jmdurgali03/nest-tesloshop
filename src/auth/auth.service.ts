import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    findOneBy(userId: string) {
        throw new Error('Method not implemented.');
    }
    findOne(userId: string) {
        throw new Error('Method not implemented.');
    }

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly jwtService: JwtService,
    ) { }

    async create(createUserDto: CreateUserDto) {

        try {

            const { password, ...userData } = createUserDto;

            const user = this.userRepository.create({
                ...userData,
                password: bcrypt.hashSync(password, 10)
            });

            await this.userRepository.save(user);

            return {
                ...user,
                token: this.getJwtToken({ id: user.id }),
                message: 'Usuario creado exitosamente'
            };
        }

        catch (error) {
            this.handleDBErrors(error);
        }
    }

    async login(loginUserDto: LoginUserDto) {

        const { password, email } = loginUserDto;

        const user = await this.userRepository.findOne({
            where: { email },
            select: { id: true, email: true, password: true }
        });

        if (!user) {
            throw new UnauthorizedException('Credenciales no validas');
        }

        if (!bcrypt.compareSync(password, user.password)) {
            throw new UnauthorizedException('Credenciales no validas');
        }

        return {
            ...user,
            token: this.getJwtToken({ id: user.id }),
            message: 'Login exitoso'
        }
    }

    checkAuthStatus(user: User) {
        return {
            ...user,
            token: this.getJwtToken({ id: user.id }),
            message: 'Login exitoso'
        }
    }

    private getJwtToken(payload: JwtPayload) {

        const token = this.jwtService.sign(payload);

        return token;
    }

    // este metodo no retorna valores
    private handleDBErrors(error: any): never {

        if (error.code === '23505') {
            throw new BadRequestException(error.detail);
        }

        console.log(error);

        throw new InternalServerErrorException('Something went wrong');
    }
}
