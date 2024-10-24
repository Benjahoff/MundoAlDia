'use client';

import { useContext } from 'react';
import { NewsContext } from '@/context/NewsContext';
import NewsList from '@/components/NewsList';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import arrowImage from '../../assets/arrow.png'

export default function NewsByCategory() {
    const { category } = useParams();
    const { news } = useContext(NewsContext);
    const router = useRouter();

    const filteredNews = news.filter(item => item.category.toLowerCase() === category.toLowerCase());

    if (filteredNews.length === 0) {
        return <div>No se encontraron noticias en esta categoría</div>;
    }

    const handleBack = () => {
        router.back(); 
    };

    return (
        <div>

            <div className="w-full h-[20px] mb-3 text-2xl font-bold text-gray-800 my-8 cursor-pointer flex items-center ml-6" onClick={() => handleBack()}>
                <Image src={arrowImage} alt="left-arrow" width={20} height={16} />
                <span className="ml-2">{category}</span>
            </div>

            <NewsList news={filteredNews} />
        </div>
    );
}
