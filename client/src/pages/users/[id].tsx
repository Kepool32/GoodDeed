import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import { UserData } from '@/types/auth';
import { useRouter } from 'next/router';
import useCheckLoggedIn from '@/hooks/useCheckLoggedIn';
import styles from '../../style/users.module.scss';
import { getGoodDeeds } from '@/store/action-creators/goodDeedsActions';
import {fetchUserData} from '@/store/action-creators/userActions';
import MainLayout from '@/layouts/MainLayout';
import GoodDeedList from '@/components/GoodDeedComponent/GoodDeedList';
import GoodDeedForm from '@/components/GoodDeedComponent/GoodDeedForm';
import FriendsList from '@/components/FrinedsComponent/FriendsList';
import UserInfo from '@/components/UserComponent/userInfo';
import GoodDeedSection from '@/components/UserComponent/GoodDeedSection';



const UserPage: React.FC = () => {
    const userData = useSelector((state: RootState) => state.user.user);
    const Data = useSelector((state: RootState) => state.goodDeed.goodDeeds);
    const dispatch = useDispatch();
    const friends = useSelector((state: RootState) => state.user.user?.friends);

    useCheckLoggedIn(true);

    useEffect(() => {
        dispatch(fetchUserData());
        dispatch(getGoodDeeds());
    }, []);

    return (
        <MainLayout>
            <div className={styles.container}>
                <div className={styles.formContainer}>

                    <FriendsList friends={friends} />
                    <div>
                        <UserInfo
                            userData={userData} />
                        <GoodDeedSection
                            Data={Data}/>
                    </div>

                </div>
            </div>
        </MainLayout>
    );
};

export default UserPage;
