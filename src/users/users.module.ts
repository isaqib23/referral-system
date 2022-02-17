import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JWT_SECRET } from 'src/app.properties';
import { UserExistsRule } from 'src/Decorators/UserExistRule';
import { JwtStrategy } from './jwt.strategy';
import { User, UserSchema } from './schema/user.schema';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [
    PassportModule.register( {defaultStrategy: "jwt"} ),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: 3600
      }
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ])
],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    UserExistsRule,
    JwtStrategy
  ],
  exports: [
    JwtStrategy,
    PassportModule
  ]
})
export class UsersModule {}
