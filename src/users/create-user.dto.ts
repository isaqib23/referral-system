import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength, validate } from "class-validator";
import { UserExists } from "src/Decorators/UserExistRule";

export class CreateUserDto {

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @UserExists()
    email: string;

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    {message: "Password too weak"})
    password: string

    code: string
}