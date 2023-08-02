import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles-model";
import {Friend} from "../friends/friends.model";
import {GoodDeeds} from "../gooddeeds/gooddeeds.model";

interface UserCreationAttrs{
    email:string;
    password:string;
    username:string;
}


@Table({tableName:'users'})
export class User extends Model<User,UserCreationAttrs>{

    @ApiProperty({example:'1',description:'Уникальный индетификатор'})
    @Column({type: DataType.INTEGER,unique:true,autoIncrement:true,primaryKey:true})
    id:number;

    @ApiProperty({example:'user',description:'Имя пользователя'})
    @Column({type: DataType.STRING,unique:true,allowNull:false})
    username:string;

    @ApiProperty({example:'@user_1',description:'Уникальный индетификатор пользователя'})
    @Column({type: DataType.STRING,unique:true})
    nameid:string;

    @ApiProperty({example:'user@mail.ru',description:'Почтовый адрес'})
    @Column({type: DataType.STRING,unique:true,allowNull:false})
    email:string;

    @ApiProperty({example:'password123',description:'Пароль'})
    @Column({type: DataType.STRING,allowNull:false})
    password:string;

    @BelongsToMany(()=>Role,()=>UserRoles)
    roles:Role[];

    @HasMany(() => Friend)
    friends: Friend[];

    @HasMany(() => GoodDeeds)
    goodDeeds: GoodDeeds[];
}