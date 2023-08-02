import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import { registrationSuccess } from '@/store/action-creators/authActions';
import { UserData } from '@/types/auth';
import { useRouter } from 'next/router';

const useCheckLoggedIn = (shouldRedirect = true) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector((state: RootState) => state.auth.user); // Получаем user из redux store

    useEffect(() => {
        const checkLoggedIn = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                try {
                    const user = jwt_decode<UserData>(storedToken);
                    dispatch(registrationSuccess({ token: storedToken, user }));
                } catch (error) {

                    localStorage.removeItem('token');
                    if (shouldRedirect) {
                        router.push('/');
                    }
                }
            } else {
                if (shouldRedirect) {
                    router.push('/');
                }
            }
        };

        checkLoggedIn();
    }, [dispatch, router, shouldRedirect]);

    useEffect(() => {
        if (shouldRedirect && user) {
            router.push(`/users/${user.id}`);
        }
    }, [shouldRedirect, user, router]);


    return { dispatch, user };
};

export default useCheckLoggedIn;
