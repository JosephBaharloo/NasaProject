import React from 'react';
import { CloudHail, LayoutDashboard, CalendarDays, Settings } from 'lucide-react';

const LeftNav = ({ activeView, setActiveView }) => (
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
        <img src="https://placehold.co/40x40/FFFFFF/000000?text=CD" alt="User Avatar" className="rounded-full" />
    </nav>
);

export default LeftNav;
