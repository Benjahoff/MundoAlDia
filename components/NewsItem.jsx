import Image from 'next/image';
import noticeImage from '../assets/notice.jpg';
import { useRouter } from 'next/navigation';
import trashIco from '../assets/trash.png';
import editIco from '../assets/pencil.png';
import { useContext, useState } from 'react';
import ModalDelete from './ModalDelete';
import { NewsContext } from '@/context/NewsContext';
import ModalNews from './ModalNews';
import { parseDate } from '@/functions';
import { AuthContext } from '@/context/AutContext';

export default function NewsItem({ id, urlToImage, title, category, subtitle, publishedAt, key}) {
  const router = useRouter();
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteNews } = useContext(NewsContext);
  const { isAuthenticated } = useContext(AuthContext);

  const handleClick = () => {
    router.push(`/news/${id}`);
  };

  const goToCategory = (cat) => {
    router.push(`/${cat}`);
  };

  const handleDelete = () => {
    setIsModalDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      deleteNews(id)
      setIsModalDeleteOpen(false);
    }, 300);
  };

  const handleCancelDelete = () => {
    setIsModalDeleteOpen(false);
  };

  const handleEdit = () => {
    setIsModalEditOpen(true);
  };
  const handleCancelEdit = () => {
    setIsModalEditOpen(false);
  };

  return (
    <div className={`max-w-lg mx-auto p-4 rounded-lg hover:shadow-lg z-2 relative transition-opacity duration-300 ${isDeleting ? 'opacity-0' : 'opacity-100'}`}>
      {isAuthenticated && (
        <div className="absolute top-2 right-2 flex space-x-2 z-10">
          <button
            className="flex items-center justify-center bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-300"
            onClick={handleDelete}
          >
            <Image src={trashIco} alt="delete" width={16} height={16} />
          </button>
          <button
            className="flex items-center justify-center bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition-all duration-300"
            onClick={handleEdit}
          >
            <Image src={editIco} alt="edit" width={16} height={16} />
          </button>
        </div>
      )}

      <div className="overflow-hidden rounded-lg">
        <img
          src={urlToImage}
          alt={title}
          className="w-full h-auto aspect-[16/9] rounded-lg object-cover hover:scale-110 transition-transform duration-300 cursor-pointer"
          onClick={handleClick}
        />
      </div>

      <div className="mt-4">
        <p className="text-blue-500 uppercase text-sm font-semibold cursor-pointer" onClick={() => goToCategory(category)}>
          {category}
        </p>
        <h2 className="mt-2 text-xl font-bold text-gray-800 hover:text-blue-400 transition-all duration-300 relative cursor-pointer" onClick={handleClick}>
          {title}
          <span className="block h-0.5 bg-blue-400 scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left mt-1"></span>
        </h2>
        <p className="mt-2 text-gray-600 cursor-pointer truncate" onClick={handleClick}>{subtitle}</p>
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <p>{parseDate(publishedAt)}</p>
        </div>
      </div>

      <ModalDelete
        isOpen={isModalDeleteOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      <ModalNews
        onClose={handleCancelEdit}
        isOpen={isModalEditOpen}
        newsId={id}
      />
    </div>
  );
}
