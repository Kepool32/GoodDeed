import { Module } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Friend} from "./friends.model";
import {User} from "../users/users.model";
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
  controllers: [FriendsController],
  providers: [FriendsService],
  imports: [SequelizeModule.forFeature([Friend,User]),UsersModule,
    JwtModule.register({
      secret:process.env.PRIVATE_KEY || 'SECRET',
      signOptions:{
        expiresIn:'24h'
      }
    })],

})
export class FriendsModule {}
