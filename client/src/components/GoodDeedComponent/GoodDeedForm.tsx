import { addGoodDeed } from '@/store/action-creators/goodDeedsActions';
import { RootState } from '@/store/index';
import React, { useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import styles from '../../style/gooddeed.module.scss';

interface GoodDeedFormProps {
    onSubmit: (title: string, content: string) => void;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const GoodDeedForm: React.FC<GoodDeedFormProps> = ({ onSubmit, setShowForm }) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const dispatch = useDispatch();


        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            dispatch(addGoodDeed({title, content }));
            setTitle('');
            setContent('');
            setShowForm(false);

        };


    const handleCloseForm = () => {
        setShowForm(false);
    };

    return (
        <div className={styles.formContainer}>


            <div className={styles.goodDeedForm}>
                <div className={styles.closeButton} onClick={handleCloseForm}>
                    X
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={styles.input}
                    />
                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className={styles.textarea}
                    />
                    <button type="submit" className={styles.button}>
                        Add Good Deed
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GoodDeedForm;


