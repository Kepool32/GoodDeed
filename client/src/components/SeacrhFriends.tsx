import React from 'react';
import styles from '../style/userpage.module.scss';

interface UserSearchProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const SearchFriends: React.FC<UserSearchProps> = ({ searchQuery, setSearchQuery }) => {
    return (
        <div className={styles.searchContainer}>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
                placeholder="Search"
            />
        </div>
    );
};

export default SearchFriends;
