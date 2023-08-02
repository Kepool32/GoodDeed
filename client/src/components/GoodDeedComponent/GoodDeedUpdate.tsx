import { updateGoodDeed } from '@/store/action-creators/goodDeedsActions';
import { GoodDeed } from '@/types/gooddeed';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../../style/gooddeed.module.scss';

interface GoodDeedFormProps {
    goodDeed: GoodDeed;
    onClose: () => void;
    onUpdate: (updatedGoodDeed: GoodDeed) => void;
}

const GoodDeedUpdate: React.FC<GoodDeedFormProps> = ({ goodDeed, onClose, onUpdate }) => {
    const [title, setTitle] = useState(goodDeed.title);
    const [content, setContent] = useState(goodDeed.content);
    const dispatch = useDispatch();
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    const handleUpdateClick = () => {
        const updatedGoodDeed: GoodDeed = { ...goodDeed, title, content };
        dispatch(updateGoodDeed(updatedGoodDeed));
        onClose();
    };

    return (
        <div className={styles.editFormOverlay}>
            <div className={styles.editForm}>
                <h2>Edit Good Deed</h2>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" value={title} onChange={handleTitleChange} />
                <label htmlFor="content">Content:</label>
                <textarea id="content" value={content} onChange={handleContentChange} />
                <div className={styles.editFormButtons}>
                    <button onClick={handleUpdateClick}>Update</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default GoodDeedUpdate;
