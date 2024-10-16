"use client";

import { useState, useRef } from 'react';
import { Dialog } from '@headlessui/react';
import Image from 'next/image';
import logo from '../assets/logo.png';
import user from '../assets/user.png';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // Controlar si es login o registro
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const loginButtonRef = useRef(null); // Referencia al botón de login
  const signinButtonRef = useRef(null); // Referencia al botón de signin
  const router = useRouter();

  const goToHome = () => {
    router.push('/');
  };

  const goToCategory = (cat) => {
    router.push(`/${cat}`);
  };

  const openModal = (isLoginForm, ref) => {
    if (isLoginForm) {
      const rect = ref.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      let adjustedLeft = rect.left + window.scrollX;

      if (rect.left + 300 > screenWidth) {  
        adjustedLeft = screenWidth - 320;
      }

      setModalPosition({ top: rect.bottom + window.scrollY, left: adjustedLeft });
    }

    setIsLogin(isLoginForm);
    setModalOpen(true);
  };
  const menuItems = [
    'Últimas Noticias',
    'Política',
    'Economía',
    'Deportes',
    'Sociedad',
    'Policiales',
    'science'
  ];

  return (
    <header className="bg-white shadow-md shadow-cream-200 p-4 fixed w-full z-10">
      <div className="text-center my-2 h-16 flex items-center justify-center">
        <button
          className="text-gray-800 focus:outline-none md:hidden mt-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
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
        <Image src={logo} alt="logo" width={160} height={110} className="mx-auto cursor-pointer" onClick={goToHome} />

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

      {menuOpen && (
        <nav className="md:hidden bg-white">
          <ul className="flex flex-col space-y-2 items-center">
            {menuItems.map((item, index) => (
              <li key={index} className="text-gray-800 hover:text-gray-600" onClick={() => goToCategory(item)}>
                {item}
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="hidden md:flex items-center w-full border-t border-b border-gray-400 py-3 justify-center">
        <nav className="flex">
          <ul className="flex space-x-6">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="text-gray-800 hover:text-gray-600 cursor-pointer"
                onClick={() => goToCategory(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute right-4 flex space-x-4">
          <button
            ref={loginButtonRef}
            onClick={() => openModal(true, loginButtonRef)}
            className="bg-white border border-gray-300 text-gray-800 rounded-full px-4 py-2 hover:bg-gray-100"
          >
            Login
          </button>
          <button
            ref={signinButtonRef}
            onClick={() => openModal(false, signinButtonRef)}
            className="bg-white border border-gray-300 text-gray-800 rounded-full px-4 py-2 hover:bg-gray-100"
          >
            Signin
          </button>
        </div>
      </div>

      {modalOpen &&
        (isLogin ? (
          <>
            <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
              <div
                className="fixed"
                style={{ top: modalPosition.top, left: modalPosition.left }}
              >
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>
                  <form className="space-y-4">
                    <input
                      type="email"
                      placeholder="Email"
                      className="border p-2 w-full"
                    />
                    <input
                      type="password"
                      placeholder="Contraseña"
                      className="border p-2 w-full"
                    />
                    <button
                      type="submit"
                      className="w-full bg-blue-400 text-white p-2 rounded hover:bg-blue-500"
                    >
                      Iniciar Sesión
                    </button>
                  </form>

                  <button
                    className="mt-4 text-gray-500 underline"
                    onClick={() => setModalOpen(false)}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </Dialog>
          </>
        ) : (
          <>
            <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
              <div
                className="fixed"
                style={{ top: modalPosition.top, left: modalPosition.left }}
              >
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-bold mb-4">Registro</h2>
                  <form className="space-y-4">
                    <input
                      type="text"
                      placeholder="Nombre"
                      className="border p-2 w-full"
                    />
                    <input
                      type="text"
                      placeholder="Apellido"
                      className="border p-2 w-full"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="border p-2 w-full"
                    />
                    <input
                      type="password"
                      placeholder="Contraseña"
                      className="border p-2 w-full"
                    />
                    <button
                      type="submit"
                      className="w-full bg-blue-400 text-white p-2 rounded hover:bg-blue-500"
                    >
                      Registrarse
                    </button>
                  </form>

                  <button
                    className="mt-4 text-gray-500 underline"
                    onClick={() => setModalOpen(false)}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </Dialog>
          </>
        ))
      }
    </header >
  );
}
