"use client";

import { useContext, useState } from 'react';
import Image from 'next/image';
import logo from '../assets/logo.png';
import user from '../assets/user.png';
import { useRouter } from 'next/navigation';
import AuthModal from './AuthModal';
import { toast } from 'react-toastify';
import { AuthContext } from '@/context/AutContext';
import axios from "axios";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const { isAuthenticated, logout } = useContext(AuthContext);

  const goToHome = () => {
    router.push('/');
  };

  const goToCategory = (cat) => {
    router.push(`/${cat}`);
  };

  const openModal = (isLoginForm) => {
    setIsLogin(isLoginForm);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };


  const logoutFn = async () => {
    const toastId = toast.loading("Cerrando sesión...");
  
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/logout`);
      // Verificamos si la respuesta tiene un código de estado exitoso
      if (response.status == 200) {
        logout(); // Aquí llamas a la función `logout` que debe manejar el cierre de sesión
        toast.update(toastId, {
          render: "Sesión cerrada con éxito",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      } else {
        toast.update(toastId, {
          render: "Error al cerrar sesión",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error(error); // Esto es útil para depuración
      toast.update(toastId, {
        render: "Error en el servidor",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };
  
  const menuItems = [
    'Politica',
    'Deportes',
    'Economia',
    'Tecnologia',
    'Internacionales'
  ];

  return (
    <header className="bg-white shadow-md shadow-cream-200 p-4 fixed w-full z-20 top-0">
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
          {!isAuthenticated ? <>
            <button
              onClick={() => openModal(true)}
              name='loginBtn'
              className="bg-white border border-gray-300 text-gray-800 rounded-full px-4 py-2 hover:bg-gray-100"
            >
              Login
            </button>
            <button
              onClick={() => openModal(false)}
              className="bg-white border border-gray-300 text-gray-800 rounded-full px-4 py-2 hover:bg-gray-100"
            >
              Signin
            </button>
            <AuthModal isLogin={isLogin} modalOpen={modalOpen} closeModal={closeModal} />
          </>
            :
            <button
              onClick={() => logoutFn()}
              className="bg-white border border-gray-300 text-gray-800 rounded-full px-4 py-2 hover:bg-gray-100"
            >
              LogOut
            </button>
          }
        </div>
      </div>

    </header>
  );
}
