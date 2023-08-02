import Header from '@/components/Header';
import React from 'react';

interface ModalProps{
    children:React.ReactNode

}


const MainLayout:React.FC< ModalProps> = ({children}) => {
    return (
        <>
            <Header/>
            {children}
        </>
    );
};

export default MainLayout;