'use client'; // Asegúrate de tener esto para usar hooks como useContext

import { useContext, useState } from 'react';
import { NewsContext } from '@/context/NewsContext';
import { useParams } from 'next/navigation'; // Para obtener los parámetros de la URL dinámica
import Image from 'next/image';
import noticeImage from '../../../assets/notice.jpg'
import { Dialog } from '@headlessui/react';
import NewsRelatedItem from '@/components/NewsRelatedItem';

export default function NewsDetail() {
    const { id } = useParams();
    const { news } = useContext(NewsContext);
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el modal está abierto


    const handleImageClick = () => {
        setIsOpen(true); // Abrir modal al hacer clic en la imagen
    };

    const closeModal = () => {
        setIsOpen(false); // Cerrar modal
    };

    // Encontrar la noticia por su ID
    const newsItem = news.find(item => item.id === parseInt(id));

    if (!newsItem) {
        return <div>Noticia no encontrada</div>;
    }

    // Filtrar noticias relacionadas por categoría
    const relatedNews = news.filter(item => (
        item.category == newsItem.category && item.id != newsItem.id
    ));
    console.log(relatedNews)
    return (
        <div className="container mx-auto flex flex-col lg:flex-row gap-8 py-8">
            {/* Contenedor principal (Cuerpo de la noticia) */}
            <div className="w-full lg:w-3/4 text-gray-800">
                <h1 className="text-4xl font-bold mb-4">{newsItem.title}</h1>
                <h2 className="text-2xl mb-4">{newsItem.subtitle}</h2>
                <hr className="border-t-2 border-gray-200 mb-4" />
                <Image
                    src={noticeImage}
                    alt={newsItem.title}
                    width={500}
                    height={450}
                    className="w-full h-[450px] object-contain mb-6 cursor-pointer"
                    onClick={handleImageClick}
                />
                {/* Modal de pantalla completa usando Dialog de Headless UI */}
                <Dialog open={isOpen} onClose={closeModal} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="relative" onClick={(e) => e.stopPropagation()}> {/* Evitar que se cierre al hacer clic en la imagen */}
                        {/* Botón para cerrar el modal */}
                        <button onClick={closeModal} className="absolute top-2 right-2 text-black text-2xl font-bold">×</button>

                        {/* Imagen en tamaño completo */}
                        <Image
                            src={noticeImage}
                            alt={newsItem.title}
                            width={800}
                            height={600}
                            className="w-auto h-auto max-w-[90%] max-h-full"
                        />
                    </div>
                </Dialog>
                <p className="text-lg">{newsItem.description}</p>
            </div>

            {/* Contenedor de noticias relacionadas */}
            <div className="w-full lg:w-1/4">
                <h3 className="text-xl font-semibold  text-gray-800">Noticias relacionadas</h3>
                <p className="text-blue-500 uppercase text-sm font-semibold mb-4">{newsItem.category}</p>
                <div className="space-y-2">
                    {relatedNews.length === 0 ? (
                        <p className='text-gray-800'>No hay noticias relacionadas</p>
                    ) : (
                        relatedNews.map(relatedItem => (
                            <div key={relatedItem.id}>
                                <NewsRelatedItem
                                    imageUrl={relatedItem.imageUrl}
                                    title={relatedItem.title}
                                    description={relatedItem.description}
                                    dateCreated={relatedItem.dateCreated}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
