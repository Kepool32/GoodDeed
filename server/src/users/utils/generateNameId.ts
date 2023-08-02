import {CreateUserDto} from "../dto/create-user.dto";



// Функция для генерации "nameid" на основе данных из DTO и уникального id пользователя
export function generateNameId(username, id: number){
    const nameid = `@${username}_${id}`;
    return nameid;
}
