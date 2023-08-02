import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class FriendGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if (bearer !== 'Bearer' || !token) {
                throw new HttpException('Пользователь не авторизован',HttpStatus.FORBIDDEN)
            }

            const user = this.jwtService.verify(token);
            const { friends } = user; // Получаем информацию о друзьях из токена

            // В данном примере мы проверяем, что в запросе есть параметр friendId,
            // и сравниваем его со списком friendsId из токена
            const friendId = +req.params.friendId; // Получаем friendId из параметров запроса

            // Проверяем, есть ли friendId в списке friendsId
            const isFriend = friends.some((friend) => friend.friendId === friendId);

            if (!isFriend) {
                throw new HttpException('Пользователь отсутствует в друзьях',HttpStatus.FORBIDDEN)
            }
            return true; // Возвращаем true, если пользователь является другом, и false, если нет
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}
