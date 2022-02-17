import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { JWTPayload } from "./jwt-payload";
import { User } from "src/users/schema/user.schema";
import { UsersRepository } from "src/users/users.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        private usersRepository: UsersRepository
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(payload: JWTPayload): Promise<User>{
        const { email } = payload;
        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }
}