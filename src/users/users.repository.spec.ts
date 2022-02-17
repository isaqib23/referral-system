import { Test } from "@nestjs/testing";
import { JwtStrategy } from "./jwt.strategy";
import { User } from "./schema/user.schema";
import { UsersRepository } from "./users.repository";

const mockUserRepository = () => ({
    findByEmail: jest.fn()
})

describe("UsersRepository", () => {
    let jwtStrategy;
    let userRespository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers:[
                JwtStrategy,
                {provide: UsersRepository, useFactory: mockUserRepository}
            ]
        }).compile();

        userRespository = await module.get<JwtStrategy>(JwtStrategy);
    })

    describe("validate", () => {
        it('validates and returns the user based on JWT payload', async() => {
            const user = new User();
            user.email = "test@test.com";

            userRespository.findByEmail;
            const result = await jwtStrategy.validate({ email: "test@test.com"});
            expect(userRespository.findOne).toHaveBeenCalledWith({ email: "test@test.com"});
            expect(result).toEqual(user);
        })

        it('throws an unauthorized exception as user cannot be found', () => {
            
        })
    })
})