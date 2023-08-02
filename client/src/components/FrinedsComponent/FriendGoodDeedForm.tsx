import { fetchFriendGoodDeeds } from '@/store/action-creators/userActions';
import { RootState } from '@/store/index';
import { GoodDeed } from '@/types/auth';
import React, {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../style/users.module.scss';



interface FriendGoodDeedFormProps {
    friendId: number;
    friendName: string;
}

const FriendGoodDeedForm: React.FC<FriendGoodDeedFormProps> = ({ friendId,friendName }) => {
    const gooddeedfriends = useSelector((state: RootState) => state.user.friendGoodDeeds);
    const dispatch = useDispatch();


    useEffect(() => {

        dispatch(fetchFriendGoodDeeds(friendId));

    }, [dispatch, friendId]);

    return (
        <div className={styles.friendGoodDeedForm}>
            <h4>Good Deeds for Friend : {friendName}</h4>
            <ul>
                {gooddeedfriends.map((goodDeed:GoodDeed) => (
                    <li key={goodDeed.id}>
                        <h3> {goodDeed.title}</h3>
                        <p> {goodDeed.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FriendGoodDeedForm;
