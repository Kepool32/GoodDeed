import React, { useState } from 'react';
import styles from '../../style/users.module.scss';
import FriendGoodDeedForm from './FriendGoodDeedForm';

interface Friend {
    id: number;
    friendNameid: string;
    friendId: number;
}

interface FriendsListProps {
    friends: Friend[];
}

const FriendsList: React.FC<FriendsListProps> = ({ friends = [] }) => {
    const [selectedFriendId, setSelectedFriendId] = useState<number | null>(null);
    const [selectedFriendName, setSelectedFriendName] = useState<string | null>(null);

    const handleShowGoodDeedForm = (friendId: number, friendName: string) => {
        setSelectedFriendId(friendId);
        setSelectedFriendName(friendName);
    };

    return (
        <div className={styles.friendsList}>
            <h2>Friends list</h2>
            <div className={styles.friendsListContanir}>

                {friends.length > 0 ? (
                    <ul className={styles.friendList}>
                        {friends.map((friend) => (
                            <li key={friend.id}>
                                {friend.friendNameid}{' '}
                                <button onClick={() => handleShowGoodDeedForm(friend.friendId, friend.friendNameid)}>Good deed</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No friends yet.</p>

                )}
            </div>
            {selectedFriendId !== null && selectedFriendName !== null && (
                <FriendGoodDeedForm friendId={selectedFriendId} friendName={selectedFriendName} />
            )}
        </div>
    );
};

export default FriendsList;
