import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { LoginUserDto } from "./login-user.dto";
import { User, UserDocument } from "./schema/user.schema";
const bcrypt = require('bcrypt');

@Injectable()
export class UsersRepository {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ){}

    async createUser(user: User): Promise<User>{
        const { password } = user;
        user.password = await this.generateHashPassword(password);

        let newUser = new this.userModel(user);
        return newUser.save();
    }

    async findByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email: email })
    }

    async findByCode(code: string): Promise<User> {
        return await this.userModel.findOne({ referral_code: code })
    }

    private async generateHashPassword(password: string): Promise<string>{
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }

    async validateUser(loginUser: LoginUserDto): Promise<User>{
        const { email, password } = loginUser;
        const user = await this.findByEmail(email);

        if(user && await bcrypt.compare(password, user.password)){
            return user;
        }

        return null;
    }

    async updateUser(referral_code: string): Promise<User> {
        const user = await this.userModel.findOne({ referral_code });
        user.referral_count++;
        return user.save();
    }
}