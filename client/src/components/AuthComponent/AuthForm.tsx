import useCheckLoggedIn from '@/hooks/useCheckLoggedIn';
import React, { useState } from 'react';
import styles from '../../style/auth-form.module.scss';
import { useAuthForm } from '@/hooks/useAuthForm';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

const AuthForm: React.FC = () => {
    const [showLogin, setShowLogin] = useState(true);
    const { handleSubmit } = useAuthForm(showLogin);

    const toggleForm = () => {
        setShowLogin((prev) => !prev);
    };


    useCheckLoggedIn(true);

    return (
        <>
            {showLogin ? (
                <>
                    <LoginForm toggleForm={toggleForm} />

                </>
            ) : (
                <>
                    <RegistrationForm toggleForm={toggleForm} />

                </>
            )}
        </>
    );
};

export default AuthForm;

