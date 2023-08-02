import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {HttpException, HttpStatus, Injectable, NotFoundException} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {generateNameId} from "./utils/generateNameId";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";


@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository:typeof User,
                private roleService:RolesService,) {}

    async createUser(dto: CreateUserDto) {
        try {
            const user = await this.userRepository.create(dto);
            const nameId = generateNameId(dto.username, user.id);
            user.nameid = nameId;
            await user.save();

            let role = await this.roleService.getRoleByValue('USER');

            if (!role) {
                // Если роль "USER" не существует, создадим её
                role = await this.roleService.createRole({ value: 'USER', description: 'User Role' });
            }

            if (role !== null && role.id) {
                await user.$set('roles', [role.id]);
                user.roles = [role];
            } else {

                throw new Error('Не удалось назначить роль пользователю.');
            }

            return user;
        } catch (error) {

            console.error('Произошла ошибка при создании пользователя:', error.message);
            throw error; // Перебросить ошибку выше для дальнейшей обработки
        }
    }

    async getAllUsers(){
        const users = await this.userRepository.findAll({include:{all:true}});
        return users;
    }

    async getUserBynameid(nameid: string) {
        const user = await this.userRepository.findOne({
            rejectOnEmpty: undefined,
            where: { nameid: nameid }
        });

        return user;
    }


    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({
            rejectOnEmpty: undefined,
            where: { email: email },
            include:{all:true}
        });

        return user;
    }
    async getUserByName(name: string) {
        const user = await this.userRepository.findOne({
            rejectOnEmpty: undefined,
            where: { username: name },
            include:{all:true}
        });

        return user;
    }

    async addRole(dto: AddRoleDto){
        const user = await this.userRepository.findByPk(dto.userId)
        const role =await this.roleService.getRoleByValue(dto.value)
        if(role && user){
            await user.$add('role',role.id)
            return dto;
        }
        throw new HttpException('Пользователь или роль не найдены',HttpStatus.NOT_FOUND)
    }

    async deleteSelfUser(userId: number) {
        const user = await this.userRepository.findByPk(userId);
        if (!user) {
            throw new NotFoundException('Пользователь не найден');
        }
        await user.destroy();
    }


    async getUserById(id: number) {
        return this.userRepository.findByPk(id, { include: { all: true } });
    }

    async getAllByUsers(){
        const users = await this.userRepository.findAll();
        return users;
    }
}
