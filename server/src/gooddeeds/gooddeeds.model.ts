import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import {ApiProperty} from "@nestjs/swagger";

interface GoodDeedsCreationAttrs{
    title:string;
    content:string;
    userId:number;
}


@Table({tableName:'gooddeeds'})
export class GoodDeeds extends Model<GoodDeeds,GoodDeedsCreationAttrs>{

    @ApiProperty({ example: 1, description: 'Уникальный идентификатор записи' }) // Добавили ApiProperty
    @Column({type: DataType.INTEGER,unique:true,autoIncrement:true,primaryKey:true})
    id:number;

    @ApiProperty({ example: 'Заголовок', description: 'Заголовок записи' }) // Добавили ApiProperty
    @Column({type: DataType.STRING,unique:true,allowNull:false})
    title:string;

    @ApiProperty({ example: 'Содержание', description: 'Содержание записи' }) // Добавили ApiProperty
    @Column({type: DataType.STRING,allowNull:false})
    content:string;

    @ForeignKey(()=>User)
    @Column({type:DataType.INTEGER})
    userId:number;

    @BelongsTo(()=>User)
    author:User;
}