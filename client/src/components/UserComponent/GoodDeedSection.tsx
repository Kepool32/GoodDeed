import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import styles from '../../style/users.module.scss';
import GoodDeedForm from '../GoodDeedComponent/GoodDeedForm';
import GoodDeedList from '../GoodDeedComponent/GoodDeedList';
import { GoodDeed } from '@/types/auth';

interface GoodDeedSectionProps {
    Data: GoodDeed[];
}

const GoodDeedSection: React.FC<GoodDeedSectionProps> = ({ Data }) => {
    const [showForm, setShowForm] = useState(false); // State to show/hide the form
    const [goodDeeds, setGoodDeeds] = useState<{ title: string; content: string }[]>([]);

    const handleSubmit = (title: string, content: string) => {
        // Add the new good deed to the list
        setGoodDeeds([...goodDeeds, { title, content }]);
    };

    const handleOpenForm = () => {
        setShowForm(true);
    };

    return (
        <div className={styles.goodDeedSection}>
            {/* Передаем список добрых дел в компонент GoodDeedList */}
            <GoodDeedList goodDeeds={Data ?? []} />

            <div className={styles.addButtonContainer}>
                {/* Кнопка для открытия формы */}
                <button onClick={handleOpenForm} className={styles.addButton}>
                    Add Good Deed
                </button>

                {/* Форма для добавления добрых дел */}
                {showForm && <GoodDeedForm onSubmit={handleSubmit} setShowForm={setShowForm} />}
            </div>
        </div>
    );
};

export default GoodDeedSection;
