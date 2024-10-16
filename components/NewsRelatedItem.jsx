import Image from 'next/image';
import { useRouter } from 'next/navigation';
import noticeImage from '../assets/notice.jpg'; // Puedes cambiar esta imagen según tus datos

export default function NewsRelatedItem({ id, imageUrl, title, dateCreated }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/news/${id}`); // Redirigir a /news/[id] al hacer clic
  };

  return (
    <div 
      className="max-w-sm mx-auto p-2 rounded-lg cursor-pointer transition-all duration-300"
      onClick={handleClick} // Redirigir al hacer clic
    >
      <div className="overflow-hidden rounded-lg">
        <Image
          src={noticeImage}
          alt={title}
          width={300} // Imagen más pequeña
          height={50}
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
