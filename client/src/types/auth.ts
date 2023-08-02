
export interface UserData {
    id: number;
    email: string;
    nameid: string;
    username: string;
    roles: Role[];
    friends: Friend[];
    goodDeeds: GoodDeed[];
    iat: number;
    exp: number;
}

export interface Role {
    id: number;
    value: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export interface Friend {
    id: number;
    userId: number;
    friendId: number;
    friendNameid:string;
    createdAt: string;
    updatedAt: string;
}

export interface GoodDeed {
    id: number;
    title: string;
    content: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
}


export interface AuthUserDto {
    email: string;
    password: string;
}


export interface CreateUserDto {
    username?: string;
    email: string;
    password: string;
}


export interface TokenData {
    token: string;
    user: UserData | null;
}

// Тип для экшенов авторизации и регистрации
export type AuthAction =
    | {
    type: 'REGISTRATION_REQUEST' | 'LOGIN_REQUEST';
    payload: AuthUserDto | CreateUserDto;
}
    | {
    type: 'REGISTRATION_SUCCESS' | 'LOGIN_SUCCESS';
    payload: TokenData | null;
}
    | {
    type: 'REGISTRATION_FAILURE' | 'LOGIN_FAILURE';
    payload: string;
}
    | {
    type: 'LOGOUT';
};
export interface AuthState {
    loading: boolean;
    token: string;
    user: UserData | null;
    error: string;
}