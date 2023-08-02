import {
    Body,
    Controller,
    Delete,
    Get,
    Post, Put, Req,
    UseGuards,
} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {Roles} from "../auth/role-auth.decorator";
import {RolesGuard} from "../auth/role.guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {JwtAuthGuard} from "../auth/jwt-auth-guard";
import {UpdateUserDto} from "./dto/update-username.dto";




@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

    constructor(private usersService:UsersService) {}

    @ApiOperation({summary:'Создание пользователя'})
    @ApiResponse({status:200,type:User})
    @Post()
    create(@Body() userDto:CreateUserDto){
        return this.usersService.createUser(userDto)
    }

    @ApiOperation({summary:'Получить всех пользователей для Админа'})
    @ApiResponse({status:200,type:[User]})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    getAll(){
        return this.usersService.getAllUsers()
    }

    @ApiOperation({summary:'Выдать роль'})
    @ApiResponse({status:200,type:[User]})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/role')
    AddRole(@Body() dto:AddRoleDto){
        return this.usersService.addRole(dto)
    }

    @ApiOperation({summary:'Пользователь удаляет сам себя'})
    @Delete('/del')
    @UseGuards(JwtAuthGuard)
    async deleteSelfUser(@Req() req) {
        const userId = req.user.id; // Получаем ID пользователя из токена
        await this.usersService.deleteSelfUser(userId);
        return { message: 'Пользователь успешно удален' };
    }

    @ApiOperation({summary:'Пользователь получает информацию о себе'})
    @ApiResponse({status:200,type:User})
    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getUserById(@Req() req) {
        const userId = req.user.id;
        const user = await this.usersService.getUserById(userId);

        return user;
    }

    @ApiOperation({summary:'Получить всех пользователей для Пользователя'})
    @ApiResponse({status:200,type:[User]})
    @UseGuards(JwtAuthGuard)
    @Get("/check")
    getAllByUsers(){
        return this.usersService.getAllByUsers()
    }
}
