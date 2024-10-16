'use client';

import { useContext } from 'react';
import { NewsContext } from '@/context/NewsContext';
import NewsList from '@/components/NewsList';
import { useParams, useRouter } from 'next/navigation';

export default function NewsByCategory() {
    const { category } = useParams();
    const { news } = useContext(NewsContext);
    const router = useRouter();

    // Filtrar las noticias por categoría
    const filteredNews = news.filter(item => item.category.toLowerCase() === category.toLowerCase());

    if (filteredNews.length === 0) {
        return <div>No se encontraron noticias en esta categoría</div>;
    }

    const handleBack = () => {
        router.back(); // Esto hace que el navegador vuelva a la página anterior
      };

    return (
        <div>
            {/* Título con tamaño grande, margen y funcionalidad de clic para redirigir a la homepage */}
            <h1
                className='text-2xl font-bold text-gray-800 my-8 cursor-pointer hover:text-blue-500 transition-colors duration-300 ml-6 pl-2'
                onClick={handleBack}
            >
                &larr; {category}
            </h1>

            {/* Lista de noticias filtradas */}
            <NewsList news={filteredNews} />
        </div>
    );
}
