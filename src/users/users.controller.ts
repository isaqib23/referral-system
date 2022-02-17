import { Body, Controller, Get, Param, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './create-user.dto';
import { LoginUserDto } from './login-user.dto';
import { User } from './schema/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private userService: UsersService
    ){}

    @Post("/signup")
    @UsePipes(ValidationPipe)
    signup(
            @Body() userDto: CreateUserDto,
            @Query("referral_code") referral_code
        ): Promise<any>{
            userDto.code = (referral_code !== undefined) ? referral_code : null;
            return this.userService.signup(userDto);
    }

    @Post("/login")
    @UsePipes(ValidationPipe)
    login(@Body() loginDto: LoginUserDto): Promise<any>{
        return this.userService.login(loginDto);
    }

    @Get("/")
    @UseGuards(AuthGuard())
    index(@Req() req): Promise<User>{
        return req.user;
    }

    @Post("/search")
    search(@Body("email") email): Promise<User[]>{
        return this.userService.search(email);
    }
}
