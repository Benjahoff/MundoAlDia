'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import addIcon from '../assets/plus.png';
import ModalNews from './ModalNews';

export default function BubbleAddNews()  {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="fixed bottom-6 right-6">
                <button
                    className="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300"
                    onClick={openModal}
                    id='createBtn'
                >
                    <Image src={addIcon} alt="add news" width={24} height={24} />
                </button>
            </div>
            <ModalNews onClose={closeModal} isOpen={isModalOpen} />
        </>
    );
};

