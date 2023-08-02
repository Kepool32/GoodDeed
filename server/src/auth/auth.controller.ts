import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBody } from "@nestjs/swagger";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { AuthUserDto } from "./dto/auth-user-dto";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'Вход в систему' })
    @ApiBody({ type: AuthUserDto })
    @Post('/login')
    login(@Body() userDto: AuthUserDto) {
        return this.authService.login(userDto);
    }

    @ApiOperation({ summary: 'Регистрация нового пользователя' })
    @ApiBody({ type: CreateUserDto })
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }
}
