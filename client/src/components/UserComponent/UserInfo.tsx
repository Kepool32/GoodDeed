import React from 'react';
import { UserData } from '@/types/auth';
import styles from '../../style/users.module.scss';

interface UserInfoProps {
    userData: UserData | null;
}

const UserInfo: React.FC<UserInfoProps> = ({ userData }) => {
    const { username, nameid } = userData ?? { username: 'Пользователь', nameid: 'Нет данных' };
    return (
        <div className={styles.userInfo}>
            <div className={styles.userInfoContent}>
                <h2 className={styles.userName}>{username}</h2>
                <p className={styles.userId}>{nameid}</p>
            </div>
        </div>
    );
};

export default UserInfo;
