// NewsList.js
'use client';
import NewsItem from "./NewsItem";

export default function NewsList({news}) {
  // Si no hay valor en `news`, lanza un mensaje de error para depurar
  if (!news) {
    console.error("No se pudo obtener el contexto de noticias");
    return <div>Error al cargar noticias</div>;
  }


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {news.map((newsItem) => (
        <div key={newsItem.id}>
          <NewsItem
            imageUrl={newsItem.imageUrl}
            title={newsItem.title}
            category={newsItem.category}
            description={newsItem.description}
            dateCreated={newsItem.dateCreated}
          />
        </div>
      ))}
    </div>
  );
}
