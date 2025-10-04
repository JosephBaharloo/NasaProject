import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CloudHail, LayoutDashboard, CalendarDays, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ReactDOM from 'react-dom';

const LeftNav = ({ activeView, setActiveView }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const getInitials = (name) => {
        if (!name) return '??';
        const names = name.split(' ');
        if (names.length > 1 && names[1]) {
            return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="glass-panel rounded-3xl flex flex-col items-center justify-between py-6 px-2 w-20">
            <div className="flex flex-col items-center gap-6">
                <div className="w-10 h-10 flex items-center justify-center">
                    <img src="src\assets\icons\nasaSpaceChallenge.png" alt="Logo" className="w-8 h-8" />
                </div>
                <ul className="flex flex-col gap-4">
                    <li><button className={`nav-item p-3 rounded-xl ${activeView === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveView('dashboard')}><LayoutDashboard /></button></li>
                    <li><button className={`nav-item p-3 rounded-xl ${activeView === 'events' ? 'active' : ''}`} onClick={() => setActiveView('events')}><CalendarDays /></button></li>
                    <li><button className={`nav-item p-3 rounded-xl ${activeView === 'settings' ? 'active' : ''}`} onClick={() => setActiveView('settings')}><Settings /></button></li>
                </ul>
            </div>
            <div className="relative">
                <div
                    ref={avatarRef}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center font-bold text-lg cursor-pointer"
                    onClick={() => setIsModalOpen(!isModalOpen)}
                >
                    {user ? getInitials(user.username) : '??'}
                </div>
                {isModalOpen && user && ReactDOM.createPortal(
                    <div ref={modalRef} className="absolute bottom-14 left-24 w-56 glass-panel-light rounded-lg p-4 shadow-lg z-50">
                        <div className="text-center mb-4">
                            <p className="font-bold text-white">{user.username}</p>
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
