import { useAuthForm } from '@/hooks/useAuthForm';
import React from 'react';
import styles from '../../style/auth-form.module.scss';


interface LoginFormProps {
    toggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ toggleForm }) => {
    const { email, password, handleSubmit } = useAuthForm(true);

    return (
        <div className={styles.authForm}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.h2}>Login</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email.value}
                    onChange={email.onChange}
                    required
                    className={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password.value}
                    onChange={password.onChange}
                    required
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>Login</button>
            </form>
            <span className={styles.secondaryBtn} onClick={toggleForm}>
        Sign Up
      </span>
        </div>
    );
};

export default LoginForm;
