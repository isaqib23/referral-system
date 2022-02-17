import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength, validate } from "class-validator";

export class LoginUserDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    {message: "Password too weak"})
    password: string
}