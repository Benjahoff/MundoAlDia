"use client";
import { Dialog } from '@headlessui/react';
import { useContext, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Input, Button } from '@nextui-org/react'; 
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; 
import Cookies from 'js-cookie'; 
import { AuthContext } from '@/context/AutContext';

export default function AuthModal({ isLogin, modalOpen, closeModal }) {
    const [username, setUsername] = useState('');  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({}); 
    const [isVisible, setIsVisible] = useState(false); 
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const endpoint = isLogin ? '/user/login' : '/user/register';
        const payload = isLogin
            ? { email, password }
            : { username, email, password };

        try {
            const response = await fetch(`http://localhost:4000${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                if (isLogin) {
                    Cookies.set('token', data.token, { expires: 1 / 24 });
                    Cookies.set('username', data.user.username, { expires: 1 / 24 });
                    Cookies.set('email', data.user.email, { expires: 1 / 24 });
                    login()
                    toast.success('Inicio de sesión exitoso');
                } else {
                    toast.success('Registro exitoso');
                }
                closeModal(); 
            } else {
                setErrors(data.errors || {});
                toast.error(data.message || 'Algo salió mal');
            }
        } catch (error) {
            toast.error('Error en el servidor');
        }
    };

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <>
            <Dialog open={modalOpen} onClose={closeModal} className="fixed inset-0 flex items-center justify-center z-50">
                <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true"></div>
                <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-sm w-full z-50">
                    <button
                        onClick={closeModal}
                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                        &#10005; {/* X para cerrar */}
                    </button>
                    <h2 className="text-2xl font-bold mb-6">{isLogin ? 'Iniciar Sesión' : 'Registro'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <Input
                                label="Nombre de usuario"
                                variant="bordered"
                                fullWidth
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                helperText={errors.username}
                                status={errors.username ? 'error' : 'default'}
                            />
                        )}
                        <Input
                            label="Email"
                            type="email"
                            variant="bordered"
                            name='loginMail'
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            helperText={errors.email}
                            status={errors.email ? 'error' : 'default'}
                        />
                        <Input
                            label="Contraseña"
                            type={isVisible ? "text" : "password"}
                            variant="bordered"
                            name='loginPass'
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            helperText={errors.password}
                            /* endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                  {isVisible ? (
                                    <AiFillEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                                  ) : (
                                    <AiFillEye  className="text-2xl text-default-400 pointer-events-none" />
                                  )}
                                </button>
                              } */
                            status={errors.password ? 'error' : 'default'}
                        />
                        <Button type="submit" color="primary" className="w-full" id='loginBtn'>
                            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                        </Button>
                    </form>
                </div>
            </Dialog>
        </>
    );
}
