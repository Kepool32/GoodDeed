import { ApiProperty } from "@nestjs/swagger";
import {IsString} from "class-validator";

export class CreateRoleDto {
    @ApiProperty({ example: 'admin', description: 'Значение роли' })
    @IsString({ message: 'Должно быть строкой' })
    readonly value: string;

    @ApiProperty({ example: 'Администратор системы', description: 'Описание роли' })
    @IsString({ message: 'Должно быть строкой' })
    readonly description: string;
}
