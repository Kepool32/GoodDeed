import { ApiProperty } from '@nestjs/swagger';
import {IsString} from "class-validator";

export class FriendsDto {
    @ApiProperty({ description: 'Идентификатор друга (nameid)', example: '@john_doe_123' })
    @IsString({ message: 'Должно быть строкой' })
    readonly nameId2: string;
}
