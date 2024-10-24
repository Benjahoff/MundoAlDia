'use client';

import { useContext, useState } from 'react';
import { NewsContext } from '@/context/NewsContext';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import noticeImage from '../../../assets/notice.jpg'
import { Dialog } from '@headlessui/react';
import NewsRelatedItem from '@/components/NewsRelatedItem';
import arrowImage from '../../../assets/arrow.png'
export default function NewsDetail() {
    const { id } = useParams();
    const { news } = useContext(NewsContext);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();


    const handleImageClick = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };


    const handleBack = () => {
        router.back();
    };

    const newsItem = news.find(item => item._id === id);

    if (!newsItem) {
        return <div>Noticia no encontrada</div>;
    }

    const relatedNews = news.filter(item => (
        item.category == newsItem.category && item._id != newsItem._id
    ));

    return (
        <div className="container mx-auto flex flex-col lg:flex-row gap-8 py-8">
            <div className="w-full lg:w-3/4 text-gray-800">
                <div className="w-full h-[20px] mb-3 cursor-pointer flex items-center" onClick={() => handleBack()}>
                    <Image src={arrowImage} alt="left-arrow" width={20} height={16} />
                    <span className="ml-2">Volver</span>
                </div>

                <h1 className="text-4xl font-bold mb-4">{newsItem.title}</h1>
                <h2 className="text-2xl mb-4">{newsItem.subtitle}</h2>
                <hr className="border-t-2 border-gray-200 mb-4" />
                <img
                    src={newsItem.urlToImage}
                    alt={newsItem.urlToImage}
                    className="w-full h-[450px] object-contain mb-6 cursor-pointer"
                    onClick={handleImageClick}
                />
                <Dialog open={isOpen} onClose={closeModal} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                        <button onClick={closeModal} className="absolute top-2 right-5 text-black text-2xl font-bold">×</button>
                        <img
                            src={newsItem.urlToImage}
                            alt={newsItem.urlToImage}
                            className="max-w-[80%] mx-auto"
                        />

                    </div>
                </Dialog>
                <p className="text-lg">{newsItem.content}</p>
            </div>

            <div className="w-full lg:w-1/4">
                <h3 className="text-xl font-semibold  text-gray-800">Noticias relacionadas</h3>
                <p className="text-blue-500 uppercase text-sm font-semibold mb-4">{newsItem.category}</p>
                <div className="space-y-2">
                    {relatedNews.length === 0 ? (
                        <p className='text-gray-800'>No hay noticias relacionadas</p>
                    ) : (
                        relatedNews.map(relatedItem => (
                            <div key={relatedItem._id}>
                                <NewsRelatedItem
                                    id={relatedItem._id}
                                    urlToImage={relatedItem.urlToImage}
                                    title={relatedItem.title}
                                    publishedAt={relatedItem.publishedAt}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
