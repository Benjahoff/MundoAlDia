import Image from 'next/image';
import noticeImage from '../assets/notice.jpg'
import { useRouter } from 'next/navigation';
export default function NewsItem({ id,imageUrl, title, category, subtitle, dateCreated }) {

  const router = useRouter();

  const handleClick = () => {
    router.push(`/news/${id}`); // Redirigir a /news/[id] al hacer clic
  };
  const goToCategory = (cat) => {
    router.push(`/${cat}`); // Redirigir a la homepage cuando se hace clic en el título
  };

  return (
    <div className="max-w-lg mx-auto p-4 rounded-lg hover:shadow-lg z-2">
      <div className="overflow-hidden rounded-lg">
        <Image
          src={noticeImage}
          alt={title}
          width={600}
          height={400}
          className="rounded-lg object-cover hover:scale-110 transition-transform duration-300 cursor-pointer"
          onClick={handleClick}
        />
      </div>
      <div className="mt-4">
        <p className="text-blue-500 uppercase text-sm font-semibold cursor-pointer" onClick={()=>goToCategory(category)}>{category}</p>
        <h2 className="mt-2 text-xl font-bold text-gray-800 hover:text-blue-400 transition-all duration-300 relative cursor-pointer" onClick={handleClick}>
          {title}
          <span className="block h-0.5 bg-blue-400 scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left mt-1"></span>
        </h2>
        <p className="mt-2 text-gray-600 cursor-pointer"  onClick={handleClick}>{subtitle}</p>
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <p>{dateCreated}</p>
        </div>
      </div>
    </div>
  );
};