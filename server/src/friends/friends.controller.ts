import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { FriendsDto } from './dto/friends.dto';

@ApiTags('Друзья')
@Controller('friends')
export class FriendsController {
    constructor(private readonly friendService: FriendsService) {}

    @ApiOperation({ summary: 'Добавление друга' })
    @ApiResponse({ status: 200, description: 'Успешно добавлен друг', type: FriendsDto })
    @ApiBody({ type: FriendsDto, description: 'Данные друга' })
    @UseGuards(JwtAuthGuard)
    @Post('add')
    async addFriend(@Req() req, @Body() dto: FriendsDto) {
        const nameId = req.user.nameId;
        return this.friendService.addFriend(dto, nameId);
    }
}
