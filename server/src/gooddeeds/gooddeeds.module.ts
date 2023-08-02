import { Module } from '@nestjs/common';
import { GooddeedsService } from './gooddeeds.service';
import { GooddeedsController } from './gooddeeds.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {GoodDeeds} from "./gooddeeds.model";
import {User} from "../users/users.model";
import {JwtModule} from "@nestjs/jwt";

@Module({
  providers: [GooddeedsService],
  controllers: [GooddeedsController],
  imports:[
      SequelizeModule.forFeature([User,GoodDeeds]),
      JwtModule.register({
          secret:process.env.PRIVATE_KEY || 'SECRET',
          signOptions:{
              expiresIn:'24h'
          }
      })
  ]
})
export class GooddeedsModule {}
