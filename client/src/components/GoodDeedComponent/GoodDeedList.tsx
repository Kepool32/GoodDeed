import { deleteGoodDeed, updateGoodDeed } from '@/store/action-creators/goodDeedsActions';
import { GoodDeed } from '@/types/auth';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../../style/users.module.scss';
import GoodDeedUpdate from './GoodDeedUpdate';



interface GoodDeedListProps {
    goodDeeds: GoodDeed[];
}

const GoodDeedList: React.FC<GoodDeedListProps> = ({ goodDeeds }) => {
    const dispatch = useDispatch();
    const [selectedGoodDeed, setSelectedGoodDeed] = useState<GoodDeed | null>(null);

    if (!goodDeeds || !Array.isArray(goodDeeds)) {
        return (
            <div className={styles.goodDeedList}>
                <h2 className={styles.deedsTitle}>Good Deeds</h2>
                <p>No good deeds yet.</p>
            </div>
        );
    }

    const handleDeleteClick = (id: number) => {
        dispatch(deleteGoodDeed(id));
    };

    const handleUpdateClick = (goodDeed: GoodDeed) => {
        setSelectedGoodDeed(goodDeed);
    };

    const handleUpdateClose = () => {
        setSelectedGoodDeed(null);
    };

    return (
        <section className={styles.goodDeedList}>
            <h2 className={styles.deedsTitle}>Good Deeds</h2>
            <div className={styles.scrollContainer}>
                {goodDeeds.length > 0 ? (
                    goodDeeds.map((deed, index) => (
                        <div key={index} className={styles.goodDeedItem}>
                            <h3>{deed.title}</h3>
                            <p>{deed.content}</p>
                            <div className={styles.buttonContainer}>
                                <button className={styles.updateButton} onClick={() => handleUpdateClick(deed)}>
                                    Update
                                </button>
                                <button className={styles.deleteButton} onClick={() => handleDeleteClick(deed.id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No good deeds yet.</p>
                )}
            </div>
            {selectedGoodDeed && (
                <GoodDeedUpdate
                    goodDeed={selectedGoodDeed}
                    onClose={handleUpdateClose}
                    onUpdate={(updatedGoodDeed) => {
                        dispatch(updateGoodDeed(updatedGoodDeed));
                        handleUpdateClose();
                    }}
                />
            )}
        </section>
    );
};

export default GoodDeedList;
