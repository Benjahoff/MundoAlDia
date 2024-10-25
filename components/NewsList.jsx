'use client';
import NewsItem from "./NewsItem";

export default function NewsList({news}) {

  if (!news) {
    console.error("No se pudo obtener el contexto de noticias");
    return <div>Error al cargar noticias</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {news.map((newsItem,index) => (
        <div key={newsItem._id}>
          <NewsItem
            id={newsItem._id}
            urlToImage={newsItem.urlToImage}
            title={newsItem.title}
            category={newsItem.category}
            subtitle={newsItem.subtitle}
            publishedAt={newsItem.publishedAt}
          />
        </div>
      ))}
    </div>
  );
}
