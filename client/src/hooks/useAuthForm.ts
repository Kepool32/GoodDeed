import { useDispatch } from 'react-redux';
import { registerUser } from '@/store/action-creators/authActions';
import { AuthUserDto, CreateUserDto } from '@/types/auth';
import { useFormInput } from './useFormInput';
import { loginRequest } from '@/store/action-creators/loginActions';

// Пользовательский хук для обработки логики формы регистрации и логина
export const useAuthForm = (showLogin: boolean) => {
    const dispatch = useDispatch();
    const email = useFormInput('');
    const password = useFormInput('');
    const username = useFormInput('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (showLogin) {
            const userData: AuthUserDto = {
                email: email.value,
                password: password.value,
            };
            dispatch(loginRequest(userData));
        } else {
            const userData: CreateUserDto = {
                email: email.value,
                password: password.value,
                username: username.value,
            };
            dispatch(registerUser(userData));
        }
    };

    return {
        email,
        password,
        username,
        handleSubmit,
    };
};
