import { useAuthForm } from '@/hooks/useAuthForm';
import React from 'react';
import styles from '../../style/auth-form.module.scss';


interface RegistrationFormProps {
    toggleForm: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ toggleForm }) => {
    const { email, password, username, handleSubmit } = useAuthForm(false);

    return (
        <div className={styles.authForm}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.h2}>Registration</h2>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username.value}
                    onChange={username.onChange}
                    required
                    className={styles.input}
                />
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
                <button type="submit" className={styles.button}>Sign Up</button>
            </form>
            <span className={styles.secondaryBtn} onClick={toggleForm}>
            Login
      </span>
        </div>
    );
};

export default RegistrationForm;
