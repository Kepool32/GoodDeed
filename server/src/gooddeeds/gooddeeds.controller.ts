import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CreateGooddeedDto } from "./dto/create-gooddeed.dto";
import { GooddeedsService } from "./gooddeeds.service";
import { JwtAuthGuard } from "../auth/jwt-auth-guard";
import { FriendGuard } from "../friends/is-friend-guard";
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { GoodDeeds } from './gooddeeds.model';
import { User } from 'src/users/users.model';

@ApiTags('Добрые дела')
@Controller('gooddeeds')
export class GooddeedsController {
    constructor(private goodDeedsService: GooddeedsService) {}

    @ApiOperation({ summary: 'Создать новое доброе дело' })
    @ApiResponse({ status: 201, type: GoodDeeds })
    @ApiBadRequestResponse({ status: 400 })
    @UseGuards(JwtAuthGuard)
    @Post()
    createGoodDeed(@Req() req, @Body() dto: CreateGooddeedDto) {
        const userId = req.user.id;
        return this.goodDeedsService.create(dto, userId);
    }

    @ApiOperation({ summary: 'Получить все добрые дела' })
    @ApiResponse({ status: 200, type: [GoodDeeds] })
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getAllGoodDeeds(@Param('id') id: number) {
        return this.goodDeedsService.getAllGoodDeeds(id);
    }

    @ApiOperation({ summary: 'Удалить доброе дело по ID' })
    @ApiResponse({ status: 200 })
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteGoodDeed(@Param('id') id: number) {
        return this.goodDeedsService.deleteGoodDeedById(id);
    }

    @ApiOperation({ summary: 'Обновить доброе дело по ID' })
    @ApiResponse({ status: 200, type: GoodDeeds })
    @ApiBadRequestResponse({ status: 400 })
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateGoodDeed(@Param('id') id: number, @Body() dto: CreateGooddeedDto) {
        return this.goodDeedsService.updateGoodDeed(id, dto);
    }

    @ApiOperation({ summary: 'Получить добрые дела друга' })
    @ApiResponse({ status: 200, type: [GoodDeeds] })
    @UseGuards(JwtAuthGuard, FriendGuard)
    @Get('friends/:friendId')
    getFriendGoodDeeds(@Param('friendId') friendId: number) {
        return this.goodDeedsService.getFriendGoodDeeds(friendId);
    }
}
