import Image from 'next/image';
import noticeImage from '../assets/notice.jpg'
export default function NewsItem({ imageUrl, title, category, description, dateCreated }) {
  return (
    <div className="max-w-lg mx-auto p-4 rounded-lg hover:shadow-lg hover:transform hover:scale-105 transition-all duration-300">
      <div className="overflow-hidden rounded-lg">
        <Image
          src={noticeImage}
          alt={title}
          width={600}
          height={400}
          className="rounded-lg object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="mt-4">
        <p className="text-blue-500 uppercase text-sm font-semibold">{category}</p>
        <h2 className="mt-2 text-xl font-bold text-gray-800 hover:text-gray-900 transition-all duration-300 relative">
          {title}
          <span className="block h-0.5 bg-blue-400 scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left mt-1"></span>
        </h2>
        <p className="mt-2 text-gray-600">{description}</p>
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <p>{dateCreated}</p>
        </div>
      </div>
    </div>
  );
};