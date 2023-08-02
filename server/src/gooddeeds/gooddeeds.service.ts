import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateGooddeedDto} from "./dto/create-gooddeed.dto";
import {GoodDeeds} from "./gooddeeds.model";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class GooddeedsService {
    constructor(@InjectModel(GoodDeeds) private goodDeedsRepository: typeof GoodDeeds) {}

    async create(dto: CreateGooddeedDto, userId: number) {

        const existingGoodDeed = await this.goodDeedsRepository.findOne({rejectOnEmpty: undefined, where: { title: dto.title } });
        if (existingGoodDeed) {
            throw new ConflictException('Доброе дело с таким заголовком уже существует');
        }
        const gooddeeds = await this.goodDeedsRepository.create({ ...dto, userId });
        return gooddeeds;
    }

    async getAllGoodDeeds(userId: number) {
        return this.goodDeedsRepository.findAll({ where: { userId } });
    }

    async deleteGoodDeedById(id: number) {
        const goodDeed =await this.goodDeedsRepository.destroy({ where: { id } });

        if (!goodDeed) {
            throw new NotFoundException('Доброе дело не найдено');
        }

    }


    async updateGoodDeed(id: number, dto: CreateGooddeedDto) {

        const goodDeed = await this.goodDeedsRepository.findByPk(id);

        if (!goodDeed) {
            throw new NotFoundException('Доброе дело не найдено');
        }

        await goodDeed.update(dto);
        return goodDeed;
    }

    async getFriendGoodDeeds(friendId: number) {
        const friendGoodDeeds = await this.goodDeedsRepository.findAll({ where: { userId: friendId } });

        if (!friendGoodDeeds) {
            throw new NotFoundException('Добрые дела друга не найдены');
        }

        return friendGoodDeeds;
    }


}

