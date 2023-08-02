import {Module} from "@nestjs/common";

import {SequelizeModule} from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles-model";
import { FriendsModule } from './friends/friends.module';
import {Friend} from "./friends/friends.model";
import { AuthModule } from './auth/auth.module';
import { GooddeedsModule } from './gooddeeds/gooddeeds.module';
import {GoodDeeds} from "./gooddeeds/gooddeeds.model";
import {ServeStaticModule} from "@nestjs/serve-static";
import path from "path";


@Module({
    controllers:[],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath:`.${process.env.NODE_ENV}.env`
        }),

        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User,Role,UserRoles,Friend,GoodDeeds],
            autoLoadModels:true
        }),
        UsersModule,
        RolesModule,
        FriendsModule,
        AuthModule,
        GooddeedsModule,

    ],
})
export class AppModule{


}