import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users.model";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles-model";
import {RolesModule} from "../roles/roles.module";
import {Friend} from "../friends/friends.model";
import {AuthModule} from "../auth/auth.module";
import {GoodDeeds} from "../gooddeeds/gooddeeds.model";




@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports:[

      SequelizeModule.forFeature([User,Role,UserRoles,Friend,GoodDeeds]),
      RolesModule,
      forwardRef(()=>AuthModule),


  ],
    exports:[UsersService],

})
export class UsersModule {}
