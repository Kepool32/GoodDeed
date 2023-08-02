import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import { UserData } from '@/types/auth';
import { fetchAllUsers, addUserToFriends } from '@/store/action-creators/userActions';
import styles from '../../style/userpage.module.scss'
import MainLayout from '@/layouts/MainLayout';
import SearchFriends from '@/components/SeacrhFriends';


const UsersPage: React.FC = () => {
    const usersData: UserData[] = useSelector((state: RootState) => state.user?.allUsers);
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, []);

    const handleAddToFriends = (userId: string) => {
        dispatch(addUserToFriends(userId));
    };

    const filteredUsers = usersData.filter((user: UserData) =>
        user.nameid.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <MainLayout>
            <div className={styles.usersContainer}>

                <SearchFriends searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                {filteredUsers.length > 0 ? (
                    <ul className={styles.usersList}>
                        {filteredUsers.map((user: UserData) => (
                            <li key={user.id} className={styles.userItem}>
                                <span>{user.nameid}</span>
                                <button className={styles.addButton} onClick={() => handleAddToFriends(user.nameid)}>
                                    Добавить в друзья
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Нет пользователей.</p>
                )}
            </div>
        </MainLayout>
    );
};

export default UsersPage;
