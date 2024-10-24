import React from 'react';
import Image from 'next/image';
import trashIco from '../assets/trash.png'; 

export default function ModalDelete({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex items-center justify-center">
          <Image src={trashIco} alt="delete" width={32} height={32} />
          <h2 className="text-xl font-semibold text-gray-800 ml-2">Confirmar Eliminación</h2>
        </div>
        <p className="mt-4 text-gray-600">¿Estás seguro que deseas eliminar esta noticia?</p>
        
        <div className="mt-6 flex justify-end space-x-2">
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
            onClick={onConfirm}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

