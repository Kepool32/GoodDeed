import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";

import * as bcrypt from 'bcryptjs'
import {AuthUserDto} from "./dto/auth-user-dto";

@Injectable()
export class AuthService {


    constructor(private userService:UsersService,
                private jwtService:JwtService) {}

    async login(userDto:AuthUserDto){

        const user= await this.validateUser(userDto)
        return this.generateToken(user)

    }


    async registration( userDto:CreateUserDto) {
        const candidate=await this.userService.getUserByEmail(userDto.email)
        if(candidate){
            throw new HttpException('Пользователи с таким email существует',HttpStatus.BAD_REQUEST)
        }

        const username=await this.userService.getUserByName(userDto.username)
        if(username){
            throw new HttpException('Пользователи с таким именем существует',HttpStatus.BAD_REQUEST)
        }

        const hashPassword=await bcrypt.hash(userDto.password,5)
        const user = await this.userService.createUser({...userDto,password:hashPassword})
        return this.generateToken(user)
    }

    private async generateToken(user) {
        const payload = {
            id: user.id,
            email: user.email,
            nameId: user.nameid,
            username: user.username,
            roles: user.roles,
            friends: user.friends,
            goodlist: user.goodDeeds,
        };
        return {
            token: this.jwtService.sign(payload),
        };
    }

    private async validateUser(userDto:AuthUserDto){
        const user = await this.userService.getUserByEmail(userDto.email)
        const passwordEquals = await bcrypt.compare(userDto.password,user.password)
        if(user && passwordEquals){
            return user;
        }
        throw new UnauthorizedException({message:'Некорректный email или пароль'})
    }

}
