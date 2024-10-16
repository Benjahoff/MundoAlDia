"use client";

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import Image from 'next/image';
import logo from '../assets/logo.png';
import user from '../assets/user.png';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);


  const menuItems = [
    'Últimas Noticias',
    'Política',
    'Economía',
    'Dólar hoy',
    'Deportes',
    'Sociedad',
    'Policiales',
    'Newsletters',
  ];

  return (
    <header className="bg-white shadow-md shadow-cream-200 p-4 mt-4 relative">

      {/* Nombre del diario */}
      <div className="text-center my-2 h-16 flex items-center justify-center">
      <button
          className="text-gray-800 focus:outline-none md:hidden mt-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {/* Icono de menú hamburguesa */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        <Image src={logo} alt="logo" width={110} height={60} className="mx-auto" />

        {/* Imagen de usuario */}
        <div className="rounded-full overflow-hidden w-8 h-8 md:hidden mt-2">
          <Image
            src={user}
            alt="User"
            width={22}
            height={22}
            className="cursor-pointer"
            onClick={() => setModalOpen(true)}
          />
        </div>
      </div>

      {/* Menú en mobile */}
      {menuOpen && (
        <nav className="md:hidden bg-white">
          <ul className="flex flex-col space-y-2 items-center">
            {menuItems.map((item, index) => (
              <li key={index} className="text-gray-800 hover:text-gray-600">
                {item}
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Menú y botones en pantallas grandes */}
      <div className="hidden md:flex items-center w-full border-t border-b border-gray-400 py-3 justify-center">
        {/* Menú */}
        <nav className="flex">
          <ul className="flex space-x-6">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="text-gray-800 hover:text-gray-600 cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>

        {/* Botones de login/signin fuera del flujo */}
        <div className="absolute right-4 flex space-x-4">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-white border border-gray-300 text-gray-800 rounded-full px-4 py-2 hover:bg-gray-100"
          >
            Login
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-white border border-gray-300 text-gray-800 rounded-full px-4 py-2 hover:bg-gray-100"
          >
            Signin
          </button>
        </div>
      </div>

      {/* Modal de login/signin */}
      {modalOpen && (
        <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
          <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Login / Signin</h2>
              {/* Aquí agregarías el formulario de autenticación */}
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setModalOpen(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </header>
  );
}
