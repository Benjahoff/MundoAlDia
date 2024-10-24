import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function NewsRelatedItem({ id, urlToImage, title, publishedAt }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/news/${id}`);
  };

  return (
    <div
      className="max-w-sm mx-auto p-2 rounded-lg cursor-pointer transition-all duration-300"
      onClick={handleClick}
    >
      <div className="overflow-hidden rounded-lg">
        <img
          src={urlToImage}
          alt={title}
          className="rounded-lg max-h-[200px] object-contain"
        />

      </div>
      <div className="mt-2">
        <h2 className="mt-1 text-lg font-bold text-gray-800 relative">
          {title}
        </h2>
      </div>
    </div>
  );
}
