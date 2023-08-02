import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../users/users.model';

@Table({ tableName: 'friends' })
export class Friend extends Model<Friend> {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор друга', type: Number })
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;

    @ApiProperty({ example: 1, description: 'ID пользователя', type: Number })
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @ApiProperty({ example: 2, description: 'ID друга пользователя', type: Number })
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    friendId: number;

    @ApiProperty({example:'@user_1',description:'Уникальный индетификатор имя друга'})
    @Column({type: DataType.STRING,unique:true})
    friendNameid:string;

    @BelongsTo(() => User, { foreignKey: 'userId' })
    user: User;

    @BelongsTo(() => User, { foreignKey: 'friendId' })
    friend: User;
}
