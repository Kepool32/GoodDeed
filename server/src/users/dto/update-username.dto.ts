// update-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {Length} from "class-validator";

export class UpdateUserDto {
    @ApiProperty({ example: 'new_username', description: 'Новое имя пользователя' })
    @Length(2,25,{message:"Не меньше 4 и не больше 16"})
    username: string;
}