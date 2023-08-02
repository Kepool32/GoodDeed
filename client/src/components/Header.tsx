import React from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/store/action-creators/authActions';
import { deleteUser } from '@/store/action-creators/userActions';
import { useRouter } from 'next/router';
import styles from '../style/header.module.scss';

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logoutUser());
        router.push('/');
    };

    const handleDeleteAccount = () => {
        dispatch(deleteUser());
        handleLogout();
    };

    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <div className={styles.navItems}>
                    <div className={styles.navLinkWrapper}>
                        <Link href="/">Главная</Link>
                    </div>
                    <div className={styles.navLinkWrapper}>
                        <Link href="/allusers/allusers">Пользователи</Link>
                    </div>
                </div>
                <div className={styles.logoutContainer}>
                    <button onClick={handleLogout} className={styles.logoutButton}>
                        Выход
                    </button>
                    <button onClick={handleDeleteAccount} className={styles.logoutButton}>
                        Удалить аккаунт
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
