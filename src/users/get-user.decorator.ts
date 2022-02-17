import { createParamDecorator } from "@nestjs/common";
import { User } from "./schema/user.schema";

export const GetUser = createParamDecorator((data, req): User => {
    console.log(req.user);
    return req.user;
})