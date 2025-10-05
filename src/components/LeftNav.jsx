import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { CloudHail, LayoutDashboard, CalendarDays, Info, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ReactDOM from 'react-dom';

const LeftNav = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0,left: 0 });
    const modalRef = useRef(null);
    const avatarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target) &&
                avatarRef.current &&
                !avatarRef.current.contains(event.target)
            ) {
                setIsModalOpen(false);
            }
        };

        if (isModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModalOpen]);

    const handleAvatarClick = () => {
        if (avatarRef.current) {
            const rect = avatarRef.current.getBoundingClientRect();
            setModalPosition({
                top: rect.top - 60, // Daha yukarıda
                left: rect.right + 12 // Avatar'ın sağında, 12px boşluk
            });
        }
        setIsModalOpen(!isModalOpen);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="glass-panel rounded-3xl flex flex-col items-center justify-between py-6 px-2 w-20">
            <div className="flex flex-col items-center gap-6">
                <div className="w-10 h-10 flex items-center justify-center">
                    <CloudHail className="w-24 h-24 mb-4" />
                </div>
                <ul className="flex flex-col gap-4">
                    <li>
                        <NavLink 
                            to="/dashboard" 
                            end
                            className={({ isActive }) => `nav-item p-3 rounded-xl block ${isActive ? 'active' : ''}`}
                        >
                            <LayoutDashboard />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/dashboard/events"
                            className={({ isActive }) => `nav-item p-3 rounded-xl block ${isActive ? 'active' : ''}`}
                        >
                            <CalendarDays />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/dashboard/settings"
                            className={({ isActive }) => `nav-item p-3 rounded-xl block ${isActive ? 'active' : ''}`}
                            title="About"
                        >
                            <Info />
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="relative">
                <div
                    ref={avatarRef}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center font-bold text-lg cursor-pointer hover:bg-white/20 transition-colors"
                    onClick={handleAvatarClick}
                >
                    {user ? user.getInitials() : '??'}
                </div>
                {isModalOpen && user && ReactDOM.createPortal(
                    <div 
                        ref={modalRef} 
                        className="fixed w-56 glass-panel-light rounded-lg p-4 shadow-lg z-50 border border-white/20"
                        style={{ 
                            top: `${modalPosition.top}px`, 
                            left: `${modalPosition.left}px` 
                        }}
                    >
                        <div className="text-center mb-4">
                            <p className="font-bold text-white">{user.getFullName()}</p>
                            <p className="text-sm text-gray-300">{user.email}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 text-red-400 hover:bg-red-500/20 p-2 rounded-lg transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            Logout
                        </button>
                    </div>,
                    document.getElementById('modal-root')
                )}
            </div>
        </nav>
    );
};

export default LeftNav;
