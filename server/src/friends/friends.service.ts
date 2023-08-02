import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from '../users/users.service';
import { Friend } from './friends.model';
import { FriendsDto } from './dto/friends.dto';

@Injectable()
export class FriendsService {
    constructor(
        private readonly userService: UsersService,
        @InjectModel(Friend) private friendModel: typeof Friend,
    ) {}

    async addFriend(dto: FriendsDto, userId: string) {
        const { nameId2 } = dto;

        // Проверяем, что пользователь не пытается добавить себя в друзья
        const user = await this.userService.getUserBynameid(userId);
        if (!user) {
            throw new NotFoundException('Пользователь не найден');
        }

        if (user.nameid === nameId2) {
            throw new ConflictException('Нельзя добавить себя в друзья');
        }

        // Ищем пользователя по его nameId из dto
        const friendUser = await this.userService.getUserBynameid(nameId2);
        if (!friendUser) {
            throw new NotFoundException('Пользователь не найден');
        }

        // Проверяем, является ли пользователь уже другом
        const existingFriendship = await this.friendModel.findOne({
            rejectOnEmpty: undefined,
            where: { userId: user.id, friendId: friendUser.id },
        });

        if (existingFriendship) {
            throw new ConflictException('Пользователь уже добавлен в друзья');
        }

        // Создаем запись о дружбе
        await this.friendModel.create({ userId: user.id, friendId: friendUser.id, friendNameid:friendUser.nameid });
    }
}
