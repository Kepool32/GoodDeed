import { ApiProperty } from '@nestjs/swagger';
import {IsString} from "class-validator";

export class CreateGooddeedDto {
    @ApiProperty({ description: 'Заголовок доброго дела', example: 'Помощь нуждающимся' })
    @IsString({ message: 'Должно быть строкой' })
    readonly title: string;

    @ApiProperty({ description: 'Содержание доброго дела', example: 'Пожертвовать одежду и еду' })
    @IsString({ message: 'Должно быть строкой' })
    readonly content: string;
}
