import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from 'src/utils/jwt-payload';
import { CreateUserDto } from './create-user.dto';
import { LoginUserDto } from './login-user.dto';
import { User } from './schema/user.schema';
import { UsersRepository } from './users.repository';
const shortid = require('shortid');

@Injectable()
export class UsersService {

    constructor(
        private userRespository: UsersRepository,
        private jwtService: JwtService
    ){}

    async signup(userDto: CreateUserDto): Promise<object>{
        const referral_code = shortid.generate();
        const { name, email, password, code } = userDto;
        const referral_count = 0;
        const referred_by = (code) ? code : null;

        if(code){
            const checkCode = await this.getUserByCode(code);
            // check referral code is valid
            if(!checkCode) throw new NotFoundException('Invalid referral code. Try Again!');
            
            // Check maximum referral
            if(checkCode.referral_count >= parseInt(process.env.MAX_REFERRAL_LEVEL)) throw new NotFoundException('Maxmimum allowed referral level reached. Try Again!');
        }

        const userObject: User = { name, email, password, referral_code, referral_count, referred_by}
        await this.userRespository.createUser(userObject);
        
        // update user referral count if signup using referral code
        if(code){
            await this.updateUserReferral(code);
        }

        const payload: JWTPayload = { name, email };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken, name, email };
    }

    async login(loginDto: LoginUserDto): Promise<object>{
        const user =  await this.userRespository.validateUser(loginDto);

        if(!user) throw new UnauthorizedException('Email or Password is wrong');
        
        const { name, email } = user;
        const payload: JWTPayload = { name, email };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken, name, email };
    }

    async getUserByEmail(email: string): Promise<boolean> {
        let user =  await this.userRespository.findByEmail(email);
        return !user;
    }

    async getUserByCode(code: string): Promise<User> {
        return await this.userRespository.findByCode(code);
    }

    private async updateUserReferral(referral_code: string): Promise<void>{
        await this.userRespository.updateUser(referral_code);
    }

    async search(email: string): Promise<User[]>{
        const user = await this.userRespository.findByEmail(email);
        if(user){
            return this.userRespository.search(user.referral_code);
        }

        return null;
    }
}
