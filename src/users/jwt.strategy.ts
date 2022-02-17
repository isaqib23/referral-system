import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UsersRepository } from "./users.repository";
import { Strategy, ExtractJwt } from "passport-jwt";
import { JWTPayload } from "./jwt-payload";
import { User } from "./schema/user.schema";
import { JWT_SECRET } from "src/app.properties";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        private usersRepository: UsersRepository
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "JWT_SECRET"
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